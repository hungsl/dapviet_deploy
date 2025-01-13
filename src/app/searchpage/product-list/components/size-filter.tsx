import React from 'react';
import { SizeFilterProps } from '../../types';
import styles from '../ProductList.module.css';

export const SizeFilter: React.FC<SizeFilterProps> = ({ 
  size, 
  isSelected,
  onSelect 
}) => {
  return (
    <div 
      className={`${styles.sizeBox} ${isSelected ? styles.selected : ''}`}
      onClick={() => onSelect?.(size)}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
    >
      {size}
    </div>
  );
};