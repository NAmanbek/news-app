import React from 'react';
import styles from './Header.module.scss';
import assets from '../../src/assets/assets';

const Header: React.FC = () => {

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={assets.header_logo} className={styles.iconLogo} />
        <span className={styles.appName}>Latest News</span>
      </div>
      <div className={styles.icons}>
        <div>
          <input className={styles.inputHeader} type="search" placeholder='Search...' />
          <button className={styles.iconButton} aria-label="Search">
            <img src={assets.search_icon} className={styles.iconImage} />
          </button>
        </div>
        <div className={styles.profileContainer}>
          <button className={styles.iconButton} aria-label="Profile">
            <img src={assets.profile_icon} className={styles.iconImage} />
          </button>
          <div className={styles.profileDropDown}>
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
