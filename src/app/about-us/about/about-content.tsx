import React from 'react';
import styles from './About.module.css';
import { AboutContentProps } from '../types';

export const AboutContent: React.FC<AboutContentProps> = ({ title, description }) => {
  return (
    <div className={styles.contentBlock}>
      <h2 className={styles.contentTitle}>{title}</h2>
      <p className={styles.contentDescription}>{description}</p>
    </div>
  );
};