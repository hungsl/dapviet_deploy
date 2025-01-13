'use client'
import React from "react";
import styles from "../manage-product/Product.module.css";
import { usePopup } from "@/app/context/popup-provider";

export default function ButtonAddSize() {
  const { setContent, openPopup } = usePopup();
  const handleCreate = () => {
    setContent("createsize");
    openPopup();
  };
  return (
    <button onClick={handleCreate} className={styles.createBtn}>
      Thêm số đo
    </button>
  );
}
