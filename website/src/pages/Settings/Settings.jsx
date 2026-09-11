import { User, Trees, Languages } from "lucide-react";
import { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";

export default function Settings() {
    const { language, setLanguage, t } = useContext(LanguageContext); console.log("Current language:", language);
    const [settings, setSettings] = useState({

        username: "",

        password: "",

        mobile: "",

        farmName: "",

        farmArea: "",

        trees: "",

        crop: "Orange",

        language: "English"

    });
    useEffect(() => {

        const saved = localStorage.getItem("agrivisionSettings");

        if (saved) {

            setSettings(JSON.parse(saved));

        }

    }, []);
    const handleChange = (e) => {

        setSettings({

            ...settings,

            [e.target.name]: e.target.value

        });

    };
    const saveSettings = () => {

        localStorage.setItem(

            "agrivisionSettings",

            JSON.stringify(settings)

        );

        alert("✅ Settings Saved Successfully");

    };

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-4xl font-bold">
                    <div className="h-2"></div>
                    ⚙️ {t("settings")}
                </h1>

                <p className="text-lg text-gray-200 mt-2">
                    {t("manageAccount")}
                </p>

            </div>

            {/* Account */}

            <div className="h-2"></div>

            <div className="glass-card p-8">

                <div className="h-2"></div>

                <h2 className="text-2xl font-bold flex items-center gap-3 mb-6">

                    <div className="h-3"></div>

                    <User className="text-green-400" />

                    {t("accountInfo")}

                </h2>

                <div className="h-2"></div>

                <div className="grid md:grid-cols-2 gap-6 text-2xl">

                    <input

                        name="username"

                        value={settings.username}

                        onChange={handleChange}

                        placeholder={t("username")}

                        className="setting-input"

                    />

                    <input

                        name="password"

                        value={settings.password}

                        onChange={handleChange}

                        placeholder={t("password")}

                        className="setting-input"

                    />

                    <input

                        name="mobile"

                        value={settings.mobile}

                        onChange={handleChange}

                        placeholder={t("mobile")}

                        className="setting-input"

                    />

                </div>

                <div className="h-3"></div>

            </div>

            <div className="h-5"></div>

            {/* Farm */}

            <div className="h-2"></div>

            <div className="glass-card p-8">

                <div className="h-2"></div>

                <h2 className="text-2xl font-bold flex items-center gap-3 mb-6">

                    <div className="h-3"></div>

                    <Trees className="text-green-400" />

                    {t("farmInfo")}

                </h2>

                <div className="h-2"></div>

                <div className="grid md:grid-cols-2 gap-6 text-2xl">

                    <input

                        name="farmName"

                        value={settings.farmName}

                        onChange={handleChange}

                        placeholder={t("farmName")}

                        className="setting-input"

                    />

                    <input

                        name="farmArea"

                        value={settings.farmArea}

                        onChange={handleChange}

                        placeholder={t("farmArea")}

                        className="setting-input"

                    />

                    <input

                        name="trees"

                        value={settings.trees}

                        onChange={handleChange}

                        placeholder={t("trees")}

                        className="setting-input"

                    />

                    <input

                        name="crop"

                        value={settings.crop}

                        onChange={handleChange}

                        placeholder={t("crop")}

                        className="setting-input"

                    />

                </div>

                <div className="h-3"></div>

            </div>

            <div className="h-5"></div>

            {/* Language */}

            <div className="glass-card p-8">

                <div className="h-2"></div>

                <h2 className="text-2xl font-bold flex items-center gap-3 mb-6">

                    <div className="h-3"></div>

                    <Languages className="text-green-400" />

                    {t("language")}

                </h2>

                <div className="h-2"></div>

                <div className="text-xl flex gap-4 mt-4">

                    {["English", "Hindi", "Marathi"].map((lang) => (
                        <button
                            key={lang}
                            onClick={() => {
                                setLanguage(lang);

                                setSettings({
                                    ...settings,
                                    language: lang
                                });
                            }}
                            className={
                                language === lang
                                    ? "language-active"
                                    : "language-btn"
                            }
                        >
                            {lang}
                        </button>
                    ))}

                    <div className="flex justify-end mt-8">

                        <button

                            onClick={saveSettings}

                            className="w-50 px-10 py-3 rounded-xl bg-green-800 hover:bg-green-700 transition font-semibold"

                        >

                            💾 {t("save")}

                        </button>

                    </div>

                </div>

                <div className="h-3"></div>

            </div>

            <div className="h-3"></div>

        </div>

    );

}