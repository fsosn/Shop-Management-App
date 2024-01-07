import React, { createContext, useContext, useState, useEffect } from 'react';
import storage from 'local-storage-fallback';

const ThemeContext = createContext(undefined);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(getInitialTheme);

    function getInitialTheme() {
        const theme = storage.getItem('theme');
        return theme || 'light';
    }

    const setCurrentTheme = () => {
        const storedTheme = storage.getItem('theme');
        document.documentElement.setAttribute('data-bs-theme', storedTheme || 'light');
    };

    const toggleDarkMode = () => {
        const newTheme = !theme;
        setTheme(newTheme);
        document.documentElement.setAttribute('data-bs-theme', newTheme ? 'dark' : 'light');
        storage.setItem('theme', newTheme ? 'dark' : 'light');
    };

    useEffect(() => {
        setCurrentTheme();
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, setCurrentTheme, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => {
    return useContext(ThemeContext);
};
