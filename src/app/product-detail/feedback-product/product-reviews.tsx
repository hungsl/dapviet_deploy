"use client";
import React from "react";
import styles from "./ProductReviews.module.css";
import SortButton from "./sort-button";

export default function ProductReviews({
  selectedSort,
  setSelectedSort,
}: {
  setSelectedSort: (selectedSort: string) => void;
  selectedSort: string;
}) {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Đánh Giá Sản Phẩm</h1>
      <div className={styles.sortWrapper}>
        <span className={styles.sortLabel}>Sắp xếp</span>
        <SortButton
          options={["Mới nhất", "Cũ nhất", "Đánh giá cao nhất"]}
          setSelectedSort={setSelectedSort}
          selectedSort={selectedSort}
        />
      </div>
    </div>
  );
}
