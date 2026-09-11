import CameraFeed from "../../components/AIDetection/CameraFeed";
import UploadImage from "../../components/AIDetection/UploadImage";
import PredictionCard from "../../components/AIDetection/PredictionCard";
import ConfidenceMeter from "../../components/AIDetection/ConfidenceMeter";
import SeverityCard from "../../components/AIDetection/SeverityCard";
import TreatmentCard from "../../components/AIDetection/TreatmentCard";
import DetectionHistory from "../../components/AIDetection/DetectionHistory";

export default function Detection() {
    return (
        <div className="space-y-8">

            {/* Title */}
            <div>
                <h1 className="text-4xl font-bold">
                    <div className="h-2"></div>
                    🤖 AI Disease Detection
                </h1>
                <p className="text-gray-300 text-xl mt-2">
                    <div className="h-2"></div>
                    Detect crop diseases using AI and ESP32-CAM
                    <div className="h-2"></div>
                </p>
            </div>

            {/* AI Prediction */}
            <div className="grid lg:grid-cols-2 gap-6">
                <UploadImage />
                <PredictionCard />
            </div>

            <div className="h-8"></div>

            <div className="grid lg:grid-cols-2 gap-6">
                <ConfidenceMeter />
                <SeverityCard />
            </div>

            <div className="h-8"></div>

            <div className="grid lg:grid-cols-2 gap-6">
                <TreatmentCard />
                <DetectionHistory />
            </div>

        </div>
    );
}