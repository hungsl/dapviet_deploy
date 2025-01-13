"use client";
import React from "react";
import { usePopup } from "../context/popup-provider";
import styles from "./header.module.css";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CartIcon() {
  const { openPopup, setContent } = usePopup();
  const handleOpenCart = () => {
    setContent("cart");
    openPopup();
  };
  return (
    <Button variant="ghost" size="icon" onClick={handleOpenCart} className={styles.socialIconCart}>
      {/*gio hang*/}
      <ShoppingCart width={22} />
      {/* <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white text-xs font-bold shadow-md">
        10
      </div> */}
    </Button>
  );
}
