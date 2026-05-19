Anomaly Detection Dashboard

A real-time, full-stack AI-powered dashboard for monitoring sensor data and detecting anomalies using machine learning.

This project demonstrates applied AI/ML, modern frontend development, backend API integration, and real-time monitoring concepts.

Overview

Unexpected system anomalies can lead to operational failures and performance issues. This project simulates a smart monitoring system that:

Generates live sensor readings Detects anomalies using an Isolation Forest ML model Displays real-time alerts and anomaly scores Explains anomaly contributors Maintains anomaly logs for monitoring Tech Stack Layer Technologies Frontend React, Tailwind CSS, React Router Backend FastAPI, Python, Uvicorn AI/ML Scikit-learn, Isolation Forest, NumPy, joblib Simulation Python CSV Generator Deployment Vercel, Render Features Real-Time Sensor Simulation

Simulates sensor data including:

Pressure Temperature Flow Rate Vibration AI-Based Anomaly Detection

Uses an Isolation Forest machine learning model to identify abnormal behavior in real time.

Anomaly Scoring & Contributors

Displays:

Severity score Detection confidence Major contributing sensor features Interactive Dashboard UI

Includes:

Live sensor monitoring cards AI Detection Engine panel Animated alerts Anomaly logs page Responsive modern UI Persistent Logging

Detected anomalies are stored locally and can later be integrated with databases or cloud storage.

How It Works

Generate Sensor Data cd simulator python generator.py
Train the ML Model
Run:

model_training.ipynb

This notebook:

Loads sensor CSV data Normalizes features Trains Isolation Forest Saves: model.joblib scaler.joblib 3. Run Backend Server uvicorn inference_api:app --host 0.0.0.0 --port 10000 4. Run Frontend cd frontend npm install npm run dev 📂 Folder Structure ├── backend/ │ ├── inference_api.py │ ├── model_training.ipynb │ ├── model.joblib │ └── scaler.joblib │ ├── simulator/ │ ├── generator.py │ └── normal_data.csv │ ├── frontend/ │ ├── src/ │ │ ├── components/ │ │ ├── hooks/ │ │ ├── layout/ │ │ ├── pages/ │ │ └── App.jsx │ └── README.md

Project Significance

This project reflects real-world applications in:

AI-Powered Monitoring Predictive Analytics Industrial IoT Machine Learning Systems Real-Time Monitoring Dashboards

It combines machine learning, backend engineering, and responsive frontend development into a complete production-style monitoring system.

Author Pranjali Walke
