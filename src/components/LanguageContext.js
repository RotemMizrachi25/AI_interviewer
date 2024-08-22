import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export function useLanguage() {
    return useContext(LanguageContext);
}

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en'); // Default language

    const changeLanguage = (lang) => {
        setLanguage(lang);
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
