import { useState, useEffect } from "react";

// ── Change this IP every time your laptop IP changes ──
const FLASK_URL = import.meta.env.VITE_API_URL || "http://Ashwinis-MyLO.local:5000";

export function useAgriVision() {
    const [result, setResult] = useState({
        disease: "Waiting...",
        confidence: 0,
        recommendation: "",
        timestamp: "",
        zone_results: [],
        leaf_count: 0
    });
    const [imageUrl, setImageUrl] = useState(null);
    const [connected, setConnected] = useState(false);

    const fetchResult = async () => {
        try {
            const res = await fetch(FLASK_URL + '/get_result');
            const data = await res.json();
            setConnected(true);
            if (data.disease && data.disease !== "Waiting for image...") {
                setResult(data);
                setImageUrl(FLASK_URL + '/latest_image?t=' + Date.now());
            }
        } catch (err) {
            setConnected(false);
        }
    };

    useEffect(() => {
        fetchResult();
        const interval = setInterval(fetchResult, 5000);
        return () => clearInterval(interval);
    }, []);

    return { result, imageUrl, fetchResult, connected };
}