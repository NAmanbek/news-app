import React, { useEffect, useRef, useState } from 'react';
import styles from './NewsActions.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, toggleLikeArticle, toggleReadLaterArticle } from '../app/store/store';
import Tooltip from './Tooltip';

type NewsActionProps = {
  article: {
    url: string;
    title: string;
    description: string;
  };
};

const NewsActions: React.FC<NewsActionProps> = ({ article }) => {
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const likedArticles = useSelector((state: RootState) => state.articles.likedArticles);
  const readLaterArticles = useSelector((state: RootState) => state.articles.readLaterArticles);

  const isLiked = likedArticles.some((a) => a.url === article.url);
  const isReadLater = readLaterArticles.some((a) => a.url === article.url);

  const handleLike = () => {
    dispatch(toggleLikeArticle(article));
  };

  const handleReadLater = () => {
    dispatch(toggleReadLaterArticle(article));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleShareOption = (platform: 'whatsapp' | 'telegram' | 'copy' | 'facebook' | 'twitter' | 'linkedin') => {
    const shareUrl = article.url;
    const message = encodeURIComponent(`${article.title}\n${shareUrl}`);

    switch (platform) {
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank');
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${message}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(article.title)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl).then(() => alert('Link copied to clipboard!'));
        break;
    }
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container}>

      <button
        onClick={handleLike}
        className={`${styles.iconButton} ${isLiked ? styles.liked : ''}`}
        aria-label="Like"
      >
        <i className={isLiked ? 'fas fa-heart' : 'far fa-heart'}></i>
      </button>

      <div className={styles.shareContainer} ref={dropdownRef}>
        <Tooltip text={'share'}>
          <button
            className={styles.iconButton}
            aria-label="Share"
            onClick={toggleDropdown}
          >
            <i className="fas fa-share-alt"></i>
          </button>
        </Tooltip>

        {isDropdownOpen && (
          <div className={styles.shareDropdown}>
            <Tooltip text={'whatsapp'}>
              <button
                onClick={() => handleShareOption('whatsapp')}
                className={styles.shareOption}
              >
                <i className="fab fa-whatsapp"></i>
              </button>
            </Tooltip>
            <Tooltip text={'telegram'}>
              <button
                onClick={() => handleShareOption('telegram')}
                className={styles.shareOption}
              >
                <i className="fab fa-telegram-plane"></i>
              </button>
            </Tooltip>
            <Tooltip text={'facebook'}>
              <button
                onClick={() => handleShareOption('facebook')}
                className={styles.shareOption}
              >
                <i className="fab fa-facebook"></i>
              </button>
            </Tooltip>
            <Tooltip text={'twitter'}>
              <button
                onClick={() => handleShareOption('twitter')}
                className={styles.shareOption}
              >
                <i className="fab fa-twitter"></i>
              </button>
            </Tooltip>
            <Tooltip text={'linkedin'}>
              <button
                onClick={() => handleShareOption('linkedin')}
                className={styles.shareOption}
              >
                <i className="fab fa-linkedin"></i>
              </button>
            </Tooltip>
            <Tooltip text={'copy link'}>
              <button
                onClick={() => handleShareOption('copy')}
                className={styles.shareOption}
              >
                <i className="fas fa-copy"></i>
              </button>
            </Tooltip>
          </div>
        )}
      </div>

      <Tooltip text={isReadLater ? "saved" : "save"}>
        <button
          onClick={handleReadLater}
          className={`${styles.iconButton} ${isReadLater ? styles.saved : ''}`}
          aria-label="Save"
        >
          <i className={isReadLater ? 'fas fa-bookmark' : 'far fa-bookmark'}></i>
        </button>
      </Tooltip>


    </div>
  );
};

export default NewsActions;
