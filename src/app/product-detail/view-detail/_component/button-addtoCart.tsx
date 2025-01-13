"use client";
import React, { useEffect, useState } from "react";
import styles from "../ProductDetail.module.css";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
// import { useAppContext } from "@/app/context/app-provider";
import accountApiRequest from "@/apiRequests/account";

export default function ButtonAddtoCart({
  productName,
}: {
  productName: string;
}) {
  // const { accessToken } = useAppContext();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userId, setUserId] = useState("");
  useEffect(() => {
    const CallUser = async () => {
      if (accessToken) {
        try {
          const result = await accountApiRequest.me(accessToken);
          setUserId(result.payload.data.id); // Set userId sau khi có kết quả
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    CallUser();
  }, [accessToken]);
  useEffect(() => {
    // Lấy token từ localStorage
    const token = localStorage.getItem("accessToken");
    setAccessToken(token);
  }, []);
  const createNotification = useMutation(api.notification.createNotification);
  const handleAddToCart = () => {
    const notificationText = `Sản phẩm ${productName} đã được thêm vào giỏ hàng.`;
    createNotification({
      text: notificationText,
      token: userId,
    });
  };
  return (
    <button className={styles.buyButton} onClick={handleAddToCart}>
      Thêm vào giỏ hàng
    </button>
  );
}
