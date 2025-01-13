import React from 'react';
import { LegendItemProps } from '../../../types';
import styles from '../BarChart.module.css';

export const LegendItem: React.FC<LegendItemProps> = ({ icon, label }) => (
  <div className={styles.legendItem}>
    <div className={styles.legendIconWrapper}>
      <div className={styles[icon]}>.</div>
      <div className={styles.label}>{label}</div>
    </div>
  </div>
);