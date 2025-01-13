'use client'
import React from 'react';
import { PriceRangeProps } from '../../types';
import styles from '../ProductList.module.css';

export const PriceRange: React.FC<PriceRangeProps> = ({ 
  label, 
  isSelected,
  onChange 
}) => {
  const cleanedLabel = label.replace(' VND', '');
  const [minPrice, maxPrice] = cleanedLabel.split(' - ').map(price => parseFloat(price.replace('.', '').replace('trở lên', '').trim()));
  const handlePriceChange = () => {
    // Kiểm tra nếu range là "2.000.000 VND trở lên"
    if (maxPrice && onChange) {
      onChange(minPrice.toString(), maxPrice.toString());
    } else {
      // Nếu là khoảng "2.000.000 VND trở lên", chúng ta sẽ chỉ gán minPrice
      if (onChange) {
        onChange(minPrice.toString(), 'Infinity');
      }
    }
  };
  return (
    <div 
      className={styles.priceRange} 
      onClick={handlePriceChange}
      role="button"
      tabIndex={0}
    >
      <div className={styles.filterCheckbox}>
        <div className={`${styles.checkbox} ${isSelected ? styles.selected : ''}`} />
        <div className={styles.filterLabel}>{label}</div>
      </div>
    </div>
  );
};