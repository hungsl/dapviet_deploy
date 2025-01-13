import React from 'react';
import styles from './VietnamDress.module.css';
import { ContentSectionProps } from '../types';

export const ContentSection: React.FC<ContentSectionProps> = ({ title, description }) => {
  return (
    <div className={styles.contentSection}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <p className={styles.sectionDescription}>{description}</p>
    </div>
  );
};