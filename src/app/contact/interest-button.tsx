'use client'
import React, { useState } from "react";
import styles from "./Contact.module.css";

const interests = [
  { text: "Đổi trả", isActive: true },
  { text: "Tư vấn thiết kế" },
  { text: "Sự kiện" },
  { text: "Lỗi giao dịch" },
  { text: "Mua sắm trang phục" },
];

export default function InterestButton({handleInput}: {handleInput : (text: string) => void}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      {interests.map((interest, index) => (
        <div
          key={index}
          onClick={() => {
            setActiveIndex(index)
            handleInput(interest.text)
          }}
          className={`${styles.interestButton} ${
            activeIndex === index ? styles.activeInterest : ""
          }`}
        >
          {interest.text}
        </div>
      ))}
    </>
  );
}
