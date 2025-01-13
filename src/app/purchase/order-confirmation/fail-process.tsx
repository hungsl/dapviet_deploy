import React from "react";
import styles from "./OrderConfimation.module.css";
import { Button } from "./button-model";
import Image from "next/image";

export const FailedOrder: React.FC = () => {
  return (
    <div className={styles.container}>
      <Image
        width={300}
        height={300}
        loading="lazy"
        src="/homepage/fail.png"
        className={styles.confirmationImage}
        alt="Order confirmation checkmark"
      />
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>Rất tiếc, thanh toán không thành công!</h1>
        <p className={styles.description}>
          Chúng tôi không thể xử lý thanh toán của bạn. Vui lòng kiểm tra lại
          thông tin thanh toán hoặc thử lại sau. Nếu vấn đề vẫn tiếp diễn, hãy
          liên hệ với chúng tôi để được hỗ trợ.
        </p>
      </div>
      <div className={styles.buttonContainer}>
        <Button variant="primary">Thử lại thanh toán</Button>
      </div>
    </div>
  );
};
