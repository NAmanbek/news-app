import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import assets from '../../src/assets/assets';
import Tooltip from './Tooltip';
import LanguageSelector from '../features/LanguageSelector/LanguageSelector';
import stylesLC from '../features/LanguageSelector/LanguageSelector.module.scss'

interface HeaderProps {
  toggleSearch: () => void;
  searchVisible: boolean;
  onSearch: (query: string) => void;
  onLanguageChange: (language: string) => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSearch, searchVisible, onSearch,onLanguageChange }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearchSubmit = () => {
    if (searchQuery.trim() !== '') {
      onSearch(searchQuery);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <img src={assets.header_logo} className={styles.iconLogo} />
        <span className={styles.appName}>Latest News</span>
      </Link>
      <LanguageSelector
        onLanguageChange={onLanguageChange}
        className={`${stylesLC.hidden} ${stylesLC.showBelow580}`}
      />

      <div className={styles.icons}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className={styles.inputHeader}
          />
          <button
            className={styles.iconButton}
            aria-label="Search"
            onClick={() => {
              const windowWidth = window.innerWidth;
              if (windowWidth < 580) {
                toggleSearch();
              } else {
                handleSearchSubmit();
              }
            }}
          >
            <img
              src={searchVisible ? assets.arrow_up_icon : assets.search_icon}
              className={styles.iconImage}
              alt="Search Icon"
            />
          </button>
        </div>
        <div className={styles.profileContainer}>
          <Link to="/profile" className={styles.profileButton}>
            <Tooltip text={'profile'}>
              <button className={styles.iconButton} aria-label="Profile">
                <img src={assets.profile_icon} className={styles.iconImage} alt="Profile Icon" />
              </button>
            </Tooltip>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
