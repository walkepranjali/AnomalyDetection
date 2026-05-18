import { useEffect, useState } from 'react';
import { getStreamData } from '../api/ml'; // ✅ use API layer

const useLivePrediction = () => {
  const [data, setData] = useState(null);
  const [anomalyResult, setAnomalyResult] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        const response = await getStreamData(); 
        const prediction = response.data;

        const inputData = {
          pressure: prediction.pressure,
          flow_rate: prediction.flow_rate,
          temperature: prediction.temperature,
          vibration: prediction.vibration,
        };

        setData(inputData);
        setAnomalyResult(prediction.is_anomaly);
        setContributors(prediction.contributors || []);

        
        if (prediction.is_anomaly) {
          const newAlert = {
            id: Date.now(),
            type: 'Anomaly Detected',
            message: `AI detected anomaly | Pressure: ${inputData.pressure}, Flow: ${inputData.flow_rate}, Temp: ${inputData.temperature}`,
            time: new Date(prediction.timestamp).toLocaleTimeString(),
            score: prediction.score,
            input: inputData,
            contributors: prediction.contributors || [],
          };

          setAlerts((prev) => [...prev, newAlert]);

          const prevLogs = JSON.parse(localStorage.getItem('anomalyLogs') || '[]');
          localStorage.setItem('anomalyLogs', JSON.stringify([...prevLogs, newAlert]));
        }

        
        const timestamp = new Date(prediction.timestamp).toLocaleTimeString();

        setChartData((prev) => {
          const newPoint = {
            time: timestamp,
            ...inputData,
          };

          const updated = [...prev, newPoint];
          return updated.length > 20 ? updated.slice(-20) : updated;
        });

        setLoading(false);
      } catch (err) {
        console.error('Stream fetch error:', err.message);
        setLoading(false);
      }
    };

    const intervalId = setInterval(fetchPrediction, 2000);
    return () => clearInterval(intervalId);
  }, []);

  return { data, anomalyResult, alerts, loading, chartData, contributors };
};

export default useLivePrediction;