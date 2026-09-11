import { useState, useEffect } from "react";
import DroneOverlay from "./DroneOverlay";

const ROWS = 7;
const COLS = 12;

export default function SmartFarmGrid() {

    const [current, setCurrent] = useState(0);

    useEffect(() => {

        const timer = setInterval(() => {

            setCurrent((prev) => (prev + 1) % (ROWS * COLS));

        }, 500);

        return () => clearInterval(timer);

    }, []);

    const diseased = [15, 34, 57];
    const scanned = [];

    for (let i = 0; i < current; i++) {
        scanned.push(i);
    }

    return (

        <div className="glass-card relative overflow-hidden p-6 relative bg-[#0d1b2a] border border-[#1f3b52] rounded-2xl p-5">
            <div className="flex justify-between mb-5">

                <h2 className="text-2xl font-bold">
                    <div className="h-3"></div>
                    🌳 Smart Orchard
                    <div className="h-3"></div>
                </h2>

                <span className="text-green-400">
                    <div className="h-3"></div>
                    {current}/{ROWS * COLS} Trees
                    <div className="h-3"></div>
                </span>

            </div>

            <DroneOverlay />

            <div className="grid grid-cols-12 gap-3">

                {Array.from({ length: ROWS * COLS }).map((_, index) => {

                    let bg = "bg-green-600";

                    if (diseased.includes(index))
                        bg = "bg-red-500";

                    if (scanned.includes(index))
                        bg = "bg-green-500";

                    if (index === current)
                        bg = "bg-yellow-400 animate-pulse";

                    return (

                        <div
                            key={index}
                            className={`${bg}
                            h-14 rounded-xl
                            flex items-center
                            justify-center
                            text-xl
                            transition-all
                            duration-300`}
                        >

                            🌳

                        </div>

                    );

                })}

            </div>

        </div>

    );

}