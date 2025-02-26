import React, { useEffect } from "react";
import styles from "./OrderConfimation.module.css";
import Link from "next/link";
import { usePopup } from "@/app/context/popup-provider";
import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useAppContext } from "@/app/context/app-provider";

export const SuccessOrder: React.FC = () => {
  const {closePopup} = usePopup();
    const triggerClick = useMutation(api.memory.triggerClick);
    const {setIsRefresh, isRefresh} = useAppContext();
  useEffect(() => {
    triggerClick();
    setIsRefresh(!isRefresh);
  },[])
  return (
    <div className={styles.container}>
      <Image
        width={300}
        height={300}
        loading="lazy"
        src="/homepage/thanhtoan.png"
        className={styles.confirmationImage}
        alt="Order confirmation checkmark"
      />
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>Cảm ơn bạn đã đặt hàng!</h1>
        <p className={styles.description}>
          Cảm ơn bạn đã tin tưởng và mua sắm tại cửa hàng của chúng tôi! Đơn
          hàng của bạn đang được xử lý và sẽ được giao trong thời gian sớm nhất.
          Nếu bạn có bất kỳ câu hỏi nào về sản phẩm hoặc dịch vụ, đừng ngần ngại
          liên hệ với chúng tôi.
        </p>
        <p className={styles.highlight}>
          Truy cập ngay để kiểm tra thông tin
          đơn hàng 
          <Link prefetch href="/customer/order" onClick={closePopup} className={styles.linkButton}>Xem đơn hàng</Link>
        </p>
        {/* <button 
        className={styles.backButton}
        onClick={handleBack}
        type="button"
      >
        Quay lại nút test nhớ xóa
      </button> */}
      </div>
      <div className={styles.buttonContainer}></div>
    </div>
  );
};
