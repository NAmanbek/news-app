import React, { useState } from 'react'
import styles from './NewsActions.module.scss'
import assets from '../assets/assets';

type NewsActionProps = {
  articleId: string;
};

const NewsActions: React.FC<NewsActionProps> = ({ articleId }) => {
  const [liked, setLiked] = useState(false);
  const [readLater, setReadLater] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleReadLater = () => {
    setReadLater(!readLater);
  };

  const handleShare = () => {
    alert(`Share this article: ${articleId}`);
  };

  return (
    <div className={styles.container}>
      <button
        onClick={handleLike}
        className={`${styles.iconButton} ${liked ? styles.liked : ''}`}
        aria-label="Like"
      >
        <img src={liked ? assets.liked_icon : assets.like_icon} className={styles.iconImage} alt="Like" />
      </button>
      <button onClick={handleShare} className={styles.iconButton} aria-label="Share">
        <img src={assets.share_icon} className={styles.iconImage} alt="Share" />
      </button>
      <button
        onClick={handleReadLater}
        className={`${styles.iconButton} ${readLater ? styles.saved : ''}`}
        aria-label="Save"
      >
        <img src={readLater ? assets.saved_icon : assets.save_icon} className={styles.iconImage} alt="Save" />
      </button>
    </div>
  );
};

export default NewsActions;