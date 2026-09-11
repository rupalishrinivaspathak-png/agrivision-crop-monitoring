import { NavLink } from "react-router-dom";
import {
    House,
    LayoutDashboard,
    Plane,
    BrainCircuit,
    Map,
    ChartColumn,
    FileText,
    CloudSun,
    Settings,
    Info,
    Leaf,
} from "lucide-react";

export default function Navbar() {
    const menu = [
        { name: "Home", icon: House, path: "/" },
        { name: "Mission", icon: Plane, path: "/mission" },
        { name: "Detection", icon: BrainCircuit, path: "/detection" },
        { name: "Analytics", icon: ChartColumn, path: "/analytics" },
        { name: "Reports", icon: FileText, path: "/reports" },
        { name: "Weather", icon: CloudSun, path: "/weather" },
        { name: "Settings", icon: Settings, path: "/settings" },
        { name: "About", icon: Info, path: "/about" },
    ];

    return (
        <aside className="fixed left-0 top-0 w-72 h-screen bg-[#07111d] border-r border-green-900">

            <div className="flex items-center gap-3 p-6 border-b border-green-900">

                <Leaf size={34} className="text-green-400" />

                <div>
                    <h1 className="text-2xl font-bold text-green-400">
                        AgriVision
                    </h1>
                    <p className="text-gray-400 text-sm">
                        AI Crop Monitoring
                    </p>
                </div>

            </div>

            <div className="mt-6 px-3">

                {menu.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-4 px-5 py-4 rounded-xl mb-2 transition-all ${isActive
                                    ? "bg-green-600 text-white"
                                    : "text-gray-300 hover:bg-[#11253c]"
                                }`
                            }
                        >
                            <Icon size={22} />
                            <span>{item.name}</span>
                        </NavLink>
                    );
                })}

            </div>

        </aside>
    );
}