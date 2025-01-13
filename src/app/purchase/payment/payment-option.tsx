'use client'
import React, { useState } from "react";
import styles from "./PaymentOption.module.css";
import { usePopup } from "@/app/context/popup-provider";

interface PaymentOptionProps {
  label: string;
  value: string;
}

interface PaymentSelectorProps {
  options: PaymentOptionProps[];
}

const PaymentOption: React.FC<PaymentSelectorProps> = ({
  options,
}) => {
  const { setContent, setMethod } = usePopup();
  const [selectedOption, setSelectedOption] = useState<string>(
    options[0]?.value || ""
  );
  const onContinue = () => {
    if(selectedOption === "cod"){
      setMethod('cod');
    }else if(selectedOption === "qr"){
      setMethod("qr");
    }
    setContent("transfer");
  }
  const handleBack = () => {
    setContent("checkout");
  };

  return (
    <div className={styles.container}>
      <div className={styles.paymentOptionsWrapper}>
        {options.map((option) => (
          <div
            key={option.value}
            className={
              selectedOption === option.value
                ? styles.paymentOptionSelected
                : styles.paymentOption
            }
            onClick={() => setSelectedOption(option.value)}
            role="radio"
            aria-checked={selectedOption === option.value}
            tabIndex={0}
          >
            <div className={styles.optionContent}>
              <div>{option.label}</div>
            </div>
            {/* Hiển thị thêm nội dung nếu giá trị là "qr" */}
            {option.value === "qr" && selectedOption === "qr" && (
              <div className={styles.qrInstructions}>
                <p className="font-bold">Cách thanh toán bằng mã QR:</p>
                <ol>
                  <li>
                    Bước 1: Đăng nhập vào ứng dụng <strong>Thanh toán</strong> của ngân
                    hàng hoặc ứng dụng thanh toán điện tử mà bạn muốn sử dụng.
                  </li>
                  <li>Bước 2: Chọn chức năng Quét mã QR.</li>
                  <li>
                    Bước 3: Di chuyển camera điện thoại đến nơi có chứa mã QR cần quét.
                  </li>
                  <li>
                    Bước 4: Kiểm tra đầy đủ các thông tin và số tiền cần trả.</li>
                  <li>
                    Bước 5: Nhập mật khẩu hoặc OTP để hoàn thành giao dịch.</li>
                </ol>
              </div>
            )}
            {option.value === "cod" && selectedOption === "cod" && (
              <div className={styles.qrInstructions}>
                <p className="font-bold">Thêm phí thu tiền khi giao hàng, nếu có</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={styles.navigationButtons}>
        <button className={styles.backButton} onClick={handleBack} type="button">
          Quay lại
        </button>
        <button
          className={styles.continueButton}
          onClick={onContinue}
          type="button"
        >
          Tiếp Tục
        </button>
      </div>
    </div>
  );
};

export default PaymentOption;
