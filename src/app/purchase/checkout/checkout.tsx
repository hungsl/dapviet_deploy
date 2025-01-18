import React from "react";
import styles from "./Checkout.module.css";
import { StepIndicator } from "./step-indicator";
import { OrderSummary } from "./order-summary";
import CheckoutForm from "./checkout-form";

export const Checkout: React.FC = () => {
  return (
    <div className={`${styles.container} scroll`}>
      <div className={styles.content}>
        <div className={styles.formColumn}>
          <div className={styles.stepIndicators}>
            <StepIndicator number="1" label="Giỏ Hàng" isActive={false} />
            <StepIndicator number="2" label="Thông Tin" isActive={true} />
            <StepIndicator number="3" label="Loại Thanh Toán" isActive={false} />
            <StepIndicator number="4" label="Vận Chuyển" isActive={false} />
            <div className={styles.lineIndicator}>-</div>
          </div>
          <CheckoutForm />
        </div>
        <div className={styles.summaryColumn}>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};
