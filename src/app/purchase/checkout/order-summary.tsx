import React, { useEffect, useState } from "react";
import styles from "./Checkout.module.css";
import { ProductItem } from "./product-item";
import cartApiRequest from "@/apiRequests/cart";
// import { useAppContext } from "@/app/context/app-provider";
import { CartListResType } from "@/schemaValidations/cart";
import { formatCurrency } from "@/lib/utils";

export const OrderSummary: React.FC = () => {
  // const { accessToken } = useAppContext();
  const [cartItems, setCartItems] = useState<CartListResType>();
  const [totalPrice, setTotalPrice] = useState<number|undefined>(0)
  useEffect(() => {
    try {
      const getItemCart = async () => {
        const result = await cartApiRequest.getListItemCart();
        setCartItems(result.payload);
        // console.log(result.payload);
        const totalPrice = result.payload?.data?.reduce((total, item) => {
          return total + item.unitPrice * item.quantity;
        }, 0);
        setTotalPrice(totalPrice)
      };
      getItemCart();
    } catch (error) {
      console.log("lỗi khi lấy cart: ", error)
    }
  }, []);

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
        {/* <div className={styles.summaryRow}>
          <span>Thuế</span>
          <span>$0.00</span>
        </div> */}
        <div className={styles.summaryRow}>
          <span>Vận Chuyển</span>
          <span>đ 0.00</span>
        </div>
      </div>

      <div className={styles.summaryDivider} />

      <div className={styles.totalRow}>
        <span className={styles.totalLabel}>Tổng Cộng:</span>
        <span className={styles.totalAmount}>{formatCurrency(totalPrice)}</span>
      </div>
    </div>
  );
};
