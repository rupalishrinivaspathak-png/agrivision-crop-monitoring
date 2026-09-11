import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./styles/theme.css";

import { AIProvider } from "./context/AIProvider";
import { LanguageProvider } from "./context/LanguageContext";

ReactDOM.createRoot(document.getElementById("root")).render(

  <React.StrictMode>

    <LanguageProvider>

      <AIProvider>

        <App />

      </AIProvider>

    </LanguageProvider>

  </React.StrictMode>

);