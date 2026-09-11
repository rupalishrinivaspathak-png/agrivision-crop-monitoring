import {
    FaPlane,
    FaCamera,
    FaBrain,
    FaFileAlt
} from "react-icons/fa";

const steps = [

    "Drone captures images",

    "Images sent to server",

    "AI detects disease",

    "Detailed report generated"

];

export default function Working() {

    const icons = [

        <FaPlane />,

        <FaCamera />,

        <FaBrain />,

        <FaFileAlt />

    ];

    return (

        <section className="py-24">

            <h2 className="text-5xl font-bold text-center">

                How It Works

            </h2>

            <div className="flex justify-center gap-10 mt-16 flex-wrap">

                {

                    steps.map((step, index) => (

                        <div
                            key={index}
                            className="w-60 text-center">

                            <div className="text-6xl text-green-500 mb-5">

                                {icons[index]}

                            </div>

                            <h3 className="font-bold">

                                Step {index + 1}

                            </h3>

                            <p className="mt-3 text-gray-400">

                                {step}

                            </p>

                        </div>

                    ))

                }

            </div>

        </section>

    )

}