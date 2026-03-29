"""
route_optimizer.py
------------------
High-level orchestrator used by the mobile app.

Usage (from your mobile backend or FastAPI endpoint):

    optimizer = RouteOptimizer(api_key="YOUR_KEY")
    optimizer.setup()          # train ML model once at startup

    result = optimizer.find_best_route(
        origin="Colombo Fort Station, Sri Lanka",
        destination="Galle Face Green, Colombo",
    )
    print(result["recommendation"])
    print(result["routes"][0])   # best route details
"""

from __future__ import annotations

import logging
from datetime import datetime
from typing import Optional

from maps_client import MapsClient
from traffic_analyzer import TrafficAnalyzer
from ml_model import RouteMLModel

logger = logging.getLogger(__name__)


class RouteOptimizer:
    """
    End-to-end pipeline:
      1. Geocode origin + destination
      2. Fetch alternative routes from Google Maps (with live traffic)
      3. Extract traffic features for each route
      4. Score every route with the ML model
      5. Return ranked routes + a human-readable recommendation
    """

    def __init__(self, api_key: Optional[str] = None):
        self.maps     = MapsClient(api_key=api_key)
        self.analyzer = TrafficAnalyzer()
        self.model    = RouteMLModel()
        self._ready   = False

    # ── Initialisation ───────────────────────────────────────────────────────

    def setup(self, training_records: Optional[list] = None) -> dict:
        """
        Train (or load) the ML model.
        Call once at application startup.

        Parameters
        ----------
        training_records : Optional list of historical trip dicts.
                           If None, the model uses built-in synthetic data.

        Returns training metrics dict.
        """
        try:
            self.model = RouteMLModel.load()
            logger.info("Loaded pre-trained model from disk.")
            metrics = {"loaded_from_disk": True}
        except Exception:
            logger.info("No saved model found – training from scratch.")
            metrics = self.model.train(training_records)
            self.model.save()

        self._ready = True
        return metrics

    # ── Main public method ───────────────────────────────────────────────────

    def find_best_route(
        self,
        origin: str,
        destination: str,
        mode: str = "driving",
        departure_time: Optional[datetime] = None,
        top_k: int = 3,
    ) -> dict:
        """
        Find and rank the best routes between two locations.

        Parameters
        ----------
        origin, destination : Free-text addresses or "lat,lng" strings
        mode                : "driving" | "transit" | "bicycling" | "walking"
        departure_time      : When to start (defaults to now)
        top_k               : Maximum number of routes to return

        Returns
        -------
        {
          "origin":          str,
          "destination":     str,
          "query_time":      str (ISO-8601),
          "routes":          list[RouteResult],   # ranked best → worst
          "recommendation":  str,                  # plain-English summary
          "model_confidence": float,               # score spread (higher = clearer winner)
        }
        """
        if not self._ready:
            raise RuntimeError("Call optimizer.setup() before find_best_route().")

        now = departure_time or datetime.now()

        # ── Step 1: geocode ──────────────────────────────────────────────
        logger.info("Geocoding origin: %s", origin)
        origin_geo = self.maps.geocode(origin)

        logger.info("Geocoding destination: %s", destination)
        dest_geo = self.maps.geocode(destination)

        # ── Step 2: fetch routes ─────────────────────────────────────────
        logger.info("Fetching routes (%s) …", mode)
        raw_routes = self.maps.get_routes(
            origin=origin_geo["formatted_address"],
            destination=dest_geo["formatted_address"],
            mode=mode,
            alternatives=True,
            departure_time=now,
        )
        if not raw_routes:
            raise ValueError("Google Maps returned no routes. Check addresses.")

        logger.info("  %d route(s) returned.", len(raw_routes))

        # ── Step 3: traffic snapshot (on the first / primary route) ──────
        logger.info("Fetching traffic snapshot …")
        try:
            snapshot = self.maps.get_traffic_snapshot(
                origin_geo["formatted_address"],
                dest_geo["formatted_address"],
            )
        except Exception as exc:
            logger.warning("Traffic snapshot failed (%s) – proceeding without it.", exc)
            snapshot = None

        # ── Step 4: extract features & score each route ──────────────────
        feature_list = []
        for r in raw_routes:
            feats = self.analyzer.extract_features(
                route=r,
                traffic_snapshot=snapshot,
                departure_time=now,
            )
            feature_list.append(feats)

        scores = self.model.predict_batch(feature_list)

        # ── Step 5: build result objects & rank ───────────────────────────
        route_results = []
        for i, (route, feats, score) in enumerate(zip(raw_routes, feature_list, scores)):
            route_results.append(
                _build_route_result(
                    rank=i,          # will be overwritten after sort
                    route=route,
                    features=feats,
                    score=score,
                    snapshot=snapshot if i == 0 else None,
                )
            )

        route_results.sort(key=lambda r: r["ml_score"], reverse=True)
        for i, r in enumerate(route_results):
            r["rank"] = i + 1

        top_routes = route_results[:top_k]

        # ── Step 6: confidence & recommendation ──────────────────────────
        if len(scores) > 1:
            sorted_scores = sorted(scores, reverse=True)
            model_confidence = round(sorted_scores[0] - sorted_scores[1], 3)
        else:
            model_confidence = 1.0

        recommendation = _make_recommendation(top_routes, model_confidence)

        return {
            "origin":            origin_geo["formatted_address"],
            "destination":       dest_geo["formatted_address"],
            "query_time":        now.isoformat(),
            "mode":              mode,
            "routes":            top_routes,
            "recommendation":    recommendation,
            "model_confidence":  model_confidence,
            "traffic_snapshot":  snapshot,
        }

    # ── Feedback loop ────────────────────────────────────────────────────────

    def record_trip_feedback(
        self,
        features: dict,
        actual_duration_s: int,
        user_rating: Optional[int] = None,
    ) -> dict:
        """
        Record a completed trip so the model can be retrained later.

        Parameters
        ----------
        features          : Feature dict from TrafficAnalyzer.extract_features
        actual_duration_s : How long the trip actually took
        user_rating       : Optional 1–5 star rating from the user

        Returns
        -------
        Labelled training record ready for RouteMLModel.retrain()
        """
        predicted_s = features.get("traffic_duration_s", features["baseline_duration_s"])
        error_ratio = actual_duration_s / predicted_s if predicted_s else 1.0

        # Derive efficiency label from outcome
        base_score = self.model.predict_score(features)
        adjusted   = base_score / max(error_ratio, 0.5)   # penalise if took longer
        if user_rating:
            adjusted = 0.7 * adjusted + 0.3 * (user_rating / 5)

        return {**features, "efficiency_score": float(min(max(adjusted, 0), 1))}


# ── Helper functions ─────────────────────────────────────────────────────────

def _build_route_result(
    rank: int,
    route: dict,
    features: dict,
    score: float,
    snapshot: Optional[dict],
) -> dict:
    traffic_s = features["traffic_duration_s"]
    return {
        "rank":              rank,
        "ml_score":          round(score, 4),
        "summary":           route.get("summary", f"Route {rank+1}"),
        "distance_km":       round(route["distance_m"] / 1000, 2),
        "duration_min":      round(traffic_s / 60, 1),
        "delay_min":         round(features["delay_s"] / 60, 1),
        "congestion_ratio":  features["congestion_ratio"],
        "reliability_score": round(features["reliability_score"], 3),
        "avg_speed_kmh":     features["avg_speed_kmh"],
        "highway_fraction":  features["highway_fraction"],
        "is_peak_hour":      bool(features["is_peak_hour"]),
        "has_warnings":      bool(features["has_warnings"]),
        "warnings":          route.get("warnings", []),
        "polyline":          route.get("polyline", ""),
        "start_address":     route.get("start_address", ""),
        "end_address":       route.get("end_address", ""),
        "steps":             route.get("steps", []),
        "human_summary":     TrafficAnalyzer.summarise(features),
        "traffic_snapshot":  snapshot,
    }


def _make_recommendation(routes: list[dict], confidence: float) -> str:
    if not routes:
        return "No routes found."

    best = routes[0]
    mins = best["duration_min"]
    km   = best["distance_km"]
    delay = best["delay_min"]
    cong = best["congestion_ratio"]

    cong_desc = (
        "heavy traffic" if cong >= 1.4 else
        "moderate traffic" if cong >= 1.15 else
        "light traffic"
    )
    conf_desc = (
        "Strongly recommended" if confidence > 0.15 else
        "Recommended" if confidence > 0.05 else
        "Slight edge over alternatives"
    )

    rec = (
        f"🏆 {conf_desc}: Route via '{best['summary']}'\n"
        f"   • Est. travel time: {mins:.0f} min  ({km} km)\n"
        f"   • Current conditions: {cong_desc} (+{delay:.0f} min delay)\n"
        f"   • Reliability: {best['reliability_score']:.0%}"
    )
    if best["has_warnings"]:
        rec += f"\n   ⚠️  Warnings: {'; '.join(best['warnings'])}"

    if len(routes) > 1:
        alt = routes[1]
        rec += (
            f"\n\n🔄 Alternative: '{alt['summary']}' – "
            f"{alt['duration_min']:.0f} min, score {alt['ml_score']:.2f}"
        )
    return rec
