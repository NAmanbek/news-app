import React from 'react'
import { useGetLatestNewsQuery } from '../../features/news/newsApi.ts'
import styles from './NewsList.module.scss'

export const NewsList: React.FC = () => {

  const { data, error, isLoading } = useGetLatestNewsQuery();

  if(isLoading) return <div>Loading...</div>;
  if(error) return <div>Error Loading news.</div>;

  return (
    <div className={styles.newsList}>
      {data?.articles?.map((article: any, index: number) => (
        <div key={index} className={styles.newsItem}>
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            Read more
          </a>
        </div>
      ))}
    </div>
  );
};

export default NewsList