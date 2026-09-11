import {
    Pill,
    Leaf,
    Calendar,
    ShieldAlert,
    CheckCircle2,
} from "lucide-react";

import { useContext } from "react";
import { AIContext } from "../../context/AIContext";

export default function TreatmentCard() {

    const { prediction } = useContext(AIContext);

    const disease = prediction.disease || "";

    const recommendation =
        prediction.recommendation || "Waiting for AI analysis...";

    let spraySchedule = "Analyze an image first.";

    let recovery = "--";

    let safety =
        "Always wear gloves, mask and avoid spraying during strong wind.";

    if (disease === "Healthy" || disease === "Young_Healthy") {

        spraySchedule = "No treatment required.";

        recovery = "Healthy Crop";

    }

    else if (disease !== "Waiting for image...") {

        spraySchedule = "Repeat treatment every 7 days until symptoms disappear.";

        recovery = prediction.confidence >= 90
            ? "High if treated immediately."
            : "Good if treated early.";

    }

    return (

        <div className="glass-card relative overflow-hidden p-6 text-white">

            <div className="h-2"></div>

            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">

                <Pill className="text-green-400" />

                AI Treatment Recommendation

            </h2>

            <div className="h-3"></div>

            <div className="grid lg:grid-cols-2 gap-6">

                {/* Left */}

                <div className="space-y-5">

                    <div className="flex gap-3">

                        <Leaf className="text-green-400 mt-1" />

                        <div>

                            <h3 className="font-semibold">

                                Recommended Treatment

                            </h3>

                            <p className="text-gray-300">

                                {recommendation}

                            </p>

                        </div>

                    </div>

                    <div className="h-5"></div>

                    <div className="flex gap-3">

                        <Calendar className="text-cyan-400 mt-1" />

                        <div>

                            <h3 className="font-semibold">

                                Spray Schedule

                            </h3>

                            <p className="text-gray-300">

                                {spraySchedule}

                            </p>

                        </div>

                    </div>

                </div>

                {/* Right */}

                <div className="space-y-5">

                    <div className="flex gap-3">

                        <ShieldAlert className="text-yellow-400 mt-1" />

                        <div>

                            <h3 className="font-semibold">

                                Safety Advice

                            </h3>

                            <p className="text-gray-300">

                                {safety}

                            </p>

                        </div>

                    </div>

                    <div className="h-5"></div>

                    <div className="flex gap-3">

                        <CheckCircle2 className="text-green-400 mt-1" />

                        <div>

                            <h3 className="font-semibold">

                                Recovery Chance

                            </h3>

                            <p className="text-green-300 font-semibold">

                                {recovery}

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}