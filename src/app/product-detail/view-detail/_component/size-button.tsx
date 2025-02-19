"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "../ProductDetail.module.css";
// import IntroductionSize from "./introduction-size";
import accountApiRequest from "@/apiRequests/account";
// import { useAppContext } from "@/app/context/app-provider";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import cartApiRequest from "@/apiRequests/cart";
import { toast } from "@/hooks/use-toast";

// import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { usePopup } from "@/app/context/popup-provider";



const IntroductionSize = dynamic(() => import("./introduction-size"), { ssr: false });
const Loader2 = dynamic(() => import("lucide-react").then(mod => mod.Loader2), { ssr: false });

const sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"];
type SizeQuantityResType = Record<string, { size: string; quantity: number }>;

export default function SizeButton({
  sizeQuantities,
  productName,
}: {
  sizeQuantities: SizeQuantityResType;
  productName: string;
}) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const { openPopup, setContent } = usePopup();
  useEffect(() => {
    // Lấy token từ localStorage
    const token = localStorage.getItem("accessToken");
    setAccessToken(token);
  }, []);
  // const { accessToken } = useAppContext();
  const [userId, setUserId] = useState("");
  useEffect(() => {
    const CallUser = async () => {
      if (accessToken) {
        try {
          const result = await accountApiRequest.meClient();
          // console.log(result)
          setUserId(result.payload.data.id); // Set userId sau khi có kết quả
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    CallUser();
  }, [accessToken]);

  const createNotification = useMutation(api.notification.createNotification);
  const handleAddToCart = async () => {
    // Tìm productQuantityId
    if (selectedSize === "") {
      toast({
        variant: "destructive",
        title: "Hãy chọn kích thước",
        description: "không thể thêm sản phẩm",
        duration: 4000,
      });
      return;
    }
    if (accessToken) {
      const selectedProductQuantityId = Object.keys(sizeQuantities).find(
        (key) => sizeQuantities[key].size === selectedSize
      );
      if (!selectedProductQuantityId) {
        console.error("Không tìm thấy ID tương ứng với kích thước đã chọn");
        return;
      }
      try {
        setLoading(true);
        const cartPayload = {
          productQuantityId: selectedProductQuantityId,
          quantity: quantity, // Số lượng người dùng đã chọn
        };

        console.log("Payload gửi lên API:", cartPayload);

        const response = await cartApiRequest.addToCart(cartPayload);
        toast({
          title: response.payload.message,
          duration: 4000,
        });
        // Tạo thông báo sau khi thêm giỏ hàng thành công
        const notificationText = `Sản phẩm ${productName} (${selectedSize}, ${quantity} chiếc) đã được thêm vào giỏ hàng.`;
        createNotification({
          text: notificationText,
          token: userId,
        });
      } catch (error) {
        console.log("Lỗi thêm vào cart: ", error);
        toast({
          variant: "destructive",
          description: "Lỗi khi thêm vào giỏ hàng.",
          duration: 4000,
        });
      } finally {
        setLoading(false);
      }
    } else {
      setContent('login');
      openPopup();
      toast({
        variant: "destructive",
        description: "Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.",
        duration: 4000,
      });
    }
  };

  // Sử dụng useMemo để tính toán giá trị maxQuantity chỉ khi có sự thay đổi trong sizeQuantities hoặc selectedSize
  const maxQuantity = useMemo(() => {
    const sizeId = Object.keys(sizeQuantities).find(
      (id) => sizeQuantities[id].size === selectedSize
    );
    return sizeId ? sizeQuantities[sizeId].quantity : 0;
  }, [selectedSize, sizeQuantities]);

  // Sử dụng useCallback để tránh việc tạo lại hàm này mỗi lần render
  const handleSizeChange = useCallback(
    (size: string) => {
      // Chỉ thay đổi khi không bị vô hiệu hóa
      const sizeId = Object.keys(sizeQuantities).find(
        (id) => sizeQuantities[id].size === size
      );
      const isDisabled = !sizeId || sizeQuantities[sizeId].quantity === 0;

      if (!isDisabled) {
        setSelectedSize(size);
        setQuantity(1); // Reset quantity khi chọn kích thước mới
      }
    },
    [sizeQuantities] // Phụ thuộc vào sizeQuantities
  );
  // console.log("maxQuantity: ", maxQuantity)
  // console.log("selectedSize: " , selectedSize)
  // console.log("quantity: " , quantity)
  const handleIncrease = () => {
    console.log("increase");
    if (selectedSize === "") {
      console.log("select");
      toast({
        variant: "destructive",
        title: "Hãy chọn kích cỡ",
        duration: 4000,
      });
      return;
    }
    if (quantity >= maxQuantity) {
      toast({
        variant: "destructive",
        title: "Rất tiếc",
        description: "Sản phẩm không còn đủ số lượng!",
        duration: 4000,
      });
      return;
    }
    setQuantity((prev) => Math.min(maxQuantity, prev + 1));
  };
  const handleDecrease = () => {
    if (selectedSize === "") {
      toast({
        variant: "destructive",
        title: "Hãy chọn kích cỡ",
        duration: 4000,
      });
      return;
    }
    console.log(quantity, maxQuantity);

    setQuantity((prev) => Math.max(1, prev - 1));
  };
  return (
    <>
      <div className={styles.sizeSection}>
        <div className={styles.sizeHeader}>
          <span className={styles.sizeTitle}>Kích cỡ:</span>
          <IntroductionSize />
        </div>
        <div className={styles.sizeButtons}>
          {sizes.map((size) => {
            // Kiểm tra xem size có trong sizeQuantities không và nếu có thì kiểm tra quantity
            const sizeId = Object.keys(sizeQuantities).find(
              (id) => sizeQuantities[id].size === size
            );
            const isDisabled = !sizeId || sizeQuantities[sizeId].quantity === 0;

            return (
              <button
                key={size}
                className={`${styles.sizeButton} ${isDisabled && styles.disabled} ${selectedSize === size ? styles.selectedSize : ""}`}
                onClick={() => handleSizeChange(size)}
                aria-pressed={selectedSize === size}
                disabled={isDisabled} // Disable nút nếu size không có hoặc số lượng là 0
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.quantitySection}>
        <span className={styles.quantityLabel}>Số lượng:</span>
        <div className={styles.quantityControl}>
          <button
            className={styles.quantityButton}
            onClick={handleDecrease}
            aria-label="Decrease quantity"
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className={styles.quantityValue}>{quantity}</span>
          <button
            className={styles.quantityButton}
            onClick={handleIncrease}
            aria-label="Increase quantity"
            // disabled={quantity >= maxQuantity} // Không cho tăng nếu số lượng đã đạt tối đa
          >
            +
          </button>
        </div>
      </div>
      <div className={styles.actionButtons}>
        <button
          disabled={loading}
          className={styles.buyButton}
          onClick={handleAddToCart}
        >
          {loading ? <div className="flex justify-center"><Loader2 className="animate-spin " /> </div>: <>Thêm vào giỏ hàng</>}
          
        </button>
      </div>
    </>
  );
}
