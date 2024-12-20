import { useLanguage } from '../contexts/LanguageContext';
import { en } from '../translations/en';
import { lv } from '../translations/lv';

const translations = {
  en,
  lv,
};

export const useTranslation = () => {
  const { language } = useLanguage();
  return translations[language];
};