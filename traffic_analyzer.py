"""
traffic_analyzer.py
-------------------
Derives structured traffic features from raw Maps API route data.
These features feed directly into the ML scorer.

Feature categories
──────────────────
  Time-based   : duration, delay, congestion ratio, time-of-day bucket
  Distance     : total distance, step count, avg step length
  Reliability  : pessimistic–optimistic spread, variance coefficient
  Road quality : highway fraction (steps > 1 km = likely highway)
  Risk flags   : peak-hour flag, high-congestion flag
"""

from __future__ import annotations
from datetime import datetime
from typing import Optional
import math


# Peak-hour windows (local time, 24 h)
_MORNING_PEAK = (7, 9)    # 07:00–09:00
_EVENING_PEAK = (16, 19)  # 16:00–19:00

# Congestion threshold for binary risk flag
_HIGH_CONGESTION_RATIO = 1.4  # 40 % slower than free-flow


class TrafficAnalyzer:
    """
    Stateless helper: converts raw route dicts (from MapsClient) plus an
    optional traffic snapshot into a feature vector ready for the ML model.
    """

    @staticmethod
    def extract_features(
        route: dict,
        traffic_snapshot: Optional[dict] = None,
        departure_time: Optional[datetime] = None,
    ) -> dict:
        """
        Build a flat feature dict from a single route.

        Parameters
        ----------
        route            : Parsed route dict from MapsClient._parse_route
        traffic_snapshot : Output of MapsClient.get_traffic_snapshot (optional)
        departure_time   : When the trip starts (defaults to now)

        Returns
        -------
        dict with ~20 numeric / boolean features
        """
        now = departure_time or datetime.now()
        hour = now.hour

        # ── Base time & distance ──────────────────────────────────────────
        baseline_s  = route["duration_s"]
        traffic_s   = route.get("duration_in_traffic_s") or baseline_s
        distance_m  = route["distance_m"]
        step_count  = route.get("step_count", len(route.get("steps", [])))

        delay_s          = max(traffic_s - baseline_s, 0)
        congestion_ratio = round(traffic_s / baseline_s, 4) if baseline_s else 1.0
        avg_speed_kmh    = round((distance_m / 1000) / (traffic_s / 3600), 2) \
                           if traffic_s else 0

        # ── Step-level road analysis ──────────────────────────────────────
        steps = route.get("steps", [])
        highway_steps = sum(1 for s in steps if s.get("distance_m", 0) > 1000)
        highway_fraction = round(highway_steps / step_count, 3) if step_count else 0.0
        avg_step_m       = round(distance_m / step_count, 1) if step_count else 0

        # ── Reliability spread (needs snapshot) ──────────────────────────
        if traffic_snapshot:
            opt  = traffic_snapshot.get("optimistic_s", traffic_s)
            pess = traffic_snapshot.get("pessimistic_s", traffic_s)
            spread_s           = pess - opt
            variance_coeff     = round(spread_s / traffic_s, 4) if traffic_s else 0
            reliability_score  = TrafficAnalyzer._reliability_score(variance_coeff)
        else:
            spread_s          = 0
            variance_coeff    = 0.0
            reliability_score = 1.0   # assume perfect if no snapshot

        # ── Time-of-day features ──────────────────────────────────────────
        is_morning_peak = int(_MORNING_PEAK[0] <= hour < _MORNING_PEAK[1])
        is_evening_peak = int(_EVENING_PEAK[0] <= hour < _EVENING_PEAK[1])
        is_peak_hour    = int(is_morning_peak or is_evening_peak)
        is_weekend      = int(now.weekday() >= 5)
        hour_sin        = round(math.sin(2 * math.pi * hour / 24), 4)
        hour_cos        = round(math.cos(2 * math.pi * hour / 24), 4)

        # ── Risk flags ────────────────────────────────────────────────────
        is_high_congestion = int(congestion_ratio >= _HIGH_CONGESTION_RATIO)
        has_warnings       = int(bool(route.get("warnings")))

        return {
            # --- raw time (seconds) ---
            "baseline_duration_s":   baseline_s,
            "traffic_duration_s":    traffic_s,
            "delay_s":               delay_s,
            "spread_s":              spread_s,

            # --- distance ---
            "distance_m":            distance_m,
            "step_count":            step_count,
            "avg_step_m":            avg_step_m,

            # --- derived ratios ---
            "congestion_ratio":      congestion_ratio,
            "avg_speed_kmh":         avg_speed_kmh,
            "highway_fraction":      highway_fraction,
            "variance_coeff":        variance_coeff,
            "reliability_score":     reliability_score,

            # --- time-of-day ---
            "hour":                  hour,
            "hour_sin":              hour_sin,
            "hour_cos":              hour_cos,
            "is_morning_peak":       is_morning_peak,
            "is_evening_peak":       is_evening_peak,
            "is_peak_hour":          is_peak_hour,
            "is_weekend":            is_weekend,

            # --- risk flags ---
            "is_high_congestion":    is_high_congestion,
            "has_warnings":          has_warnings,
        }

    @staticmethod
    def _reliability_score(variance_coeff: float) -> float:
        """
        Map variance coefficient → [0, 1] reliability score.
        0 = wildly unreliable, 1 = perfectly predictable.

        Uses a simple exponential decay: score = e^(-3 × vc)
        so vc=0 → 1.0, vc=0.25 → 0.47, vc=0.5 → 0.22
        """
        import math
        return round(math.exp(-3 * variance_coeff), 4)

    @staticmethod
    def summarise(features: dict) -> str:
        """Return a human-readable one-liner from a feature dict."""
        mins  = features["traffic_duration_s"] // 60
        km    = round(features["distance_m"] / 1000, 1)
        delay = features["delay_s"] // 60
        cong  = features["congestion_ratio"]
        rel   = features["reliability_score"]

        cong_label = (
            "🔴 Heavy traffic" if cong >= 1.4 else
            "🟡 Moderate traffic" if cong >= 1.15 else
            "🟢 Light traffic"
        )
        return (
            f"{mins} min  |  {km} km  |  +{delay} min delay  |  "
            f"{cong_label}  |  Reliability {rel:.0%}"
        )
