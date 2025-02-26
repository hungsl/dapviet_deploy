"use client";
import React, { useEffect, useState } from "react";
import { usePopup } from "../context/popup-provider";
import styles from "./header.module.css";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import cartApiRequest from "@/apiRequests/cart";
import { useAppContext } from "../context/app-provider";

export default function CartIcon() {
  const { openPopup, setContent } = usePopup();
  const [length, setLength] = useState<number>(0);
  const { isRefresh } = useAppContext();
  const handleOpenCart = () => {
    setContent("cart");
    openPopup();
  };
  useEffect(() => {
    try {
      const getItemCart = async () => {
        const result = await cartApiRequest.getListItemCart();
        setLength(result.payload.data?.length || 0);
        // console.log(result.payload);
      };
      getItemCart();
    } catch (error) {
      console.log("lỗi khi lấy cart: ", error);
    }
  }, [isRefresh]);
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleOpenCart}
      className={styles.socialIconCart}
    >
      {/*gio hang*/}
      <ShoppingCart width={22} />
      {length > 0 && (
        <div className={styles.cartBadge}>{length}</div>
      )}
      {/* <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white text-xs font-bold shadow-md">
        10
      </div> */}
    </Button>
  );
}
