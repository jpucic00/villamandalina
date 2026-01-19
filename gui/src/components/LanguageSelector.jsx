import React from "react";
import { useTranslation } from "react-i18next";
import "../assets/style/languageSelector.css";

export default function LanguageSelector({ className = "" }) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.substring(0, 2) || "en";

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={`languageSelector ${className}`}>
      <button
        className={`langButton ${currentLang === "en" ? "active" : ""}`}
        onClick={() => changeLanguage("en")}
      >
        EN
      </button>
      <span className="langDivider">|</span>
      <button
        className={`langButton ${currentLang === "hr" ? "active" : ""}`}
        onClick={() => changeLanguage("hr")}
      >
        HR
      </button>
    </div>
  );
}
