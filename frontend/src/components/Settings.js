import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useThemeContext } from "../context/ThemeProvider";
import storage from "local-storage-fallback";
import i18n from "../i18n"
import {useTranslation} from "react-i18next";

const Settings = () => {
    const [selectedLanguage, setSelectedLanguage] = useState(getInitialLanguage);
    const { toggleDarkMode } = useThemeContext();
    const {t} = useTranslation();

    function getInitialLanguage() {
        const language = storage.getItem("language");
        return language || "english";
    }

    const setCurrentLanguage = (language) => {
        setSelectedLanguage(language);
        console.log(language)
        i18n.changeLanguage(language);
    };

    const handleLanguageChange = (event) => {
        const selectedValue = event.target.value;
        setCurrentLanguage(selectedValue);
        saveLanguageToLocalStorage(selectedValue);
    };

    const saveLanguageToLocalStorage = (language) => {
        storage.setItem("language", language);
    };

    useEffect(() => {
        setCurrentLanguage(getInitialLanguage());
    }, []);

    useEffect(() => {
        const currentTheme = storage.getItem("theme");
        if (currentTheme === "dark") {
            document.getElementById("darkModeSwitch").checked = true;
        }
    }, [toggleDarkMode]);

    return (
        <div className="dashboard">
            <div>
                <div className="padding-bottom-12">
                    <span className="settings-title">{t('darkMode')}</span>
                    <FontAwesomeIcon icon={faMoon} className="settings-icon" />
                </div>
                <div className="form-check form-switch" id="dark-mode-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="darkModeSwitch"
                        onChange={toggleDarkMode}
                    />
                </div>
            </div>
            <div className="padding-top-24">
                <div className="padding-bottom-12">
                    <span className="settings-title">{t('language')}</span>
                    <FontAwesomeIcon icon={faLanguage} className="settings-icon" />
                </div>
                <div className="dropdown language-dropdown">
                    <select
                        className="form-select "
                        value={selectedLanguage}
                        onChange={handleLanguageChange}
                    >
                        <option value="en">English</option>
                        <option value="pl">Polski</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Settings;
