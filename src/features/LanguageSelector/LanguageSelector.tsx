import React, { useState } from 'react';
import styles from './LanguageSelector.module.scss';
import 'flag-icons/css/flag-icons.min.css';

interface LanguageSelectorProps {
  onLanguageChange: (language: string) => void; // Callback to notify parent of language change
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('gb'); // Default to English (UK)

  const languages = [
    { code: 'gb', name: 'English', apiCode: 'en' },
    { code: 'de', name: 'German', apiCode: 'de' },
    { code: 'it', name: 'Italian', apiCode: 'it' },
    { code: 'fr', name: 'French', apiCode: 'fr' },
    { code: 'es', name: 'Spanish', apiCode: 'es' },
    { code: 'ru', name: 'Russian', apiCode: 'ru' },
  ];

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleLanguageSelect = (code: string, apiCode: string) => {
    setSelectedLanguage(code);
    onLanguageChange(apiCode); // Notify parent component of the new language
    setIsOpen(false); // Close the dropdown
  };

  return (
    <div className={styles.languageContainer}>
      {/* Selected language */}
      <button className={styles.languageButton} onClick={toggleDropdown}>
        <span className={`fi fi-${selectedLanguage}`}></span>
      </button>

      {/* Dropdown menu */}
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
