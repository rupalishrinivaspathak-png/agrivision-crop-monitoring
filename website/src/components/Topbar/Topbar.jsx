import {
    Wifi,
    BatteryFull,
    MapPinned,
    Bell,
    UserCircle,
    Menu,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Topbar({ sidebarOpen, setSidebarOpen }) {

    const [time, setTime] = useState("");
    const navigate = useNavigate();

    useEffect(() => {

        const updateClock = () => {

            const now = new Date();

            setTime(
                now.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                })
            );

        };

        updateClock();

        const timer = setInterval(updateClock, 1000);

        return () => clearInterval(timer);

    }, []);

    return (

        <header className="glass-card relative overflow-hidden p-6 sticky top-0 z-40 h-20 bg-[#0d1b2a] border-b border-green-700 flex items-center justify-between px-8">

            {/* Left */}

            <div className="flex items-center gap-5">

                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 rounded-lg hover:bg-[#16314d]"
                >
                    <Menu size={28} />
                </button>

                <div>

                    <h1 className="text-3xl font-bold">
                        AgriVision Dashboard
                    </h1>

                    <p className="text-gray-400 text-lg">
                        Smart Crop Monitoring
                    </p>

                </div>

            </div>

            {/* Right */}

            <div className="flex items-center gap-6">

                <MapPinned className="text-green-400" />

                <span className="text-lg text-white-400 font-bold">
                    {time}
                </span>

                <button onClick={() => navigate("/settings")}>

                    <UserCircle className="text-green-400" size={34} />

                </button>

            </div>

        </header>

    );

}