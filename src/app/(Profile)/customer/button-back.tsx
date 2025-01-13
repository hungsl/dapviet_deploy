"use client";
import { useRouter } from "next/navigation";
import React from "react";
import styles from "./UserProfile.module.css";
export default function ButtonBack() {
  const router = useRouter();
  const handleBack = () => {
    // Lấy URL trang gốc và vị trí cuộn từ sessionStorage
    const previousPage = sessionStorage.getItem("previousPage");

    // Nếu có URL trang gốc và vị trí cuộn, điều hướng về trang đó và cuộn đến vị trí lưu
    if (previousPage) {
      router.push(previousPage); // Điều hướng về trang gốc
    } else {
      router.back(); // Nếu không có, quay lại trang trước
    }
  };

  return (
    <div className={styles.backButton} onClick={handleBack}>
      <div className="flex items-center space-x-2 cursor-pointer text-blue-500 hover:text-blue-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span>Quay lại trang chủ</span>
      </div>
    </div>
  );
}
