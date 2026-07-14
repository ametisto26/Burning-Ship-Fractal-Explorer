from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.burning_ship import calculate_burning_ship

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "message": "hello burning-ship"
    }

@app.get("/burning_ship")
def burning_ship(
    cx: float,
    cy: float,
    scale: float,
    real_weight: float = 1.0,
    imag_weight: float = 1.0,
):
    return calculate_burning_ship(cx, cy, scale, real_weight, imag_weight)


