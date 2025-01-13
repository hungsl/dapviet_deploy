import React from "react";
import styles from "../checkout/Checkout.module.css";
import { CartListResType } from "@/schemaValidations/cart";
import { formatCurrency } from "@/lib/utils";
import { ProductItem } from "../checkout/product-item";

export const SummaryTranfer = ({cartItems, totalPrice, feeShip}: {cartItems : CartListResType | undefined, totalPrice: number , feeShip: number}) => {
 
  return (
    <div className={styles.summaryContainer}>
      <div className={styles.summaryHeader}>
        <span className={styles.summaryTitle}>Giỏ Hàng Vận Chuyển</span> 
        {cartItems?.data?.length} sản phẩm
      </div>

      <div className={styles.productList}>
        {cartItems?.data?.map((product, index) => (
          <ProductItem key={index} {...product} />
        ))}
      </div>

      <div className={styles.summaryDivider} />

      <div className={styles.summaryDetails}>
        <div className={styles.summaryRow}>
          <span>Tổng giá Sản Phẩm</span>
          <span>{formatCurrency(totalPrice)}</span>
        </div>
        <div className={styles.summaryRow}>
          <span>Vận Chuyển</span>
          <span>{formatCurrency(feeShip)}</span>
        </div>
      </div>

      <div className={styles.summaryDivider} />

      <div className={styles.totalRow}>
        <span className={styles.totalLabel}>Tổng Cộng:</span>
        <span className={styles.totalAmount}>{formatCurrency(totalPrice + feeShip)}</span>
      </div>
    </div>
  );
};
