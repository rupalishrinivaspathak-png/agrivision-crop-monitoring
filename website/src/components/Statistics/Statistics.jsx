const stats = [

    ["100", "Trees"],

    ["98.7%", "Accuracy"],

    ["24", "Diseases"],

    ["GPS", "Navigation"],

    ["Live", "Monitoring"]

];

export default function Statistics() {

    return (

        <section className="py-20">

            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">

                {

                    stats.map((item, index) => (

                        <div
                            key={index}
                            className="bg-[#14283b] rounded-3xl p-8 text-center">

                            <h2 className="text-5xl text-green-400 font-bold">

                                {item[0]}

                            </h2>

                            <p className="mt-4">

                                {item[1]}

                            </p>

                        </div>

                    ))

                }

            </div>

        </section>

    )

}