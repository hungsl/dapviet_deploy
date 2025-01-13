import React from 'react';
import styles from './Dashboard.module.css';
import { StatCardProps } from '../types';

export const StatCard: React.FC<StatCardProps> = ({ title, value, className }) => {
  return (
    <div className={`${styles.statCard} ${className || ''}`}>
      <div className={styles.statTitle}>{title}</div>
      <div className={styles.statValue}>{value}</div>
    </div>
  );
};