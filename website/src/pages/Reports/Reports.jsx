import { useContext } from "react";
import { AIContext } from "../../context/AIContext";

import {
    Download,
    Clock,
    Bug,
    CheckCircle2,
    AlertTriangle,
} from "lucide-react";

import { generateReport } from "../../utils/generateReport";
export default function Reports() {

    const { history } = useContext(AIContext);

    return (

        <div className="space-y-8">

            <div>

                <div className="h-2"></div>

                <h1 className="text-4xl font-bold">

                    📄 Scan Reports

                </h1>

                <p className="text-gray-300 mt-2">

                    All previous AI detections

                    <div className="h-3"></div>

                </p>

            </div>

            {history.length === 0 ? (

                <div className="glass-card relative overflow-hidden p-6 bg-[#0d1b2a] rounded-2xl p-12 text-center border border-[#1f3b52]">
                    <div className="h-2"></div>
                    No reports available.
                    <div className="h-2"></div>

                </div>

            ) : (

                history.map((item, index) => (

                    <div

                        key={index}

                        className="glass-card relative overflow-hidden p-6 bg-[#0d1b2a] border border-[#1f3b52] rounded-2xl p-6"

                    >

                        <div className="h-3"></div>

                        <div className="grid lg:grid-cols-3 gap-6">

                            {/* Image */}

                            <img

                                src={item.image}

                                alt="Crop"

                                className="rounded-xl h-64 w-full object-cover"

                            />

                            {/* Details */}

                            <div className="space-y-4">

                                <div className="flex gap-2 items-center">

                                    <Bug className="text-red-400" />

                                    <span>

                                        Disease :

                                        <b>

                                            {" "}

                                            {item.disease.replaceAll("_", " ")}

                                        </b>

                                    </span>

                                </div>

                                <div>

                                    <div className="font-semibold">

                                        Confidence

                                    </div>

                                    <div className="w-full rounded-full h-3 mt-2">

                                        <div

                                            className="bg-green-600 h-3 rounded-full"

                                            style={{
                                                width: `${item.confidence}%`
                                            }}

                                        />

                                    </div>

                                    <p className="mt-2 text-green-400">

                                        {item.confidence.toFixed(1)}%

                                    </p>

                                </div>

                                <div>

                                    Recommendation

                                </div>

                                <p className="text-gray-300">

                                    {item.recommendation}

                                </p>

                            </div>

                            {/* Right */}

                            <div className="flex flex-col justify-between">

                                <div className="space-y-3">

                                    <div className="flex gap-2 items-center">

                                        <Clock />

                                        {item.time}

                                    </div>

                                    <div>

                                        Leaves Detected :

                                        {" "}

                                        {item.leaf_count}

                                    </div>

                                    <div>

                                        Status :

                                        {

                                            item.status === "Healthy"

                                                ?

                                                <span className="bg-green-700/20 text-green-300 px-4 py-2 rounded-full">
                                                    Healthy
                                                </span>

                                                :

                                                <span className="bg-red-700/20 text-red-300 px-4 py-2 rounded-full">
                                                    <AlertTriangle />

                                                    Disease Found

                                                </span>

                                        }

                                    </div>

                                </div>

                                <button

                                    onClick={() => generateReport(item)}

                                    className="mt-6 bg-green-900 hover:bg-green-700 rounded-xl py-3 flex justify-center gap-2"

                                >

                                    <Download />

                                    Download PDF

                                </button>

                            </div>

                        </div>

                        <div className="h-5"></div>

                    </div>

                ))


            )}


        </div>


    );

}