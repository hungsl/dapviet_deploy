import React from 'react';
import styles from './Checkout.module.css';
import { StepIndicatorProps } from './types';

export const StepIndicator: React.FC<StepIndicatorProps> = ({ number, label, isActive }) => {
  return (
    <div className={styles.stepWrapper}>
      <div className={isActive ? styles.stepNumberActive : styles.stepNumber}>
        {number}
      </div>
      <div className={isActive ? styles.stepLabelActive : styles.stepLabel}>
        {label}
      </div>
    </div>
  );
};