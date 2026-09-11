import { Plane } from "lucide-react";
import { motion } from "framer-motion";

export default function DroneOverlay() {

    return (

        <motion.div

            animate={{

                x: [
                    20, 180, 340, 500, 660, 820,
                    820, 660, 500, 340, 180, 20,
                    20
                ],

                y: [
                    20, 20, 20, 20, 20, 20,
                    100, 100, 100, 100, 100, 100,
                    180
                ]

            }}

            transition={{

                duration: 18,

                repeat: Infinity,

                ease: "linear"

            }}

            className="absolute z-50"

        >

            <div className="relative">

                <Plane
                    size={42}
                    className="text-cyan-300 rotate-90"
                />

                {/* Glow */}

                <div className="absolute -bottom-4 left-4 w-10 h-10 rounded-full bg-green-400 blur-xl opacity-60"></div>

            </div>

        </motion.div>

    );

}