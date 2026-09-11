import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";

import PrimaryButton from "../Buttons/PrimaryButton";
import droneImage from "../../assets/images/drone/drone1.webp";
import heroBg from "../../assets/images/hero/orange-farm.webp";

import { ArrowRight } from "lucide-react";
export default function Hero() {

    const navigate = useNavigate();

    return (

        <section
            className="glass-card relative overflow-hidden p-6 relative rounded-3xl overflow-hidden min-h-[100vh]"
            style={{
                backgroundImage: `url(${heroBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >

            {/* Dark Overlay */}

            <div className="absolute inset-0 bg-[#081420]/50"></div>

            {/* Decorative Blur */}

            <div className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full bg-green-500/20 blur-[120px]"></div>

            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-orange-500/20 blur-[120px]"></div>

            {/* Main Content */}

            <div className="relative z-10 flex items-center justify-between px-16 py-16 min-h-[85vh]">

                {/* Left */}

                <motion.div

                    initial={{ opacity: 0, x: -100 }}

                    animate={{ opacity: 1, x: 0 }}

                    transition={{ duration: 1 }}

                    className="max-w-2xl"
                >

                    <span className="w-150 text-5xl inline-block px-5 py-2 rounded-full bg-green-500/5 text-green-500 text-center font-semibold border border-green-800">

                        AI Powered Agriculture

                    </span>

                    <h1 className="w-500 mt-8 text-8xl font-black leading-tight text-green-200">

                        Smart Farming

                        <br />

                        Starts From

                        <span className="text-green-600">

                            {" "}The Sky

                        </span>

                    </h1>

                    <div className="mt-6 text-4xl font-semibold text-orange-300">

                        <TypeAnimation

                            sequence={[
                                "Autonomous Drone Navigation",
                                2000,
                                "AI Disease Detection",
                                2000,
                                "ESP32-CAM Live Monitoring",
                                2000,
                                "GPS Guided Smart Farming",
                                2000,
                            ]}

                            speed={45}

                            repeat={Infinity}

                        />

                    </div>
                    <div className="h-5"></div>
                    <p className="w-260 mt-8 text-3xl text-gray-400 leading-12">
                        AgriVision is an intelligent drone-based crop monitoring system
                        specially designed for orange orchards. It combines ESP32-CAM,
                        GPS navigation, Artificial Intelligence and Machine Learning to
                        detect crop diseases, monitor farm health, and provide farmers
                        with real-time recommendations.
                    </p>
                    <div className="h-5"></div>

                    <div className="w-250 flex gap-8 mt-10">

                        <PrimaryButton
                            onClick={() => navigate("/mission")}
                            className="w-90 h-15 leading-10 bg-green-800 text-white text-center py-3 rounded-lg text-lg font-bold"
                        >
                            <span className="text-3xl flex items-center justify-center gap-3">
                                Live Camera Field

                                <span className="w-9 h-9 rounded-full bg-white text-green-800 flex items-center justify-center transition-all duration-300 group-hover:translate-x-1">
                                    <ArrowRight size={20} strokeWidth={2.5} />
                                </span>
                            </span>
                        </PrimaryButton>

                        <PrimaryButton
                            onClick={() => navigate("/detection")}
                            className="w-90 h-15 leading-10 bg-orange-800 text-white text-center py-3 rounded-lg text-lg font-bold hover:shadow-green-500/30 bg-orange-600 hover:bg-orange-600"
                        >
                            <span className="text-3xl flex items-center justify-center gap-3">
                                Disease Detection

                                <span className="w-9 h-9 rounded-full bg-white text-orange-800 flex items-center justify-center transition-all duration-300 group-hover:translate-x-1">
                                    <ArrowRight size={20} strokeWidth={2.5} />
                                </span>
                            </span>
                        </PrimaryButton>

                    </div>

                </motion.div>

                {/* Right */}

                <motion.div

                    initial={{ opacity: 0, x: 100 }}

                    animate={{ opacity: 1, x: 0 }}

                    transition={{ duration: 1 }}

                    className="flex flex-col items-center gap-8"

                >

                    <motion.img

                        src={droneImage}

                        alt="Drone"

                        className="relative right-20 w-[500px]"

                        animate={{

                            y: [0, -20, 0],

                            rotate: [0, 1, 0, -1, 0]

                        }}

                        transition={{

                            duration: 4,

                            repeat: Infinity

                        }}

                    />

                </motion.div>

            </div>

        </section>

    );

}