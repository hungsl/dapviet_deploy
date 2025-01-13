import React from 'react'
import styles from "./DiscountedProducts.module.css";

export default function Hero() {
  return (
    <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Giảm giá cực sốc!</h1>
          <p className={styles.heroSubtitle}>
            Khám phá các sản phẩm chất lượng với giá ưu đãi!
          </p>
        </div>
      </div>
  )
}
