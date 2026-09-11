import { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar/Topbar";
import bgImage from "../assets/images/backgrounds/background.webp";
export default function DashboardLayout({ children }) {

    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (

        <div
            className="min-h-screen bg-cover bg-center bg-fixed"
            style={{
                backgroundImage: `url(${bgImage})`,
            }}
        >
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <div
                className={`flex flex-col flex-1 transition-all duration-300 ${sidebarOpen ? "ml-72" : "ml-0"
                    }`}
            >

                <Topbar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />

                <main className="flex-1 p-8 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">

                        <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-[#AEC3B0] blur-[180px]" />

                        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] rounded-full bg-[#6B9071] blur-[220px]" />

                    </div>

                    {children}

                </main>

            </div>

        </div>

    );

}