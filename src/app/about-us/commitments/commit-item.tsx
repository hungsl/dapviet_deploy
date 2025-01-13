import React from 'react';
import styles from './Commitments.module.css';
import { CommitmentItemProps } from '../types';

export const CommitmentItem: React.FC<CommitmentItemProps> = ({ number, title, description }) => {
  return (
    <div className={styles.commitmentItem}>
      <div className={styles.numberBadge}>{number}</div>
      <div className={styles.contentWrapper}>
        <h3 className={styles.itemTitle}>{title}</h3>
        <p className={styles.itemDescription}>{description}</p>
      </div>
    </div>
  );
};