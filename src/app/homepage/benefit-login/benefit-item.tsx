import React from 'react';
import styles from './Auth.module.css';
import { BenefitItemProps } from './types';

export const BenefitItem: React.FC<BenefitItemProps> = ({ text }) => (
  <div className={styles.benefitWrapper}>
    <img loading="lazy" src="/homepage/hinhthoi.png" alt="" className={styles.benefitIcon} />
    <div className={styles.benefitText}>{text}</div>
  </div>
);