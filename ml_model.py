"""
ml_model.py
-----------
Gradient-Boosting route-scorer.

The model predicts an "efficiency score" in [0, 1] for each candidate route.
Higher = better.  The score balances:
  • travel time (lower is better)
  • reliability / predictability (higher is better)
  • congestion level (lower is better)
  • road comfort (higher highway fraction = smoother ride)

Training
────────
  Because we don't have labelled historical trip data at bootstrap time,
  the model ships with a synthetic dataset generated from realistic priors
  and is ready to use out-of-the-box.

  As real trips accumulate you can call `RouteMLModel.retrain(records)` to
  fine-tune on your own data.

Persistence
───────────
  The trained model is saved to `route_model.joblib` so it survives restarts.
  Load with `RouteMLModel.load()`.
"""

from __future__ import annotations

import os
import logging
import numpy as np
import pandas as pd
import joblib
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.preprocessing import MinMaxScaler
from sklearn.pipeline import Pipeline
from sklearn.model_selection import cross_val_score

logger = logging.getLogger(__name__)

MODEL_PATH = os.path.join(os.path.dirname(__file__), "route_model.joblib")

# Features consumed by the model (must match TrafficAnalyzer.extract_features keys)
FEATURE_COLS = [
    "congestion_ratio",
    "variance_coeff",
    "reliability_score",
    "highway_fraction",
    "delay_s",
    "avg_speed_kmh",
    "spread_s",
    "step_count",
    "avg_step_m",
    "is_peak_hour",
    "is_weekend",
    "is_high_congestion",
    "has_warnings",
    "hour_sin",
    "hour_cos",
]


class RouteMLModel:
    """
    Wraps a scikit-learn Pipeline (scaler + GBM) that scores route features.
    """

    def __init__(self):
        self.pipeline: Pipeline | None = None
        self._trained = False

    # ── Public API ──────────────────────────────────────────────────────────

    def train(self, records: list[dict] | None = None) -> dict:
        """
        Train (or re-train) the model.

        Parameters
        ----------
        records : list of dicts, each containing FEATURE_COLS + 'efficiency_score'.
                  If None, a synthetic dataset is generated automatically.

        Returns
        -------
        dict with cv_mean, cv_std, n_samples
        """
        if records:
            df = pd.DataFrame(records)
        else:
            logger.info("No training records supplied – generating synthetic dataset.")
            df = _generate_synthetic_data(n=3000)

        X = df[FEATURE_COLS].values
        y = df["efficiency_score"].values

        self.pipeline = Pipeline([
            ("scaler", MinMaxScaler()),
            ("gbm", GradientBoostingRegressor(
                n_estimators=200,
                max_depth=4,
                learning_rate=0.05,
                subsample=0.8,
                random_state=42,
            )),
        ])
        self.pipeline.fit(X, y)
        self._trained = True

        scores = cross_val_score(self.pipeline, X, y, cv=5, scoring="r2")
        result = {
            "cv_mean": round(float(scores.mean()), 4),
            "cv_std":  round(float(scores.std()), 4),
            "n_samples": len(df),
        }
        logger.info("Model trained. CV R² = %.3f ± %.3f", result["cv_mean"], result["cv_std"])
        return result

    def predict_score(self, features: dict) -> float:
        """
        Score a single route feature dict → float in [0, 1].
        Requires the model to be trained first.
        """
        self._ensure_trained()
        x = np.array([[features[c] for c in FEATURE_COLS]])
        raw = self.pipeline.predict(x)[0]
        return float(np.clip(raw, 0.0, 1.0))

    def predict_batch(self, feature_list: list[dict]) -> list[float]:
        """Score multiple routes at once."""
        self._ensure_trained()
        X = np.array([[f[c] for c in FEATURE_COLS] for f in feature_list])
        raw = self.pipeline.predict(X)
        return [float(np.clip(v, 0.0, 1.0)) for v in raw]

    def feature_importance(self) -> dict:
        """Return a {feature: importance} dict (GBM feature importances)."""
        self._ensure_trained()
        gbm = self.pipeline.named_steps["gbm"]
        return dict(sorted(
            zip(FEATURE_COLS, gbm.feature_importances_),
            key=lambda x: x[1], reverse=True
        ))

    def save(self, path: str = MODEL_PATH):
        self._ensure_trained()
        joblib.dump(self.pipeline, path)
        logger.info("Model saved → %s", path)

    @classmethod
    def load(cls, path: str = MODEL_PATH) -> "RouteMLModel":
        """Load a previously saved model from disk."""
        obj = cls()
        obj.pipeline = joblib.load(path)
        obj._trained = True
        logger.info("Model loaded ← %s", path)
        return obj

    # ── Internal ────────────────────────────────────────────────────────────

    def _ensure_trained(self):
        if not self._trained or self.pipeline is None:
            raise RuntimeError("Model is not trained yet. Call .train() first.")


# ── Synthetic data generator ────────────────────────────────────────────────

def _generate_synthetic_data(n: int = 3000, seed: int = 0) -> pd.DataFrame:
    """
    Generate plausible synthetic training rows.
    The efficiency_score label is computed from domain knowledge:
      score = w1*(1/congestion) + w2*reliability + w3*speed_norm
              + w4*highway - w5*peak_penalty - w6*warning_penalty
    All terms normalised to [0,1] before weighting.
    """
    rng = np.random.default_rng(seed)

    n_rows = n
    congestion     = rng.uniform(1.0, 2.5, n_rows)
    variance_coeff = rng.uniform(0.0, 0.5, n_rows)
    reliability    = np.exp(-3 * variance_coeff)
    highway_frac   = rng.uniform(0.0, 1.0, n_rows)
    delay_s        = (congestion - 1) * rng.uniform(60, 900, n_rows)
    avg_speed      = rng.uniform(10, 90, n_rows)
    spread_s       = variance_coeff * rng.uniform(60, 600, n_rows)
    step_count     = rng.integers(3, 30, n_rows)
    avg_step_m     = rng.uniform(200, 3000, n_rows)
    is_peak        = rng.integers(0, 2, n_rows)
    is_weekend     = rng.integers(0, 2, n_rows)
    is_high_cong   = (congestion >= 1.4).astype(int)
    has_warnings   = rng.integers(0, 2, n_rows)
    hour           = rng.integers(0, 24, n_rows)
    hour_sin       = np.sin(2 * np.pi * hour / 24)
    hour_cos       = np.cos(2 * np.pi * hour / 24)

    # ── Label construction ───────────────────────────────────────────────
    inv_cong     = 1 / congestion                          # [0.4–1.0]
    speed_norm   = avg_speed / 90                          # [0–1]
    delay_norm   = 1 - np.clip(delay_s / 1800, 0, 1)      # invert
    peak_penalty = is_peak * 0.1
    warn_penalty = has_warnings * 0.05

    score = (
        0.30 * inv_cong
      + 0.25 * reliability
      + 0.20 * speed_norm
      + 0.15 * highway_frac
      + 0.10 * delay_norm
      - peak_penalty
      - warn_penalty
    )
    score = np.clip(score, 0.0, 1.0)

    df = pd.DataFrame({
        "congestion_ratio":   congestion,
        "variance_coeff":     variance_coeff,
        "reliability_score":  reliability,
        "highway_fraction":   highway_frac,
        "delay_s":            delay_s,
        "avg_speed_kmh":      avg_speed,
        "spread_s":           spread_s,
        "step_count":         step_count.astype(float),
        "avg_step_m":         avg_step_m,
        "is_peak_hour":       is_peak.astype(float),
        "is_weekend":         is_weekend.astype(float),
        "is_high_congestion": is_high_cong.astype(float),
        "has_warnings":       has_warnings.astype(float),
        "hour_sin":           hour_sin,
        "hour_cos":           hour_cos,
        "efficiency_score":   score,
    })
    return df
