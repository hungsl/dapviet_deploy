import React from 'react';
import styles from './Hero.module.css';
import { HeroContentProps } from '../types';

export const HeroContent: React.FC<HeroContentProps> = ({ title, description }) => {
  return (
    <div className={styles.contentWrapper}>
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};