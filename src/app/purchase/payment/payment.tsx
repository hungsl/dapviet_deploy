import React from "react";
import styles from "../checkout/Checkout.module.css";
import { StepIndicator } from "../checkout/step-indicator";
import PaymentOption from "./payment-option";
import { OrderSummary } from "../checkout/order-summary";

export const PaymentPage = () => {
  const paymentOptions = [
    { label: "Thanh toán khi nhận hàng (COD)", value: "cod" },
    { label: "Thanh toán bằng QR", value: "qr" },
  ];

  return (
    <div className={`${styles.container} scroll`}>
      <div className={styles.content}>
        <div className={styles.formColumn}>
          <div className={styles.stepIndicators}>
            <StepIndicator number="1" label="Giỏ Hàng" isActive={false} />
            <StepIndicator number="2" label="Thông Tin" isActive={false} />
            <StepIndicator
              number="3"
              label="Loại Thanh Toán"
              isActive={true}
            />
            <StepIndicator number="4" label="Vận Chuyển" isActive={false} />
            <div className={styles.lineIndicator}>-</div>
          </div>

          <PaymentOption options={paymentOptions} />
        </div>
        <div className={styles.summaryColumn}>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};
