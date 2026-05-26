import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('portfolio_lang') || 'FR';
  });

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const next = prev === 'FR' ? 'EN' : 'FR';
      localStorage.setItem('portfolio_lang', next);
      return next;
    });
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
