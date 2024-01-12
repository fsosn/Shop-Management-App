import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLanguage, faMoon} from "@fortawesome/free-solid-svg-icons";
import {useThemeContext} from "../context/ThemeProvider";
import storage from "local-storage-fallback";

const Settings = () => {
    const [selectedLanguage, setSelectedLanguage] = useState("english");
    const {toggleDarkMode} = useThemeContext();
    const handleLanguageChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedLanguage(selectedValue);
    };

    useEffect(() => {
        const currentTheme = storage.getItem('theme');
        if (currentTheme === 'dark') {
            document.getElementById('darkModeSwitch').checked = 'checked';
        }
    }, [toggleDarkMode]);

    return (
        <div className="dashboard">
            <div>
                <div className="padding-bottom-12">
                    <span className="settings-title">Dark mode</span>
                    <FontAwesomeIcon icon={faMoon} className="settings-icon"/>
                </div>
                <div className="form-check form-switch" id="dark-mode-switch">
                    <input className="form-check-input"
                           type="checkbox"
                           role="switch"
                           id="darkModeSwitch"
                           onChange={toggleDarkMode}
                    />
                </div>
            </div>
            <div className="padding-top-24">
                <div className="padding-bottom-12">
                    <span className="settings-title">Language</span>
                    <FontAwesomeIcon icon={faLanguage} className="settings-icon"/>
                </div>
                <div className="dropdown language-dropdown">
                    <select className="form-select " value={selectedLanguage} onChange={handleLanguageChange}>
                        <option value="english">English</option>
                        <option value="polish">Polish</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Settings;
