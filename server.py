"""
server.py
---------
FastAPI REST server exposing the RouteOptimizer to a mobile client.

Run:
    pip install fastapi uvicorn
    uvicorn server:app --reload --port 8000

Endpoints
─────────
    POST /api/route          → find best route
    POST /api/route/feedback → record completed trip
    GET  /api/health         → liveness check
    GET  /api/model/info     → feature importance + training status
"""
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
from __future__ import annotations

import os
import logging
from datetime import datetime
from typing import Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from route_optimizer import RouteOptimizer

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ── App setup ────────────────────────────────────────────────────────────────

app = FastAPI(
    title="Smart Route Optimizer API",
    description="ML-powered route suggestion with live traffic analysis",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # tighten in production
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialise optimizer once at startup (not per-request)
optimizer: Optional[RouteOptimizer] = None


@app.on_event("startup")
async def startup_event():
    global optimizer
    api_key = os.getenv("GOOGLE_MAPS_API_KEY")
    optimizer = RouteOptimizer(api_key=api_key)
    metrics = optimizer.setup()
    logger.info("RouteOptimizer ready. Training metrics: %s", metrics)


# ── Pydantic schemas ─────────────────────────────────────────────────────────

class RouteRequest(BaseModel):
    origin: str = Field(..., example="Colombo Fort Station, Sri Lanka")
    destination: str = Field(..., example="Galle Face Green, Colombo")
    mode: str = Field("driving", example="driving")
    departure_time: Optional[str] = Field(
        None,
        description="ISO-8601 departure time, e.g. '2025-08-01T08:30:00'. "
                    "Defaults to now if omitted.",
        example="2025-08-01T08:30:00",
    )
    top_k: int = Field(3, ge=1, le=5)

    class Config:
        json_schema_extra = {
            "example": {
                "origin": "Colombo Fort Station",
                "destination": "Galle Face Green",
                "mode": "driving",
                "top_k": 3,
            }
        }


class FeedbackRequest(BaseModel):
    features: dict = Field(..., description="Feature dict from a prior /api/route response")
    actual_duration_s: int = Field(..., gt=0)
    user_rating: Optional[int] = Field(None, ge=1, le=5)


# ── Endpoints ────────────────────────────────────────────────────────────────

@app.post("/api/route", summary="Find best routes between two locations")
async def find_route(req: RouteRequest):
    """
    Returns ranked route options with traffic analysis and ML scores.

    - **origin**: Start location (address or "lat,lng")
    - **destination**: End location (address or "lat,lng")
    - **mode**: driving | transit | bicycling | walking
    - **departure_time**: ISO-8601 string (defaults to now)
    - **top_k**: Number of route options to return (1–5)
    """
    departure = None
    if req.departure_time:
        try:
            departure = datetime.fromisoformat(req.departure_time)
        except ValueError:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid departure_time format. Use ISO-8601: YYYY-MM-DDTHH:MM:SS",
            )

    try:
        result = optimizer.find_best_route(
            origin=req.origin,
            destination=req.destination,
            mode=req.mode,
            departure_time=departure,
            top_k=req.top_k,
        )
    except ValueError as exc:
        raise HTTPException(status_code=404, detail=str(exc))
    except Exception as exc:
        logger.exception("Unexpected error in find_best_route")
        raise HTTPException(status_code=500, detail=str(exc))

    return result


@app.post("/api/route/feedback", summary="Submit post-trip feedback to improve the model")
async def submit_feedback(req: FeedbackRequest):
    """
    Record how long a trip actually took (and an optional user rating).
    The labelled record is returned so you can batch-store it and
    periodically retrain the model via RouteMLModel.train(records).
    """
    try:
        record = optimizer.record_trip_feedback(
            features=req.features,
            actual_duration_s=req.actual_duration_s,
            user_rating=req.user_rating,
        )
        return {"status": "recorded", "training_record": record}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


@app.get("/api/health", summary="Liveness check")
async def health():
    return {
        "status": "ok",
        "optimizer_ready": optimizer is not None and optimizer._ready,
        "timestamp": datetime.now().isoformat(),
    }


@app.get("/api/model/info", summary="Feature importance and model metadata")
async def model_info():
    if not optimizer or not optimizer._ready:
        raise HTTPException(status_code=503, detail="Optimizer not ready yet.")
    return {
        "feature_importance": optimizer.model.feature_importance(),
        "feature_columns":    list(optimizer.model.feature_importance().keys()),
    }
