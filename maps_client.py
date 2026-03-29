"""
maps_client.py
--------------
Google Maps API client for fetching routes, traffic data, and place details.
Wraps the googlemaps Python SDK with retry logic and structured data extraction.

Required env var: GOOGLE_MAPS_API_KEY
Install deps:     pip install googlemaps
"""

import os
import time
import logging
from datetime import datetime, timedelta
from typing import Optional
import googlemaps

logger = logging.getLogger(__name__)

# ── Traffic departure-time presets ──────────────────────────────────────────
TRAFFIC_MODELS = ["best_guess", "pessimistic", "optimistic"]
TRAVEL_MODES   = ["driving", "transit", "bicycling", "walking"]


class MapsClient:
    """
    Thin wrapper around the Google Maps Directions & Distance-Matrix APIs.
    All public methods return plain Python dicts so the rest of the stack
    stays SDK-agnostic.
    """

    def __init__(self, api_key: Optional[str] = None, timeout: int = 10):
        key = api_key or os.getenv("GOOGLE_MAPS_API_KEY")
        if not key:
            raise EnvironmentError(
                "Google Maps API key not found. "
                "Set GOOGLE_MAPS_API_KEY environment variable or pass api_key=."
            )
        self.client  = googlemaps.Client(key=key, timeout=timeout)
        self.timeout = timeout

    # ── Core fetch methods ──────────────────────────────────────────────────

    def get_routes(
        self,
        origin: str,
        destination: str,
        mode: str = "driving",
        alternatives: bool = True,
        departure_time: Optional[datetime] = None,
        traffic_model: str = "best_guess",
        waypoints: Optional[list] = None,
    ) -> list[dict]:
        """
        Fetch one or more routes from the Directions API.

        Returns a list of parsed route dicts (one per alternative).
        Each dict contains:
            summary, distance_m, duration_s, duration_in_traffic_s,
            start_address, end_address, steps, polyline, warnings, legs
        """
        if mode not in TRAVEL_MODES:
            raise ValueError(f"mode must be one of {TRAVEL_MODES}")
        if traffic_model not in TRAFFIC_MODELS:
            raise ValueError(f"traffic_model must be one of {TRAFFIC_MODELS}")

        departure_time = departure_time or datetime.now()

        kwargs = dict(
            origin=origin,
            destination=destination,
            mode=mode,
            alternatives=alternatives,
            departure_time=departure_time,
            traffic_model=traffic_model,
        )
        if waypoints:
            kwargs["waypoints"] = waypoints

        raw = self._call_with_retry(self.client.directions, **kwargs)
        return [self._parse_route(r) for r in raw]

    def get_distance_matrix(
        self,
        origins: list[str],
        destinations: list[str],
        mode: str = "driving",
        departure_time: Optional[datetime] = None,
    ) -> dict:
        """
        Batch distance/duration lookup via Distance Matrix API.
        Returns the raw response dict (rows × elements grid).
        """
        departure_time = departure_time or datetime.now()
        return self._call_with_retry(
            self.client.distance_matrix,
            origins=origins,
            destinations=destinations,
            mode=mode,
            departure_time=departure_time,
            traffic_model="best_guess",
        )

    def geocode(self, address: str) -> dict:
        """Geocode a freeform address → {lat, lng, formatted_address}."""
        results = self._call_with_retry(self.client.geocode, address)
        if not results:
            raise ValueError(f"Could not geocode address: {address!r}")
        loc = results[0]["geometry"]["location"]
        return {
            "lat": loc["lat"],
            "lng": loc["lng"],
            "formatted_address": results[0]["formatted_address"],
        }

    # ── Traffic snapshot helpers ────────────────────────────────────────────

    def get_traffic_snapshot(
        self, origin: str, destination: str
    ) -> dict:
        """
        Fetch the same route under all three traffic models to understand
        the realistic spread of travel times.

        Returns:
            {
              best_guess_s, optimistic_s, pessimistic_s,
              baseline_duration_s,   # duration ignoring traffic
              delay_s,               # best_guess − baseline
              congestion_ratio,      # best_guess / baseline
            }
        """
        snapshots = {}
        baseline = None

        for model in TRAFFIC_MODELS:
            routes = self.get_routes(
                origin, destination,
                alternatives=False,
                traffic_model=model,
            )
            if routes:
                r = routes[0]
                snapshots[model] = r["duration_in_traffic_s"] or r["duration_s"]
                if baseline is None:
                    baseline = r["duration_s"]

        best   = snapshots.get("best_guess", baseline)
        congestion = round(best / baseline, 3) if baseline else 1.0

        return {
            "best_guess_s":      snapshots.get("best_guess"),
            "optimistic_s":      snapshots.get("optimistic"),
            "pessimistic_s":     snapshots.get("pessimistic"),
            "baseline_duration_s": baseline,
            "delay_s":           (best - baseline) if baseline else 0,
            "congestion_ratio":  congestion,
        }

    # ── Internal helpers ────────────────────────────────────────────────────

    @staticmethod
    def _parse_route(raw: dict) -> dict:
        """Flatten a raw Directions API route object into a clean dict."""
        leg = raw["legs"][0]  # single-leg journey (no waypoints)

        # Duration in traffic is only returned for driving + departure_time
        dit = leg.get("duration_in_traffic", {}).get("value")

        steps = [
            {
                "instruction":   s.get("html_instructions", ""),
                "distance_m":    s["distance"]["value"],
                "duration_s":    s["duration"]["value"],
                "travel_mode":   s.get("travel_mode", "DRIVING"),
                "maneuver":      s.get("maneuver", ""),
            }
            for s in leg.get("steps", [])
        ]

        return {
            "summary":              raw.get("summary", ""),
            "distance_m":          leg["distance"]["value"],
            "duration_s":          leg["duration"]["value"],
            "duration_in_traffic_s": dit,
            "start_address":       leg["start_address"],
            "end_address":         leg["end_address"],
            "steps":               steps,
            "polyline":            raw["overview_polyline"]["points"],
            "warnings":            raw.get("warnings", []),
            "legs":                raw.get("legs", []),
            "step_count":          len(steps),
            "waypoint_order":      raw.get("waypoint_order", []),
        }

    @staticmethod
    def _call_with_retry(fn, *args, retries: int = 3, backoff: float = 1.5, **kwargs):
        """Call a Maps SDK function with exponential-backoff retry."""
        for attempt in range(retries):
            try:
                return fn(*args, **kwargs)
            except Exception as exc:
                if attempt == retries - 1:
                    raise
                wait = backoff ** attempt
                logger.warning("Maps API call failed (%s). Retrying in %.1fs…", exc, wait)
                time.sleep(wait)
