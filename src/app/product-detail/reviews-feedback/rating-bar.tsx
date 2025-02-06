import React from 'react';
import styles from './Reviews.module.css';
import { RatingBarProps } from './types';
import { TiStarFullOutline } from 'react-icons/ti';

const RatingBar: React.FC<RatingBarProps> = ({ stars, count, total }) => {
  
  const width = (count / total) * 100;
  return (
    <div className={styles.ratingRow}>
      <div className={styles.ratingStars}>
        {/* <img
          loading="lazy"
          src="/productDetail/star.png"
          alt=""
          className={styles.starIcon}
        /> */}
        <TiStarFullOutline color="#FFD700" size={27}/>
        <div>{stars}</div>
      </div>
      <div className={styles.ratingBar}>
        <div 
          className={styles.ratingFill}
          style={{ width: `${total == 0 ? 0 : width}%` }}
        />
      </div>
      <div className={styles.ratingCount}>{count}</div>
    </div>
  );
};

export default RatingBar;