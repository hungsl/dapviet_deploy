'use client'
import React from "react";
import styles from "./Product.module.css";
import { usePopup } from "@/app/context/popup-provider";

export default function ButtonAdd() {
  const { setContent, openPopup } = usePopup();
  const handleCreate = () => {
    setContent("createproduct");
    openPopup();
  };
  return (
    <button onClick={handleCreate} className={styles.createBtn}>
      Thêm sản phẩm
    </button>
  );
}
