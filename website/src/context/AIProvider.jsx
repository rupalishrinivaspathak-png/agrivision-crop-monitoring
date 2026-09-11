import { useState, useEffect, useRef } from "react";
import { AIContext } from "./AIContext";

const FLASK_URL = import.meta.env.VITE_API_URL || "http://Ashwinis-MyLO.local:5000";
export function AIProvider({ children }) {
    const [prediction, setPrediction] = useState({
        disease: "Waiting for image...",
        confidence: 0,
        recommendation: "",
        timestamp: "",
        leaf_count: 0,
        zone_results: []
    });
    const [history, setHistory] = useState([]);
    const [espImageUrl, setEspImageUrl] = useState(null);
    const lastTimestamp = useRef("");

    useEffect(() => {
        console.log("Fetching from:", FLASK_URL);
        const fetchESP = async () => {
            try {
                const res = await fetch(FLASK_URL + '/get_result');
                const data = await res.json();
                console.log("Got data:", data);
                if (
                    data.disease &&
                    data.disease !== "Waiting for image..." &&
                    data.timestamp !== lastTimestamp.current
                ) {

                    lastTimestamp.current = data.timestamp;

                    setPrediction(data);

                    setEspImageUrl(FLASK_URL + '/latest_image?t=' + Date.now());

                    setHistory((prev) => {

                        if (prev.length > 0 && prev[0].time === data.timestamp)
                            return prev;

                        return [

                            {
                                time: data.timestamp,
                                disease: data.disease,
                                confidence: data.confidence,
                                recommendation: data.recommendation,
                                image: FLASK_URL + "/latest_image?t=" + Date.now(),
                                leaf_count: data.leaf_count,
                                zone_results: data.zone_results,
                                status:
                                    data.disease === "Healthy" ||
                                        data.disease === "Young_Healthy"
                                        ? "Healthy"
                                        : "Disease",
                                source: "ESP32-CAM"
                            },

                            ...prev

                        ];

                    });

                }
            } catch (err) { }
        };
        fetchESP();
        const interval = setInterval(fetchESP, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <AIContext.Provider value={{
            prediction, setPrediction,
            history, setHistory,
            espImageUrl
        }}>
            {children}
        </AIContext.Provider>
    );
}