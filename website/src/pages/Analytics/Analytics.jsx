import { useContext } from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend
} from "recharts";

import { AIContext } from "../../context/AIContext";

export default function Analytics() {

    const { history } = useContext(AIContext);

    // ---------------- PIE CHART ----------------

    const diseaseCount = {};

    history.forEach(item => {

        const disease = item.disease.replaceAll("_", " ");

        diseaseCount[disease] = (diseaseCount[disease] || 0) + 1;

    });

    const pieData = Object.keys(diseaseCount).map(key => ({

        name: key,

        value: diseaseCount[key]

    }));

    const COLORS = [

        "#22c55e",
        "#ef4444",
        "#facc15",
        "#3b82f6",
        "#8b5cf6",
        "#06b6d4"

    ];

    // ---------------- LINE GRAPH ----------------

    const lineData = history.map((item, index) => ({

        scan: index + 1,

        confidence: item.confidence

    }));

    return (

        <div className="space-y-10">

            <div>

                <h1 className="text-4xl font-bold">

                    📊 Analytics

                </h1>

                <p className="text-gray-400 mt-2">

                    Disease distribution and AI performance

                </p>

            </div>

            {/* PIE CHART */}

            <div className="h-3"></div>

            <div className="glass-card relative overflow-hidden p-6 bg-[#0d1b2a] rounded-2xl border border-[#1f3b52] p-6">

                <h2 className="text-2xl font-bold mb-5">

                    <div className="h-3"></div>

                    🥧 Disease Distribution

                    <div className="h-3"></div>

                </h2>

                <div className="h-[420px]">

                    <ResponsiveContainer>

                        <PieChart>

                            <Pie

                                data={pieData}

                                dataKey="value"

                                nameKey="name"

                                outerRadius={150}

                                label

                            >

                                {

                                    pieData.map((entry, index) => (

                                        <Cell

                                            key={index}

                                            fill={COLORS[index % COLORS.length]}

                                        />

                                    ))

                                }

                            </Pie>

                            <Tooltip />

                            <Legend />

                        </PieChart>

                    </ResponsiveContainer>

                </div>

            </div>

            {/* LINE GRAPH */}

            <div className="h-4"></div>

            <div className="glass-card relative overflow-hidden p-6 bg-[#0d1b2a] rounded-2xl border border-[#1f3b52] p-6">

                <h2 className="text-2xl font-bold mb-5">

                    <div className="h-3"></div>

                    📈 AI Confidence Trend

                    <div className="h-3"></div>

                </h2>

                <div className="h-[420px]">

                    <ResponsiveContainer>

                        <LineChart

                            data={lineData}

                        >

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="scan" />

                            <YAxis />

                            <Tooltip />

                            <Legend />

                            <Line

                                type="monotone"

                                dataKey="confidence"

                                stroke="#61f999"

                                strokeWidth={3}

                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>

            </div>

        </div>

    );

}