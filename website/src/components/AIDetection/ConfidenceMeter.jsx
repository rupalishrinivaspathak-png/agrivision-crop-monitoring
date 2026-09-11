import { useContext } from "react";
import { AIContext } from "../../context/AIContext";

export default function ConfidenceMeter() {

    const { prediction } = useContext(AIContext);

    const confidence = Math.round(prediction.confidence || 0);

    const radius = 70;
    const stroke = 12;

    const normalizedRadius = radius - stroke / 2;

    const circumference = normalizedRadius * 2 * Math.PI;

    const offset =
        circumference - (confidence / 100) * circumference;

    let message = "";
    let color = "#2efb79";

    if (confidence >= 90) {

        message = "Excellent Prediction Confidence";
        color = "#58eb8e";

    }

    else if (confidence >= 75) {

        message = "Good Prediction Confidence";
        color = "#f0d155";

    }

    else if (confidence >= 50) {

        message = "Average Prediction Confidence";
        color = "#f1a976";

    }

    else {

        message = "Low Prediction Confidence";
        color = "#f68e8e";

    }

    return (

        <div className="glass-card relative overflow-hidden p-6 text-white">

            <h2 className="text-2xl font-bold mb-6">

                <div className="h-2"></div>

                🎯 AI Confidence

                <div className="h-2"></div>

            </h2>

            <div className="flex justify-center">

                <svg
                    height={160}
                    width={160}
                >

                    <circle
                        stroke="#b7d4f0"
                        fill="transparent"
                        strokeWidth={stroke}
                        r={normalizedRadius}
                        cx="80"
                        cy="80"
                    />

                    <circle
                        stroke={color}
                        fill="transparent"
                        strokeWidth={stroke}
                        strokeLinecap="round"
                        strokeDasharray={`${circumference} ${circumference}`}
                        strokeDashoffset={offset}
                        r={normalizedRadius}
                        cx="80"
                        cy="80"
                        transform="rotate(-90 80 80)"
                    />

                    <text
                        x="50%"
                        y="50%"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        className="fill-white text-2xl font-bold"
                    >

                        {confidence}%

                    </text>

                </svg>

            </div>

            <p
                className="text-center font-semibold mt-4"
                style={{ color }}
            >

                {message}

            </p>

            <div className="h-2"></div>

        </div>

    );

}