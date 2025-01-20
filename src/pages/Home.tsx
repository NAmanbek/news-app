import React from 'react';
import NewsList from '../entities/NewsList/NewsList';
import styles from './Home.module.scss'

const Home: React.FC = () => {
  return (
    <div className={styles.homeTitle}>
      <h1>Latest News</h1>
      <NewsList />
    </div>
  )
};

export default Home;
