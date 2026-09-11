import {
    ShieldCheck,
    Bug,
    Leaf,
    Clock,
    CheckCircle2,
} from "lucide-react";

import { useContext } from "react";
import { AIContext } from "../../context/AIContext";

export default function PredictionCard() {

    const { prediction } = useContext(AIContext);

    const healthStatus =
        prediction.disease === "Healthy" ||
            prediction.disease === "Young_Healthy"
            ? "Healthy"
            : prediction.confidence >= 90
                ? "Severe"
                : prediction.confidence >= 70
                    ? "Moderate"
                    : "Low";

    return (

        <div className="glass-card relative overflow-hidden p-6 text-white">

            <div className="h-3"></div>

            <h2 className="text-2xl font-bold mb-6">
                🤖 AI Prediction
            </h2>

            <div className="h-3"></div>

            {/* Disease */}

            <div className="text-2xl flex justify-between items-center border-b border-[#1f3b52] pb-4">

                <div className="flex items-center gap-3">

                    <Bug className="text-red-400" />

                    <span>Disease</span>

                </div>

                <span className="font-bold text-red-400">

                    {prediction.disease.replaceAll("_", " ")}

                </span>

            </div>

            <div className="h-5"></div>

            {/* Plant */}

            <div className="text-2xl flex justify-between items-center border-b border-[#1f3b52] py-4">

                <div className="flex items-center gap-3">

                    <Leaf className="text-green-400" />

                    <span>Plant</span>

                </div>

                <span className="text-green-400 font-semibold">

                    Orange Tree

                </span>

            </div>

            <div className="h-5"></div>

            {/* Health */}

            <div className="text-2xl flex justify-between items-center border-b border-[#1f3b52] py-4">

                <div className="flex items-center gap-3">

                    <ShieldCheck className="text-yellow-400" />

                    <span>Health Status</span>

                </div>

                <span className="text-yellow-400 font-semibold">

                    {healthStatus}

                </span>

            </div>

            <div className="h-5"></div>

            {/* Detection Time */}

            <div className="text-2xl flex justify-between items-center border-b border-[#1f3b52] py-4">

                <div className="flex items-center gap-3">

                    <Clock className="text-cyan-400" />

                    <span>Detection Time</span>

                </div>

                <span className="text-blue-400 font-semibold">

                    {prediction.timestamp || "--"}

                </span>

            </div>

            <div className="h-5"></div>

            {/* AI */}

            <div className="text-2xl flex justify-between items-center pt-4">

                <div className="flex items-center gap-3">

                    <CheckCircle2 className="text-green-400" />

                    <span>AI Model</span>

                </div>

                <span className="text-green-400 font-semibold">

                    EfficientNet-B3

                </span>

            </div>

            <div className="h-2"></div>

        </div>

    );

}