import React from 'react';
import { BarProps } from '../../../types';
import styles from '../BarChart.module.css';

export const Bar: React.FC<BarProps> = ({ height, color }) => (
  <div 
    className={styles.bar}
    style={{ 
      height: `${height}px`,
      backgroundColor: color
    }}
  />
);