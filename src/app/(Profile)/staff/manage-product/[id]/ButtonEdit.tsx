"use client";
import styles from "./ProductDetail.module.css";
import { usePopup } from "@/app/context/popup-provider";
import { Button } from "@/components/ui/button";
import React from "react";

export default function ButtonEdit({productId}: {productId: string}) {
  const { setContent, openPopup, setUpdateValue } = usePopup();

  const handleOpenEdit = () => {
    setContent("updateproduct");
    openPopup();
    setUpdateValue(productId);
  };

  return (
    <Button onClick={handleOpenEdit} className={styles.edit}>
      Chỉnh sửa
    </Button>
  );
}
