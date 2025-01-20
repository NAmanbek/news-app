import React from 'react';
import NewsList from '../entities/NewsList/NewsList';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Latest News</h1>
      <NewsList />
    </div>
  )
};

export default Home;
