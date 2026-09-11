import {
    Home,
    LayoutDashboard,
    Plane,
    Brain,
    Map,
    BarChart3,
    FileText,
    CloudSun,
    Images,
    Settings,
    Info,
    Leaf,
    X,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menu = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Live Field", icon: Plane, path: "/mission" },
    { name: "AI Detection", icon: Brain, path: "/detection" },
    { name: "Analytics", icon: BarChart3, path: "/analytics" },
    { name: "Reports", icon: FileText, path: "/reports" },
    { name: "Weather", icon: CloudSun, path: "/weather" },
    { name: "Gallery", icon: Images, path: "/gallery" },
    { name: "Settings", icon: Settings, path: "/settings" },
    { name: "About", icon: Info, path: "/about" },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {

    return (

        <aside
            className={`fixed top-0 left-0 h-screen w-100 bg-[#081420] flex flex-col z-50 transition-all duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
        >

            {/* Header */}

            <div className="glass-card relative overflow-hidden p-6 flex items-center justify-between p-6">

                <div className="flex items-center gap-3">

                    <Leaf size={100} className="text-green-400" />

                    <div>

                        <h1 className="text-4xl font-bold text-green-300">
                            AgriVision
                        </h1>

                        <p className="text-gray-400 text-lg">
                            AI Crop Monitoring
                        </p>

                    </div>

                </div>

                <button onClick={() => setSidebarOpen(false)}>
                    <X className="text-white" />
                </button>

            </div>

            {/* Menu */}

            <nav className="glass-card relative overflow-hidden p-6 flex-1 px-3 py-4">

                {menu.map((item) => (

                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `text-3xl flex items-center gap-6 px-4 py-3 rounded-xl mb-2 transition
                            ${isActive
                                ? "bg-green-900 text-white"
                                : "hover:bg-[#12283a] text-gray-300"
                            }`
                        }
                    >

                        <item.icon size={60} />

                        <span>{item.name}</span>

                    </NavLink>

                ))}

            </nav>

            {/* Bottom */}

            <div className="glass-card relative overflow-hidden p-6 p-5">

                <h3 className="text-3xl text-green-300 font-semibold">
                    Drone Status
                </h3>

                <p className="text-white text-lg">
                    Ready for Mission
                </p>

            </div>

        </aside>

    );

}