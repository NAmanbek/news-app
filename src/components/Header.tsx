import React, { useState } from 'react';
import styles from './Header.module.scss';
import assets from '../../src/assets/assets';

interface HeaderProps {
  toggleSearch: () => void;
  searchVisible: boolean;
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSearch, searchVisible, onSearch }) => {

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toogleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim() !== '') {
      onSearch(searchQuery); // Trigger search
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchSubmit(); // Trigger search on Enter
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={assets.header_logo} className={styles.iconLogo} />
        <span className={styles.appName}>Latest News</span>
      </div>
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
            className={styles.iconButton} aria-label="Search"
            onClick={() => { const windowWidth = window.innerWidth;
              if (windowWidth < 580) {
                toggleSearch(); // Below 580px, toggle SearchMin visibility
              } else {
                handleSearchSubmit(); // Above 580px, trigger a search
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
          <button
            className={styles.iconButton} aria-label="Profile"
            onClick={toogleDropdown}
          >
            <img src={assets.profile_icon} className={styles.iconImage} />
          </button>
          <div className={`${styles.profileDropDown} ${
              dropdownVisible ? styles.show : ''
            }`}>
            <ul>
              <li>Liked Articles</li>
              <li>Read Later</li>
              <li>History</li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
