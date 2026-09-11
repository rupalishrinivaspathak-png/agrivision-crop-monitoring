import { useEffect, useState } from "react";

export default function Gallery() {

    const [images, setImages] = useState([]);

    useEffect(() => {

        fetch("http://127.0.0.1:5000/gallery")

            .then(res => res.json())

            .then(data => setImages(data));

    }, []);

    return (

        <div className="space-y-8">

            <div className="h-2"></div>

            <h1 className="text-4xl font-bold">

                📷 Drone Scan Gallery

            </h1>

            <div className="h-3"></div>

            <div className="grid lg:grid-cols-4 gap-6">

                {

                    images.map((item, index) => (

                        <div

                            key={index}

                            className="glass-card relative overflow-hidden p-6"

                        >

                            <img

                                src={`http://127.0.0.1:5000/${item.annotated}`}

                                className="h-70 w-full object-cover"

                            />

                            <div className="p-5 flex flex-col items-center text-center">

                                <h2 className="text-3xl font-bold text-green-400">

                                    {item.disease.replaceAll("_", " ")}

                                </h2>

                                <p className="text-green-300 mt-3 text-lg">

                                    Confidence • {Number(item.confidence).toFixed(1)}%

                                </p>

                                <p className="text-gray-300 mt-2">

                                    🍃 {item.leaf_count} Leaves Detected

                                </p>

                                <p>

                                    {item.timestamp}

                                </p>

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}