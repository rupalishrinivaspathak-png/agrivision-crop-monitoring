import {
    FaRobot,
    FaSatelliteDish,
    FaLeaf,
    FaCloudSun
} from "react-icons/fa";

const data = [
    {
        title: "AI Disease Detection",
        icon: <FaRobot />,
        desc: "Detects crop diseases using Artificial Intelligence."
    },

    {
        title: "GPS Navigation",
        icon: <FaSatelliteDish />,
        desc: "Autonomous line-by-line farm navigation."
    },

    {
        title: "Orange Farm Monitoring",
        icon: <FaLeaf />,
        desc: "Designed specifically for Orange Orchards."
    },

    {
        title: "Weather Prediction",
        icon: <FaCloudSun />,
        desc: "Temperature, humidity and rainfall forecast."
    }
];

export default function Features() {

    return (

        <section className="py-24 px-16">

            <h2 className="text-5xl font-bold text-center text-white mb-16">

                Why Choose AgriVision

            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

                {data.map((item, index) => (

                    <div
                        key={index}
                        className="bg-[#132436] p-8 rounded-3xl hover:scale-105 duration-300">

                        <div className="text-5xl text-green-400 mb-6">

                            {item.icon}

                        </div>

                        <h3 className="text-2xl font-bold">

                            {item.title}

                        </h3>

                        <p className="text-gray-400 mt-4">

                            {item.desc}

                        </p>

                    </div>

                ))}

            </div>

        </section>

    )

}