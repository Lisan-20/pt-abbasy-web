import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center gap-2 text-sm font-semibold ml-4 bg-[rgba(255,255,255,0.1)] px-3 py-1 rounded-full backdrop-blur-sm border border-[rgba(255,255,255,0.2)]">
      <button
        onClick={() => changeLanguage('id')}
        className={`px-2 py-1 rounded-full transition-colors ${
          i18n.language === 'id'
            ? 'bg-accent text-white'
            : 'text-gray-300 hover:text-white'
        }`}
      >
        ID
      </button>
      <span className="text-gray-400">|</span>
      <button
        onClick={() => changeLanguage('en')}
        className={`px-2 py-1 rounded-full transition-colors ${
          i18n.language === 'en'
            ? 'bg-accent text-white'
            : 'text-gray-300 hover:text-white'
        }`}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
