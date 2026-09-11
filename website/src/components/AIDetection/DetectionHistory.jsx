import {
    Clock,
    CheckCircle2,
    AlertTriangle,
    XCircle,
} from "lucide-react";

import { useContext } from "react";
import { AIContext } from "../../context/AIContext";
import { useNavigate } from "react-router-dom";
export default function DetectionHistory() {

    const { history, setHistory } = useContext(AIContext);
    const navigate = useNavigate();

    return (

        <div className="glass-card relative overflow-hidden p-6 text-white">

            <div className="h-2"></div>

            <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold">

                    📋 Detection History

                </h2>

                <span className="text-green-400">

                    {history.length} Records

                </span>

            </div>

            <div className="h-2"></div>

            <div className="space-y-4">

                {history.length === 0 ? (

                    <div className="text-center text-gray-300 py-10">

                        No detections yet.

                    </div>

                ) : (

                    history.map((item, index) => (

                        <div
                            key={index}
                            className="flex justify-between items-center border-b border-green-900 pb-4"
                        >

                            <div className="flex items-center gap-3">

                                <Clock
                                    size={18}
                                    className="text-cyan-400"
                                />

                                <span>

                                    {item.time}

                                </span>

                            </div>

                            <span className="font-semibold">

                                {item.disease.replaceAll("_", " ")}

                            </span>

                            <span className="text-green-400">

                                {Number(item.confidence).toFixed(1)}%

                            </span>

                            {item.status === "Healthy" ? (

                                <CheckCircle2
                                    className="text-green-400"
                                    size={22}
                                />

                            ) : (

                                <AlertTriangle
                                    className="text-red-400"
                                    size={22}
                                />

                            )}

                        </div>

                    ))

                )}

            </div>

            <div className="h-2"></div>

            <div className="mt-6 flex gap-4">

                <button
                    onClick={() => navigate("/reports")}
                    className="flex-1 bg-green-800 hover:bg-green-500 rounded-xl py-3 font-semibold transition"
                >
                    📄 View Reports
                </button>

                <button
                    onClick={() => setHistory([])}
                    className="bg-red-600 hover:bg-red-500 rounded-xl px-6 transition"
                >

                    <XCircle />

                </button>

            </div>

        </div>

    );

}