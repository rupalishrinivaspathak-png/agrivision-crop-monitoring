import { motion } from "framer-motion";

const steps = [
    "Drone Takes Off",
    "GPS Navigation",
    "Captures Images",
    "Uploads to Server",
    "AI Detects Disease",
    "Generates Report",
];

export default function Timeline() {
    return (
        <section className="px-16 py-20">

            <h2 className="text-4xl font-bold text-center mb-16">
                How AgriVision Works
            </h2>

            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">

                {steps.map((step, index) => (

                    <motion.div
                        key={step}
                        whileHover={{ y: -10 }}
                        className="bg-[#102437] rounded-2xl p-6 text-center border border-white/10"
                    >

                        <div className="text-3xl font-bold text-green-400">
                            {index + 1}
                        </div>

                        <p className="mt-4 text-gray-300">
                            {step}
                        </p>

                    </motion.div>

                ))}

            </div>

        </section>
    );
}