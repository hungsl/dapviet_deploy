import React from 'react';
import styles from './Q&A.module.css';
import { FAQItem as FAQItemType } from '../types';

interface FAQItemProps {
  item: FAQItemType;
}

export const FAQItem: React.FC<FAQItemProps> = ({ item }) => {
  return (
    <div className={styles.faqItem}>
      <div className={styles.question}>{item.question}</div>
      <div className={styles.answer}>{item.answer}</div>
    </div>
  );
};