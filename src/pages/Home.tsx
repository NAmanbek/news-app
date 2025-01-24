import React, { useState, useEffect } from 'react';
import NewsList from '../entities/NewsList/NewsList';
import Header from '../components/Header.tsx';
import styles from './Home.module.scss'
import SearchMin from '../components/SearchMin.tsx';
import stylesSM from '../components/SearchMin.module.scss'

const Home: React.FC = () => {

  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  

  const toggleSearch = () => {
    setSearchVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth >= 580) {
        setSearchVisible(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={styles.home}>
      <Header 
        toggleSearch={toggleSearch} 
        searchVisible={searchVisible}
        onSearch={setSearchQuery} 
      />
      <SearchMin
        className={`${styles.searchHidCont} ${searchVisible ? stylesSM.visible : stylesSM.hidden}`}
        searchQuery={searchInput} 
        onSearchChange={setSearchInput} 
        onSearchSubmit={setSearchQuery}
      />
      <NewsList searchQuery={searchQuery} />
    </div>
  )
};

export default Home;
