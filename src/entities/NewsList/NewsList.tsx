import React, { useState } from 'react';
import { useGetLatestNewsQuery } from '../../features/news/newsApi.ts';
import styles from './NewsList.module.scss';
import ParameterSelector from '../../features/ParameterSelector/ParameterSelector.tsx';
import SortBySelector from '../../features/SortBySelector/SortBySelector.tsx';
import DatePeriodSelector from '../../features/DatePeriodSelector/DatePeriodSelector.tsx';
import NewsActions from '../../components/NewsActions.tsx';
import LanguageSelector from '../../features/LanguageSelector/LanguageSelector.tsx';
import useReadState from '../../app/store/useReadState.ts';

import unreadIcon from '../../assets/read-unread-svgrepo-com.svg';
import readIcon from '../../assets/read-svgrepo-com.svg';

interface NewsListProps {
  searchQuery: string;
}

export const NewsList: React.FC<NewsListProps> = ({ searchQuery }) => {
  const [parameter, setParameter] = useState('q');
  const [sortBy, setSortBy] = useState('relevancy');
  const [startDate, setStartDate] = useState('2025-01-01');
  const [endDate, setEndDate] = useState('2025-01-25');
  const [language, setLanguage] = useState('en');

  const { isRead, markAsRead } = useReadState();

  const query = searchQuery.trim() || parameter;

  const { data, error, isLoading } = useGetLatestNewsQuery({
    query,
    sortBy,
    from: startDate,
    to: endDate,
    language,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error Loading news.</div>;

  const validArticles = data?.articles?.filter((article: any) => {
    const fieldsToCheck = [
      article.title,
      article.description,
      article.url,
      article.content,
    ];
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

  const filteredArticles = validArticles?.filter((article: any) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <LanguageSelector onLanguageChange={(newLanguage) => setLanguage(newLanguage)} />
      </div>
      <div className={styles.newsList}>
        {filteredArticles?.map((article: any) => (
          <div key={article.url} className={styles.newsItem}>
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <div className={styles.newsFoot}>
              <span className={styles.readMoreContainer}>
                <a
                  onClick={() => markAsRead(article.url)}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read more
                </a>
                <img
                  src={isRead(article.url) ? readIcon : unreadIcon}
                  className={styles.readIcon}
                  alt={isRead(article.url) ? 'Read' : 'Unread'}
                />
              </span>
              <span>
                <strong className={styles.pubOn}>Published on: </strong>
                {formatDate(article.publishedAt)}
              </span>
              <div>
                <NewsActions
                  article={{
                    url: article.url,
                    title: article.title,
                    description: article.description,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsList;
