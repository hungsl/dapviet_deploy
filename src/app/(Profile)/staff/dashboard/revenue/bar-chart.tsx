import React from 'react';
import styles from './Revenue.module.css';
import { BarChartDataPoint } from '../../types';

interface BarChartProps {
  data: BarChartDataPoint;
}

export const BarChart: React.FC<BarChartProps> = ({ data }) => {
  return (
    <div className={styles.barGroup}>
      <div 
        className={styles.currentBar} 
        style={{ height: `${data.currentValue}px` }}
      />
      <div 
        className={styles.previousBar} 
        style={{ height: `${data.previousValue}px` }}
      />
    </div>
  );
};