import React from 'react';
import styles from './Reviews.module.css';
import { RatingBarProps } from './types';

const RatingBar: React.FC<RatingBarProps> = ({ stars, count, total }) => {
  const width = (count / total) * 100;
  
  return (
    <div className={styles.ratingRow}>
      <div className={styles.ratingStars}>
        <img
          loading="lazy"
          src="/productDetail/star.png"
          alt=""
          className={styles.starIcon}
        />
        <div>{stars}</div>
      </div>
      <div className={styles.ratingBar}>
        <div 
          className={styles.ratingFill}
          style={{ width: `${width}%` }}
        />
      </div>
      <div className={styles.ratingCount}>{count}</div>
    </div>
  );
};

export default RatingBar;