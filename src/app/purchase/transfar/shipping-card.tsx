import React from "react";
import styles from "./ShippingCard.module.css";
import { ShippingCardProps } from "./types";
import { formatCurrency } from "@/lib/utils";

export const ShippingCard: React.FC<ShippingCardProps> = ({
  option,
  onSelect,
  options
}) => {
  return (
    <div
      className={`${styles.card} ${options === option.MA_DV_CHINH ? styles.cardSelected : ""}`}
      onClick={() => onSelect(option.MA_DV_CHINH)}
      role="radio"
      aria-checked={option.selected}
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onSelect(option.MA_DV_CHINH);
        }
      }}
    >
      <div className={styles.content}>
        <div className={styles.details}>
          <div className={styles.title}>{option.TEN_DICHVU}</div>
          {option.THOI_GIAN && (
            <div className={styles.description}>
              Thời gian giao hàng: {option.THOI_GIAN}
            </div>
          )}
        </div>
      </div>
      <div className={styles.price}>{formatCurrency(option.GIA_CUOC)}</div>
    </div>
  );
};
