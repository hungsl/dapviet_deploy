"use client";
import React, { useState } from "react";
import styles from "../ProductDetail.module.css";
import SizeGuidePopup from "../size-guide-popup";
export default function IntroductionSize() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <button className={styles.sizeGuide} onClick={togglePopup}>
        Hướng dẫn kích thước
      </button>
      {/* Popup */}
      {isOpen && <SizeGuidePopup togglePopup={togglePopup} />}
    </>
  );
}
