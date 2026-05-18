from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load('model.joblib')
scaler = joblib.load('scaler.joblib')

df = pd.read_csv("industrial_fault_detection.csv")


df.columns = df.columns.str.lower().str.strip()

required_cols = ["pressure", "flow_rate", "temperature", "vibration"]


for col in required_cols:
    if col not in df.columns:
        raise Exception(f"Missing column: {col}")

df = df[required_cols]


current_index = 0
start_time = datetime.now()


def get_contributors(values):
    names = ["pressure", "flow_rate", "temperature", "vibration"]
    avg = np.mean(values)

    contributions = []
    for i, val in enumerate(values):
        contributions.append({
            "feature": names[i],
            "impact": float(abs(val - avg))
        })

    # sort by highest impact
    contributions.sort(key=lambda x: x["impact"], reverse=True)
    return contributions


@app.get("/stream")
def stream_data():
    global current_index, start_time

    if current_index >= len(df):
        current_index = 0

    row = df.iloc[current_index]
    current_index += 1

    values = [
        row["pressure"],
        row["flow_rate"],
        row["temperature"],
        row["vibration"]
    ]

    X_input = np.array([values])
    X_scaled = scaler.transform(X_input)

    prediction = model.predict(X_scaled)[0]
    score = model.decision_function(X_scaled)[0]

    
    timestamp = start_time + timedelta(seconds=current_index)

    return {
        "timestamp": timestamp.isoformat(),
        "pressure": float(values[0]),
        "flow_rate": float(values[1]),
        "temperature": float(values[2]),
        "vibration": float(values[3]),
        "is_anomaly": bool(prediction == -1),
        "score": float(score),
        "contributors": get_contributors(values)
    }