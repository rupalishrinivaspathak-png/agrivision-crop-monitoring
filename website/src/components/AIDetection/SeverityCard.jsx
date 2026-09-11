import { AlertTriangle } from "lucide-react";
import { useContext } from "react";
import { AIContext } from "../../context/AIContext";

export default function SeverityCard() {

    const { prediction } = useContext(AIContext);

    const confidence = prediction.confidence || 0;

    let severity = "";
    let color = "";
    let width = "";
    let message = "";

    if (
        prediction.disease === "Healthy" ||
        prediction.disease === "Young_Healthy"
    ) {

        severity = "Low";
        color = "bg-green-700";
        width = "20%";
        message =
            "The crop appears healthy. Continue regular monitoring.";

    }

    else if (confidence >= 90) {

        severity = "High";
        color = "bg-red-700";
        width = "100%";
        message =
            "High disease confidence detected. Immediate treatment is recommended.";

    }

    else if (confidence >= 70) {

        severity = "Moderate";
        color = "bg-yellow-700";
        width = "65%";
        message =
            "Disease is present. Treatment should be started within a few days.";

    }

    else {

        severity = "Low";
        color = "bg-green-700";
        width = "35%";
        message =
            "Prediction confidence is low. Capture another image for confirmation.";

    }

    return (

        <div className="glass-card relative overflow-hidden p-6 text-white">

            <div className="h-2"></div>

            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">

                <AlertTriangle className="text-yellow-400" />

                Disease Severity

            </h2>

            <div className="h-2"></div>

            <div className="space-y-5">

                <div>

                    <div className="flex justify-between mb-2">

                        <span>Severity Level</span>

                        <span className="font-semibold">

                            {severity}

                        </span>

                    </div>

                    <div className="h-3"></div>

                    <div className="w-full rounded-full h-4">

                        <div
                            className={`${color} h-4 rounded-full`}
                            style={{ width }}
                        />

                    </div>

                </div>

                <div className="h-10"></div>

                <div className="grid grid-cols-3 gap-3">

                    <div
                        className={`rounded-xl py-3 text-center ${severity === "Low"
                            ? "bg-green-800 font-bold"
                            : "bg-[#23384b]"
                            }`}
                    >
                        Low
                    </div>

                    <div
                        className={`rounded-xl py-3 text-center ${severity === "Moderate"
                            ? "bg-yellow-800 text-black font-bold"
                            : "bg-[#23384b]"
                            }`}
                    >
                        Moderate
                    </div>

                    <div
                        className={`rounded-xl py-3 text-center ${severity === "High"
                            ? "bg-red-800 font-bold"
                            : "bg-[#23384b]"
                            }`}
                    >
                        High
                    </div>

                </div>

                <div className="h-5"></div>

                <div
                    className={`border rounded-xl p-4 ${severity === "High"
                        ? "border-red-500 bg-red-500/10"
                        : severity === "Moderate"
                            ? "border-yellow-500 bg-yellow-500/10"
                            : "border-green-500 bg-green-500/10"
                        }`}
                >

                    <p className="text-lg">

                        {message}

                    </p>

                </div>

                <div className="h-2"></div>

            </div>

        </div>

    );

}