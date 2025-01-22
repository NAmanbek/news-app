import React from 'react';
import NewsList from '../entities/NewsList/NewsList';
import Header from '../components/Header.tsx';
import styles from './Home.module.scss'

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <Header />
      <NewsList />
    </div>
  )
};

export default Home;
