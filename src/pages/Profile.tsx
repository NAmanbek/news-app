import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, clearLikedArticles, clearReadLaterArticles, toggleLikeArticle, toggleReadLaterArticle } from '../app/store/store';
import styles from './Profile.module.scss';
import Header from '../components/Header';
import assets from '../assets/assets';
import { useNewsFilters } from '../entities/NewsList/useNewsFilters';

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const [activeSection, setActiveSection] = useState<'liked' | 'readLater'>('liked');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);

  const {
    setLanguage,
  } = useNewsFilters();

  const likedArticles = useSelector((state: RootState) => state.articles.likedArticles);
  const readLaterArticles = useSelector((state: RootState) => state.articles.readLaterArticles);

  const toggleSearch = () => {
    setSearchVisible((prev) => !prev);
  };

  const handleRemoveLikedArticle = (article: { url: string; title: string; description: string }) => {
    dispatch(toggleLikeArticle(article));
  };

  const handleRemoveReadLaterArticle = (article: { url: string; title: string; description: string }) => {
    dispatch(toggleReadLaterArticle(article));
  };

  const renderArticles = (
    articles: { url: string; title: string; description: string }[],
    onRemove: (article: { url: string; title: string; description: string }) => void
  ) => {
    const filteredArticles = articles.filter((article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredArticles.length === 0) {
      return <p className={styles.noMatch}>No articles</p>;
    }

    return (
      <div className={styles.container}>
        <div className={styles.newsList}>
          {filteredArticles.map((article) => (
            <div key={article.url} className={styles.newsItem}>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <div className={styles.readMoreContainer}>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className={styles.readMore}>
                  Read more
                </a>
                <button
                  onClick={() => onRemove(article)}
                  className={styles.removeButton}
                >
                  <img src={assets.remove_icon} alt="" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.profile}>
      <Header
        toggleSearch={toggleSearch}
        searchVisible={searchVisible}
        onSearch={setSearchQuery}
        onLanguageChange={setLanguage}
      />

      {/* Section toggle buttons */}
      <div className={styles.toggleButtons}>
        <button
          onClick={() => setActiveSection('liked')}
          className={`${styles.toggleButton} ${activeSection === 'liked' ? styles.active : ''}`}
        >
          Liked Articles
        </button>
        <button
          onClick={() => setActiveSection('readLater')}
          className={`${styles.toggleButton} ${activeSection === 'readLater' ? styles.active : ''}`}
        >
          Read Later Articles
        </button>
      </div>

      {activeSection === 'liked' && (
        <div className={styles.section}>
          <div className={styles.sectionName}>
            <h2>Liked Articles</h2>
            <button onClick={() => dispatch(clearLikedArticles())} className={styles.clearButton}>
              Clear All
            </button>
          </div>
          {renderArticles(likedArticles, handleRemoveLikedArticle)}
        </div>
      )}

      {activeSection === 'readLater' && (
        <div className={styles.section}>
          <div className={styles.sectionName}>
            <h2>Read Later Articles</h2>
            <button onClick={() => dispatch(clearReadLaterArticles())} className={styles.clearButton}>
              Clear All
            </button>
          </div>
          {renderArticles(readLaterArticles, handleRemoveReadLaterArticle)}
        </div>
      )}
    </div>
  );
};

export default Profile;
