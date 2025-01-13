"use client";
import React, { useEffect } from "react";
import styles from "./popup-style.module.css";

interface PopupProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  isQr: boolean;
}
export default function Popup({ children, isOpen, onClose , isQr}: PopupProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto"; // Phục hồi trạng thái cuộn khi đóng popup
    }

    return () => {
      document.body.style.overflow = "auto"; // Đảm bảo phục hồi khi component bị unmount
    };
  }, [isOpen]);
  if (!isOpen) return null;

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <button className={isQr ? "hidden" : styles.closeButton } onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
}
