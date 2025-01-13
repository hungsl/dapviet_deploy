import React from "react";
import styles from "./ProductGrid.module.css";
import ProductCard from "./product-card";
import ButtonLoadMore from "./button-loadmore";

export default function ProductGridExplore() {
  return (
    <section className={styles.container}>
      <h1 className={styles.festivalTitle}>Khám phá sản phẩm</h1>
      <ProductCard />
      <ButtonLoadMore />
    </section>
  );
}
