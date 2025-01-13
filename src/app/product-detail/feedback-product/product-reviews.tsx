import React from 'react';
import styles from './ProductReviews.module.css';
import SortButton from './sort-button';

const ProductReviews: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Đánh Giá Sản Phẩm</h1>
      <div className={styles.sortWrapper}>
        <span className={styles.sortLabel}>Sắp xếp</span>
        <SortButton options={["Mới nhất", "Cũ nhất", "Đánh giá cao nhất"]} />
      </div>
    </div>
  );
};

export default ProductReviews;