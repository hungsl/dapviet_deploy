import React from 'react';
import { CategoryProps } from '../../types';
import styles from '../ProductList.module.css';

export const FilterItem: React.FC<CategoryProps> = ({ 
  name, 
  onChange, 
  isSelected 
}) => {
  return (
    <div className={styles.filterItem} onClick={() => onChange?.(name)}>
      <div className={styles.filterCheckbox}>
        <div className={`${styles.checkbox} ${isSelected ? styles.selected : ''}`} />
        <div className={styles.filterLabel}>{name}</div>
      </div>
      {/* <div className={styles.filterCount}>{count}</div> */}
    </div>
  );
};