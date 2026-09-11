import { createContext, useState, useEffect } from "react";

export const LanguageContext = createContext();

const translations = {
    English: {
        settings: "Settings",
        manageAccount: "Manage your AgriVision account",
        account: "Account Information",
        username: "Username",
        password: "Password",
        mobile: "Mobile Number",
        farm: "Farm Information",
        farmName: "Farm Name",
        farmArea: "Farm Area",
        trees: "Number of Trees",
        crop: "Crop Type",
        language: "Language",
        save: "Save Settings",
    },

    Hindi: {
        settings: "सेटिंग्स",
        manageAccount: "अपने AgriVision खाते को प्रबंधित करें",
        account: "खाता जानकारी",
        username: "उपयोगकर्ता नाम",
        password: "पासवर्ड",
        mobile: "मोबाइल नंबर",
        farm: "खेत की जानकारी",
        farmName: "खेत का नाम",
        farmArea: "खेत का क्षेत्रफल",
        trees: "पेड़ों की संख्या",
        crop: "फसल का प्रकार",
        language: "भाषा",
        save: "सेटिंग्स सेव करें",
    },

    Marathi: {
        settings: "सेटिंग्ज",
        manageAccount: "तुमचे AgriVision खाते व्यवस्थापित करा",
        account: "खात्याची माहिती",
        username: "वापरकर्तानाव",
        password: "पासवर्ड",
        mobile: "मोबाईल नंबर",
        farm: "शेताची माहिती",
        farmName: "शेताचे नाव",
        farmArea: "शेताचे क्षेत्रफळ",
        trees: "झाडांची संख्या",
        crop: "पिकाचा प्रकार",
        language: "भाषा",
        save: "सेटिंग्ज सेव्ह करा",
    },
};

export function LanguageProvider({ children }) {

    const [language, setLanguage] = useState("English");

    useEffect(() => {
        const saved = localStorage.getItem("agrivisionSettings");

        if (saved) {
            const settings = JSON.parse(saved);

            if (settings.language) {
                setLanguage(settings.language);
            }
        }
    }, []);

    const t = (key) => {
        return translations[language]?.[key] || translations.English[key] || key;
    };

    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage,
                t
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}