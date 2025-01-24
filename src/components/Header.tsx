import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import assets from '../../src/assets/assets';

interface HeaderProps {
  toggleSearch: () => void;
  searchVisible: boolean;
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSearch, searchVisible, onSearch }) => {

  const [searchQuery, setSearchQuery] = useState('');

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
      <Link to='/' className={styles.logo}>
        <img src={assets.header_logo} className={styles.iconLogo} />
        <span className={styles.appName}>Latest News</span>
      </Link>
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
            <button className={styles.iconButton} aria-label="Profile">
              <img src={assets.profile_icon} className={styles.iconImage} alt="Profile Icon" />
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
