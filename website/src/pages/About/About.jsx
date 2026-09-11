import {
    Brain,
    Camera,
    CloudSun,
    FileText,
    Map,
    Plane,
} from "lucide-react";
import drone from "../../assets/images/drone/drone.webp";
import { ArrowRight } from "lucide-react";
export default function About() {

    const features = [
        {
            icon: Camera,
            title: "Image Capture",
            desc: "ESP32-CAM captures high-quality crop images for AI analysis."
        },
        {
            icon: Plane,
            title: "Drone Monitoring",
            desc: "GPS-enabled drone helps monitor the entire farm efficiently."
        },
        {
            icon: Brain,
            title: "Disease Detection",
            desc: "AI detects crop diseases and recommends suitable treatment."
        },
        {
            icon: FileText,
            title: "Smart Reports",
            desc: "Generate detailed PDF reports for every scan."
        },
        {
            icon: CloudSun,
            title: "Weather",
            desc: "Real-time weather helps schedule spraying operations."
        },
        {
            icon: Map,
            title: "Farm Mapping",
            desc: "Visual monitoring of every section of your farm."
        }
    ];

    return (

        <div className="space-y-12">

            <div className="h-5"></div>

            {/* HERO */}

            <section className="glass-card rounded-3xl p-12 overflow-hidden">

                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left */}

                    <div>

                        <p className="uppercase tracking-[6px] text-green-400 font-semibold">

                            AGRIVISION

                        </p>

                        <h1 className="text-6xl font-black leading-tight mt-5">

                            AI Powered

                            <br />

                            <span className="text-[#AEC3B0]">

                                Smart Agriculture

                            </span>

                        </h1>

                        <p className="text-gray-300 mt-8 text-2xl leading-10">

                            AgriVision is an intelligent agriculture platform
                            that combines drone monitoring, AI disease
                            detection, farm mapping and weather monitoring
                            to help farmers protect crops and improve yield.

                        </p>

                    </div>

                    {/* Right */}

                    <div className="flex justify-center">

                        <img

                            src={drone}

                            alt="Drone"

                            className="w-[420px] animate-float drop-shadow-[0_0_45px_rgba(107,144,113,.8)]"

                        />

                    </div>

                </div>

            </section>

            {/* FEATURES */}

            <section>

                <div className="h-3"></div>

                <h2 className="text-4xl font-bold mb-10 text-center">

                    🌿 Our Features

                </h2>

                <div className="h-3"></div>

                <div className="grid lg:grid-cols-3 gap-8">

                    {features.map((item, index) => {

                        const Icon = item.icon;

                        return (

                            <div
                                key={index}
                                className="glass-card group p-8 rounded-3xl transition-all duration-500
                                hover:-translate-y-3 hover:shadow-[0_0_40px_rgba(107,144,113,0.35)]
                                border border-[#6B9071]/30 hover:border-[#AEC3B0]"
                            >

                                <div
                                    className="w-16 h-16 rounded-2xl bg-[#375534]
                                    flex items-center justify-center
                                    group-hover:rotate-12
                                    transition duration-500"
                                >

                                    <Icon
                                        size={34}
                                        className="text-[#E3EED4]"
                                    />

                                </div>

                                <h3 className="text-2xl font-bold mt-6">

                                    {item.title}

                                </h3>

                                <p className="text-gray-300 mt-4 leading-8">

                                    {item.desc}

                                </p>

                            </div>

                        );

                    })}

                </div>

            </section>

            {/* HOW IT WORKS */}

            <section>

                <div className="h-3"></div>

                <h2 className="text-4xl font-bold text-center mb-12">

                    ⚙️ How AgriVision Works

                </h2>

                <div className="h-3"></div>

                <div className="glass-card rounded-3xl p-10">

                    <div className="h-3"></div>

                    <div className="grid md:grid-cols-6 gap-6 items-center text-center">

                        {[
                            {
                                icon: "📷",
                                title: "Capture",
                                desc: "Drone captures crop images"
                            },
                            {
                                icon: "☁️",
                                title: "Upload",
                                desc: "Images sent to server"
                            },
                            {
                                icon: "🤖",
                                title: "Analyze",
                                desc: "AI processes images"
                            },
                            {
                                icon: "🦠",
                                title: "Detect",
                                desc: "Disease identified"
                            },
                            {
                                icon: "💊",
                                title: "Recommend",
                                desc: "Treatment generated"
                            },
                            {
                                icon: "📄",
                                title: "Report",
                                desc: "PDF report created"
                            }

                        ].map((step, index) => (

                            <div
                                key={index}
                                className="relative flex flex-col items-center text-center h-full"
                            >

                                <div className="w-30 h-20 mx-auto rounded-full bg-[#375534] flex items-center justify-center text-5xl border border-[#AEC3B0] shadow-[0_0_25px_rgba(107,144,113,.4)]">

                                    {step.icon}

                                </div>

                                <h3 className="font-bold text-2xl mt-5">

                                    {step.title}

                                </h3>

                                <p className="text-lg text-gray-300 mt-2 leading-6">

                                    {step.desc}

                                </p>

                                {index !== 5 && (

                                    <div className="hidden md:flex absolute top-8 -right-8 text-[#AEC3B0]">
                                        <ArrowRight size={40} />
                                    </div>

                                )}

                            </div>

                        ))}

                    </div>

                    <div className="h-3"></div>

                </div>

                <div className="h-3"></div>

            </section>

            {/* PROJECT STATS */}

            <section>

                <div className="h-3"></div>

                <h2 className="text-4xl font-bold text-center mb-12">

                    📊 AgriVision At A Glance

                </h2>

                <div className="h-4"></div>

                <div className="grid md:grid-cols-4 gap-8">

                    <div className="glass-card p-8 text-center hover:-translate-y-2 transition duration-300">

                        <div className="h-3"></div>

                        <div className="text-6xl mb-4">

                            🚁

                        </div>

                        <h3 className="text-5xl font-black text-[#AEC3B0]">

                            <div className="h-3"></div>

                            GPS

                        </h3>

                        <p className="mt-3 text-lg text-gray-300">

                            GPS Guided Drone Monitoring

                        </p>

                        <div className="h-3"></div>

                    </div>

                    <div className="glass-card p-8 text-center hover:-translate-y-2 transition duration-300">

                        <div className="h-3"></div>

                        <div className="text-6xl mb-4">

                            🤖

                        </div>

                        <h3 className="text-5xl font-black text-[#AEC3B0]">

                            <div className="h-3"></div>

                            AI

                        </h3>

                        <p className="mt-3 text-lg text-gray-300">

                            Intelligent Disease Detection

                        </p>

                    </div>

                    <div className="glass-card p-8 text-center hover:-translate-y-2 transition duration-300">

                        <div className="text-6xl mb-4">

                            <div className="h-3"></div>

                            🍊

                        </div>

                        <h3 className="text-5xl font-black text-[#AEC3B0]">

                            <div className="h-3"></div>

                            Orange

                        </h3>

                        <p className="mt-3 text-lg text-gray-300">

                            Specialized for Orange Farms

                        </p>

                    </div>

                    <div className="glass-card p-8 text-center hover:-translate-y-2 transition duration-300">

                        <div className="text-6xl mb-4">

                            <div className="h-3"></div>

                            📄

                        </div>

                        <h3 className="text-5xl font-black text-[#AEC3B0]">

                            <div className="h-3"></div>

                            PDF

                        </h3>

                        <p className="mt-3 text-lg text-gray-300">

                            Automatic Report Generation

                        </p>

                    </div>

                </div>

            </section>

            {/* Vision & Mission */}

            <section>

                <div className="h-5"></div>

                <div className="grid lg:grid-cols-2 gap-8">

                    <div className="glass-card p-10 hover:-translate-y-2 transition duration-500">

                        <div className="h-3"></div>

                        <div className="text-5xl">

                            🎯

                        </div>

                        <h2 className="text-4xl font-bold mt-6">

                            Our Mission

                        </h2>

                        <p className="mt-5 text-xl text-gray-300 leading-8">

                            To empower farmers with modern AI technology that helps detect
                            crop diseases early, reduce crop loss, improve productivity,
                            and support sustainable farming through smart monitoring.

                        </p>

                    </div>

                    <div className="glass-card p-10 hover:-translate-y-2 transition duration-500">

                        <div className="h-3"></div>

                        <div className="text-5xl">

                            🌍

                        </div>

                        <h2 className="text-4xl font-bold mt-6">

                            Our Vision

                        </h2>

                        <p className="mt-5 text-xl text-gray-300 leading-8">

                            To build an intelligent agriculture ecosystem where AI,
                            drones, IoT, and precision farming work together to make
                            agriculture smarter, more efficient, and accessible for
                            every farmer.

                        </p>

                        <div className="h-3"></div>

                    </div>

                    <div className="h-3"></div>

                </div>

            </section>

            <footer className="glass-card rounded-3xl p-10 text-center">

                <div className="h-3"></div>

                <h2 className="text-4xl font-black">

                    🌿 AgriVision

                </h2>

                <div className="h-3"></div>

                <p className="mt-4 text-xl text-gray-300">

                    AI Powered Smart Agriculture Monitoring Platform

                </p>

                <div className="h-3"></div>

                <div className="mt-8 text-xl flex justify-center gap-8 text-[#AEC3B0] font-semibold flex-wrap">

                    <span>⚛ React</span>

                    <span>🐍 Flask</span>

                    <span>🤖 TensorFlow</span>

                    <span>📷 ESP32-CAM</span>

                    <span>🚁 GPS</span>

                </div>

                <div className="h-3"></div>

                <p className="mt-8 text-lg text-gray-300">

                    Version 1.0 • Built for Smart Agriculture

                </p>

                <div className="h-3"></div>

            </footer>

        </div>

    );

}