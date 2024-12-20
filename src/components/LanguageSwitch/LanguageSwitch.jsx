import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './LanguageSwitch.css';

export const LanguageSwitch = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="language-switch">
      <button
        className={`language-btn ${language === 'en' ? 'active' : ''}`}
        onClick={() => setLanguage('en')}
      >
        EN
      </button>
      <button
        className={`language-btn ${language === 'lv' ? 'active' : ''}`}
        onClick={() => setLanguage('lv')}
      >
        LV
      </button>
    </div>
  );
};