import {
    Thermometer,
    Droplets,
    Wind,
    CloudRain,
    Sun,
    Cloud,
    Eye,
    Gauge,
    Sunrise,
    Sunset,
    MapPin,
} from "lucide-react";
import { useEffect, useState } from "react";

function WeatherCard({ icon: Icon, title, value, color }) {
    return (
        <div className="glass-card relative overflow-hidden p-6">

            <div className="flex flex-col items-center justify-center text-center relative h-full">

                <div className="h-2"></div>

                <div>
                    <p className="text-center text-gray-300 text-xl">{title}</p>
                    <h2 className="text-center text-3xl font-bold mt-2">{value}</h2>
                </div>

                <div className={`${color} p-3 rounded-lg`}>
                    <Icon size={30} />
                </div>

                <div className="h-2"></div>

            </div>

        </div>
    );
}

export default function Weather() {
    const [location, setLocation] = useState("Fetching location...");
    const [weather, setWeather] = useState(null);
    const [coords, setCoords] = useState({
        latitude: 20.9374,
        longitude: 77.7796,
    });
    const [mapKey, setMapKey] = useState(0);
    useEffect(() => {

        navigator.geolocation.getCurrentPosition(
            async (position) => {

                const { latitude, longitude } = position.coords;

                setCoords({
                    latitude,
                    longitude,
                });

                const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
                );

                const data = await response.json();

                setLocation(`${data.name}, ${data.sys.country}`);
                setWeather(data);

            },
            (error) => {
                console.log(error);
                setLocation("Location Permission Denied");
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 0,
            }
        );

    }, []);

    return (

        <div className="space-y-8">

            <div>

                <div className="h-2"></div>

                <h1 className="text-4xl font-bold">
                    🌦 Weather Dashboard
                </h1>

                <div className="h-2"></div>

                <p className="text-gray-300 mt-2">
                    Live weather monitoring for drone operation
                </p>

                <div className="h-3"></div>

            </div>

            {/* Weather Cards */}

            <div className="grid lg:grid-cols-3 gap-6">

                <WeatherCard
                    icon={Thermometer}
                    title="Temperature"
                    value={weather ? `${weather.main.temp} °C` : "--"}
                    color="bg-red-500"
                />

                <WeatherCard
                    icon={Droplets}
                    title="Humidity"
                    value={weather ? `${weather.main.humidity}%` : "--"}
                    color="bg-blue-500"
                />

                <WeatherCard
                    icon={Wind}
                    title="Wind Speed"
                    value={weather ? `${weather.wind.speed} m/s` : "--"}
                    color="bg-cyan-500"
                />

                <WeatherCard
                    icon={Gauge}
                    title="Pressure"
                    value={weather ? `${weather.main.pressure} hPa` : "--"}
                    color="bg-green-500"
                />

                <WeatherCard
                    icon={Cloud}
                    title="Cloud Cover"
                    value={weather ? `${weather.clouds.all}%` : "--"}
                    color="bg-slate-500"
                />

                <WeatherCard
                    icon={Eye}
                    title="Visibility"
                    value={weather ? `${weather.visibility / 1000} km` : "--"}
                    color="bg-purple-500"
                />

            </div>
            {/* Bottom Dashboard */}

            <div className="h-5"></div>

            <button
                onClick={() => setMapKey(prev => prev + 1)}
                className="mb-4 px-4 py-2 bg-green-800 hover:bg-green-600 rounded-lg font-semibold transition"
            >
                📍 Center on My Location...

            </button>

            <div className="h-5"></div>

            <div className="grid lg:grid-cols-2 gap-6">

                {/* Left */}

                <div className="glass-card relative overflow-hidden p-6 rounded-xl overflow-hidden">

                    <iframe
                        key={mapKey}
                        title="Weather Map"
                        width="100%"
                        height="510"
                        frameBorder="0"
                        src={`https://embed.windy.com/embed2.html?lat=${coords.latitude}&lon=${coords.longitude}&zoom=10&level=surface&overlay=wind&product=ecmwf`}
                    ></iframe>

                </div>

                {/* Right */}

                <div className="space-y-6">

                    {/* Sunrise */}

                    <div className="glass-card relative overflow-hidden p-6">

                        <div className="h-2"></div>

                        <h2 className="text-2xl font-bold mb-5">
                            🌅 Sun Information
                        </h2>

                        <div className="h-2"></div>

                        <div className="space-y-4">

                            <div className="flex justify-between">

                                <span className="text-xl flex gap-2 items-center">
                                    <Sunrise size={20} />
                                    Sunrise

                                </span>

                                <span>
                                    {weather
                                        ? new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })
                                        : "--"}
                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span className="text-xl flex gap-2 items-center">
                                    <Sunset size={20} />
                                    Sunset

                                </span>

                                <span>
                                    {weather
                                        ? new Date(weather.sys.sunset * 1000).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })
                                        : "--"}
                                </span>

                            </div>

                        </div>

                    </div>

                    {/* GPS */}

                    <div className="h-5"></div>

                    <div className="glass-card relative overflow-hidden p-6">

                        <div className="h-2"></div>

                        <h2 className="text-2xl font-bold mb-5">
                            📍 Farm Location
                        </h2>

                        <div className="h-2"></div>

                        <div className="space-y-3">

                            <div className="flex gap-3">

                                <MapPin className="text-green-300" />

                                <span>

                                    {location}

                                </span>

                            </div>

                            <p className="text-gray-300">
                                Lat : {coords?.latitude.toFixed(4)}
                            </p>

                            <p className="text-gray-300">
                                Long : {coords?.longitude.toFixed(4)}
                            </p>

                            <div className="h-2"></div>

                        </div>

                    </div>

                    {/* AI Recommendation */}
                    <div className="h-5"></div>

                    <div className="glass-card relative overflow-hidden p-6">

                        <h2 className="text-2xl font-bold mb-4">
                            <div className="h-2"></div>
                            🤖 AI Recommendation
                            <div className="h-2"></div>

                        </h2>

                        <p className="text-green-300 text-lg">

                            ✔ Current Weather: {weather?.weather[0].description || "--"}
                        </p>

                        <div className="h-2"></div>

                        <p className="text-gray-400 mt-3">

                            {weather && (
                                <p className="text-gray-300 text-lg mt-2">

                                    {weather.wind.speed < 8
                                        ? "✅ Wind speed is safe for drone operation."
                                        : "⚠ Wind speed is high. Fly with caution."}

                                    <br /><br />

                                    {weather.main.humidity > 80
                                        ? "⚠ High humidity may increase fungal disease risk."
                                        : "✅ Humidity is within a healthy range."}

                                    <br /><br />

                                    {weather.main.temp > 35
                                        ? "☀ High temperature detected. Avoid flying during peak afternoon."
                                        : "🌿 Temperature is suitable for crop monitoring."}

                                </p>
                            )}
                            <div className="h-2"></div>
                        </p>

                    </div>

                </div>

            </div>

        </div>

    );
}