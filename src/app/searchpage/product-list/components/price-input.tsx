import React, { useEffect, useState } from "react";
import { PriceInputProps } from "../../types";
import styles from "../ProductList.module.css";
import { formatCurrency } from "@/lib/utils";

export const PriceInput: React.FC<PriceInputProps> = ({ value, onChange }) => {
  const [displayValue, setDisplayValue] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, ""); // Loại bỏ ký tự không phải số
    const numericValue = parseInt(rawValue, 10) || 0; // Chuyển thành số hoặc 0

    setDisplayValue(formatCurrency(numericValue) || ""); // Hiển thị định dạng tiền tệ
    onChange(numericValue.toString()); // Truyền giá trị chuỗi qua onChange
  };

  useEffect(() => {
    const numericValue = parseInt(value, 10) || 0; // Chuyển chuỗi về số
    setDisplayValue(formatCurrency(numericValue) || ""); // Đồng bộ hiển thị với giá trị ban đầu
  }, [value]);

  return (
    <>
      <input
      disabled
        type="string"
        className={styles.priceInput}
        placeholder="VND"
        value={displayValue}
        onChange={handleInputChange}
        aria-label="Price input"
      />
    </>
  );
};
