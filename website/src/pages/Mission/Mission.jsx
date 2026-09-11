import CameraFeed from "../../components/Mission/CameraFeed";
import SmartFarmGrid from "../../components/Mission/SmartFarmGrid";

export default function Mission() {
    return (
        <div className="space-y-6">

            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold">
                    <div className="h-3"></div>
                    🚁 Live Field View
                    <div className="h-1"></div>
                </h1>

                <p className="text-gray-400 mt-2">
                    Orange Orchard Monitoring
                    <div className="h-2"></div>
                </p>
            </div>

            {/* Professional Layout */}
            <div className="grid grid-cols-12 gap-6">

                {/* CENTER PANEL */}
                <div className="col-span-6 space-y-6">

                    <SmartFarmGrid />

                    <div className="h-8"></div>

                </div>

                <div className="col-span-6 space-y-6">

                    <CameraFeed />

                    <div className="h-8"></div>

                </div>

            </div>

        </div>
    );
}