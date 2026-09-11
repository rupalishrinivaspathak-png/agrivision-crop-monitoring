import { Camera, Wifi } from "lucide-react";
import { useContext } from "react";
import { AIContext } from "../../context/AIContext";

export default function CameraFeed() {
    const { espImageUrl } = useContext(AIContext);
    console.log("espImageUrl:", espImageUrl);
    return (
        <div className="glass-card relative overflow-hidden p-6 text-white">
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Camera className="text-green-400" />
                    Live ESP32-CAM
                </h2>
                <span className="text-green-400 font-semibold animate-pulse">
                    ● LIVE
                </span>
            </div>
            <div className="relative">
                {espImageUrl ? (
                    <img
                        src={espImageUrl}
                        alt="ESP32 Camera"
                        className="w-full h-[350px] rounded-xl object-cover"
                    />
                ) : (
                    <div className="w-full h-[350px] rounded-xl bg-[#13283d] 
                        border-2 border-dashed border-[#35536d] 
                        flex flex-col items-center justify-center gap-3">
                        <span className="text-4xl">🍊</span>
                        <span className="text-gray-400 text-sm">
                            Waiting for ESP32-CAM...
                        </span>
                    </div>
                )}
                <div className="absolute top-4 left-4 bg-black/70 px-3 py-1 rounded-lg text-sm">
                    640 × 480
                </div>
                <div className="absolute top-4 right-4 bg-green-600 px-3 py-1 rounded-lg text-sm">
                    {espImageUrl ? "LIVE" : "WAITING"}
                </div>
                <div className="absolute bottom-4 left-4 bg-black/70 px-3 py-2 
                    rounded-lg flex items-center gap-2 text-sm">
                    <Wifi size={16} />
                    {espImageUrl ? "ESP32 Connected" : "Not connected"}
                </div>
            </div>
        </div>
    );
}