import { useEffect, useState } from "react";
import axios from "axios";
import {
    CloudSun,
    Droplets,
    Wind,
    MapPin,
    Thermometer,
} from "lucide-react";

export default function LiveWeather() {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

                // Change this city to your farm location
                const city = "Nagpur";

                const res = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
                );

                setWeather(res.data);
            } catch (err) {
                console.error("Weather Error:", err);
            }
        };

        fetchWeather();
    }, []);

    if (!weather) {
        return (
            <div className="glass-card relative overflow-hidden p-6 bg-[#0d1b2a] rounded-2xl p-6 border border-[#1f3b52]">
                Loading Weather...
            </div>
        );
    }

    return (
        <div className="bg-[#0d1b2a] rounded-2xl p-6 border border-[#1f3b52]">

            <h2 className="text-xl font-bold mb-5">
                🌦 Live Weather
            </h2>

            <div className="space-y-4">

                <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                        <MapPin size={18} />
                        Location
                    </span>

                    <span>{weather.name}</span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                        <Thermometer size={18} />
                        Temperature
                    </span>

                    <span>{weather.main.temp} °C</span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                        <Droplets size={18} />
                        Humidity
                    </span>

                    <span>{weather.main.humidity}%</span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                        <Wind size={18} />
                        Wind
                    </span>

                    <span>{weather.wind.speed} m/s</span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                        <CloudSun size={18} />
                        Condition
                    </span>

                    <span>{weather.weather[0].main}</span>
                </div>

            </div>

        </div>
    );
}