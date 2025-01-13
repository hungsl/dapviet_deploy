import React from 'react';
import { BrandDescriptionProps } from '../types';
import styles from './DapViet.module.css';

export const BrandDescription: React.FC<BrandDescriptionProps> = ({
  title,
  subtitle,
  description1,
  description2
}) => (
  <div className={styles.brandContent}>
    <div className={styles.brandHeader}>
      <div className={styles.brandTitle}>{title}</div>
      <div className={styles.brandSubtitle}>{subtitle}</div>
    </div>
    <div className={styles.brandDivider}></div> 
    <div className={styles.brandDescription}>
      <div className={styles.descriptionText}>{description1}</div>
      <div className={styles.descriptionText}>{description2}</div>
    </div>
  </div>
);