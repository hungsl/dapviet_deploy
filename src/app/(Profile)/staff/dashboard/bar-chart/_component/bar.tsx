import React from 'react';
import { BarProps } from '../../../types';
import styles from '../BarChart.module.css';

export const Bar: React.FC<BarProps> = ({ height, color, label }) => (
  <div className={styles.container}>
    <div 
      className={styles.bar}
      style={{ 
        height: `${height}px`,
        backgroundColor: color
      }}
    />
    {/* Phần tử hiển thị số bên dưới thanh bar */}
    <div className={styles.label}>
      {label}
    </div>
  </div>
);