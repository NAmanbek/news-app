import React, { useState } from 'react'
import { useGetLatestNewsQuery } from '../../features/news/newsApi.ts'
import styles from './NewsList.module.scss'
import ParameterSelector from '../../features/ParameterSelector/ParameterSelector.tsx';
import SortBySelector from '../../features/SortBySelector/SortBySelector.tsx';
import DatePeriodSelector from '../../features/DatePeriodSelector/DatePeriodSelector.tsx';

export const NewsList: React.FC = () => {

  const [parameter, setParameter] = useState('technology');
  const [sortBy, setSortBy] = useState('relevancy');
  const [startDate, setStartDate] = useState('2025-01-01');
  const [endDate, setEndDate] = useState('2025-01-19');

  const { data, error, isLoading } = useGetLatestNewsQuery({
    query: parameter,
    sortBy,
    from: startDate,
    to: endDate,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error Loading news.</div>;

  const validArticles = data?.articles?.filter((article: any) => {
    const fieldsToCheck = [article.title, article.description, article.url, article.content];
    const isRemoved = fieldsToCheck.some((field) => field === '[Removed]');
    return (
      !isRemoved &&
      article.title &&
      article.description &&
      article.url &&
      article.url.trim() !== '' &&
      article.content
    );
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <ParameterSelector selectedParameter={parameter} onParameterChange={setParameter} />
        <SortBySelector selectedSortBy={sortBy} onSortByChange={setSortBy} />
        <DatePeriodSelector
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
      </div>
      <div className={styles.newsList}>
        {validArticles?.map((article: any, index: number) => (
          <div key={index} className={styles.newsItem}>
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <p>
              <strong>Published on: </strong>
              {formatDate(article.publishedAt)}
            </p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsList;