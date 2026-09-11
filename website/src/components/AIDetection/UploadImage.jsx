import { useState, useContext } from "react";
import { AIContext } from "../../context/AIContext";
import { uploadImage } from "../../services/api";
import { Upload, ImagePlus, Trash2 } from "lucide-react";

export default function UploadImage() {

    const [image, setImage] = useState(null);

    const [selectedFile, setSelectedFile] = useState(null);

    const [loading, setLoading] = useState(false);

    const {

        setPrediction,

        history,

        setHistory

    } = useContext(AIContext);

    const handleImage = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setSelectedFile(file);

        setImage(URL.createObjectURL(file));

    };

    const handleAnalyze = async () => {

        if (!selectedFile) {

            alert("Please select an image first.");

            return;

        }

        try {

            setLoading(true);

            const result = await uploadImage(selectedFile);

            setPrediction(result);

            alert("✅ AI Analysis Completed");

        }

        catch (err) {

            console.error(err);

            alert("❌ Unable to connect to Flask server.");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="glass-card relative overflow-hidden p-6">

            <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">

                <ImagePlus className="text-green-400" />

                Upload Crop Image

            </h2>

            {/* Preview */}

            <div className="h-[320px] rounded-xl border-2 border-dashed border-[#35536d] flex items-center justify-center overflow-hidden h-[220px] glass-card relative overflow-hidden p-6">

                {image ? (

                    <img
                        src={image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                    />

                ) : (

                    <div className="text-center">

                        <Upload
                            size={55}
                            className="mx-auto text-green-400 mb-4"
                        />

                        <p className="text-white">

                            Upload Image

                        </p>

                    </div>

                )}

            </div>

            {/* Buttons */}

            <div className="flex gap-4 mt-5">

                <label className="flex-1">

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImage}
                        hidden
                    />
                    <div className="h-3"></div>
                    <div className="cursor-pointer text-center bg-green-600 hover:bg-green-500 rounded-xl py-3 font-semibold transition">

                        👆🏼 Select Image

                    </div>
                    <div className="h-3"></div>

                </label>

                <button
                    onClick={() => setImage(null)}
                    className="px-5 bg-red-600 hover:bg-red-600 rounded-xl transition"
                >
                    <Trash2 />

                </button>

            </div>

            <button
                onClick={handleAnalyze}
                disabled={loading}
                className="w-full mt-5 bg-blue-600 hover:bg-blue-500 rounded-xl py-3 font-semibold transition disabled:bg-gray-500"
            >

                {loading ? "Analyzing..." : "🤖 Analyze Image"}

            </button>
            <div className="h-3"></div>

        </div>

    );

}