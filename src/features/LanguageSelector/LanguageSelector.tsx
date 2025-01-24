import React, { useEffect, useState } from 'react';
import styles from './LanguageSelector.module.scss';
import 'flag-icons/css/flag-icons.min.css';
import Tooltip from '../../components/Tooltip';

interface LanguageSelectorProps {
  onLanguageChange: (language: string) => void;
  className?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onLanguageChange, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('gb');

  const languages = [
    { code: 'gb', name: 'English', apiCode: 'en' },
    { code: 'de', name: 'German', apiCode: 'de' },
    { code: 'it', name: 'Italian', apiCode: 'it' },
    { code: 'fr', name: 'French', apiCode: 'fr' },
    { code: 'es', name: 'Spanish', apiCode: 'es' },
    { code: 'ru', name: 'Russian', apiCode: 'ru' },
  ];

  useEffect(() => {
    const storedLanguage = localStorage.getItem('selectedLanguage');
    if (storedLanguage) {
      setSelectedLanguage(storedLanguage);
      const apiCode = languages.find((lang) => lang.code === storedLanguage)?.apiCode || 'en';
      onLanguageChange(apiCode);
    }
  }, [onLanguageChange, languages]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleLanguageSelect = (code: string, apiCode: string) => {
    setSelectedLanguage(code);
    onLanguageChange(apiCode);
    setIsOpen(false);

    localStorage.setItem('selectedLanguage', code);
  };

  return (
    <div className={`${styles.languageContainer} ${className}`}>

      <Tooltip text={'language'}>
        <button className={styles.languageButton} onClick={toggleDropdown}>
          <span className={`fi fi-${selectedLanguage}`}></span>
        </button>
      </Tooltip>

      {isOpen && (
        <div className={styles.languageDropdown}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={styles.languageOption}
              onClick={() => handleLanguageSelect(lang.code, lang.apiCode)}
            >
              <span className={`fi fi-${lang.code}`}></span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
