import React from "react";
import styles from "./Checkout.module.css";
import { CartItemType } from "@/schemaValidations/cart";
import { formatCurrency } from "@/lib/utils";

export const ProductItem: React.FC<CartItemType> = ({
  name,
  image,
  unitPrice,
  size,
  quantity,
}) => {
  return (
    <div className={styles.productContainer}>
      <div className={styles.productImageWrapper}>
        <img
          loading="lazy"
          src={image}
          alt={name}
          className={styles.productImage}
        />
      </div>
      <div className={styles.productDetails}>
        <div className={styles.productHeader}>
          <div className={styles.productTitle}>{name}</div>
          <div className={styles.productPrice}>{formatCurrency(unitPrice)}</div>
        </div>
        <div className={styles.productSpecs}>
          <div>Số lượng: {quantity}</div>
          <div className={styles.productSize}>Kích cỡ: {size}</div>
        </div>
      </div>
    </div>
  );
};
