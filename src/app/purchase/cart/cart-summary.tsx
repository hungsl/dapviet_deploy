import React from "react";
import styles from "./Cart.module.css";
import { CartSummaryProps } from "./types";
import { usePopup } from "@/app/context/popup-provider";
import { toast } from "@/hooks/use-toast";

export const CartSummary: React.FC<CartSummaryProps> = ({
  number,
  subtotal,
  shipping,
  total,
  loadings,
  isMaxItem,
}) => {
  const { setContent } = usePopup();

  const goToCheckout = () => {
    if (isMaxItem){
      toast({
        title: "Xin lỗi, một số sản phẩm trong giỏ hàng có số lượng vượt quá tồn kho. Vui lòng kiểm tra lại.",
        variant: "destructive",
        duration: 10000
      })
      return;
    }
    setContent("checkout");
  };
  return (
    <div className={styles.summaryContainer}>
      <div className={styles.promoSection}>
        <div className="flex justify-between">
          <h4 className={styles.promoTitle}>Tổng kết đơn hàng</h4>
          <label htmlFor="promoCode" className="visually-hidden">
            {number} sản phẩm
          </label>
        </div>

        {/* <form className={styles.promoForm}>
          <label htmlFor="promoCode" className="visually-hidden">
            Nhập thẻ quà tặng hoặc mã giảm giá
          </label>
          <input
            id="promoCode"
            type="text"
            className={styles.promoInput}
            placeholder="Nhập thẻ quà tặng hoặc mã giảm giá"
          />
          <button type="submit" className={styles.promoButton}>
            Áp Dụng
          </button>
        </form> */}
      </div>
      <hr className={styles.divider} />
      <div className={styles.summaryDetails}>
        <div className={styles.summaryRow}>
          <span>Tổng giá Sản Phẩm</span>
          <span>{subtotal}</span>
        </div>
        {/* <div className={styles.summaryRow}>
          <span>Thuế</span>
          <span>{tax}</span>
        </div> */}
        <div className={styles.summaryRow}>
          <span>Vận Chuyển</span>
          <span>{shipping}</span>
        </div>
      </div>
      <hr className={styles.divider} />
      <div className={styles.totalRow}>
        <span className={styles.totalLabel}>Tổng Cộng: </span>
        <span className={styles.totalAmount}>{total}</span>
      </div>
      {number !== 0 &&
      <button
        disabled={number === 0 || loadings}
        onClick={goToCheckout}
        className={`${styles.checkoutButton} ${number === 0 || (loadings && styles.disable)}`}
      >
        Tiến Đến Thanh Toán
      </button>}
    </div>
  );
};
