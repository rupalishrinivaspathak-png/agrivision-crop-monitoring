import { Camera, Wifi, Video } from "lucide-react";
import { useAgriVision } from "../../hooks/useAgriVision";

export default function CameraFeed() {
    const { imageUrl } = useAgriVision();
    return (
        <div className="glass-card relative overflow-hidden p-6 bg-[#0d1b2a] border border-[#1f3b52] rounded-2xl p-5">

            <div className="h-2"></div>

            <div className="flex justify-between items-center mb-5">

                <h2 className="text-4xl font-bold">
                    📷 Live Camera Feed
                    <div className="h-2"></div>
                </h2>

                <div className="flex items-center gap-2 text-2xl text-green-400">

                    <Wifi size={20} />

                    LIVE

                </div>

            </div>

            <div className="glass-card relative overflow-hidden p-6 relative h-[420px] rounded-xl overflow-hidden bg-black">

                <img
                    src={imageUrl || "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1200"}
                    alt="Farm"
                    className="w-full h-full object-cover"
                />

                {/* Recording */}
                <div className="absolute top-4 left-4 bg-red-600 px-3 py-1 rounded-full flex items-center gap-2">

                    <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>

                    REC

                </div>

                {/* AI Detecting */}
                <div className="absolute bottom-4 left-4 bg-black/70 px-4 py-2 rounded-xl text-lg">

                    🌳 AI Scanning Orange Orchard...

                </div>

                {/* Camera Icon */}
                <div className="absolute top-4 right-4 bg-black/60 p-3 rounded-full">

                    <Camera />

                </div>

                {/* Video Icon */}
                <div className="absolute bottom-4 right-4 bg-black/60 p-3 rounded-full">

                    <Video />

                </div>

            </div>

        </div>
    );
}