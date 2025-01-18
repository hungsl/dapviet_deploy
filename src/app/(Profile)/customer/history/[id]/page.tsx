"use client";
import React, { useEffect, useState } from "react";
import styles from "../RatingPage.module.css";
import Link from "next/link";
import FeedbackForm from "./feedback-form";
import { useRouter, useSearchParams } from "next/navigation";
import productApiRequest from "@/apiRequests/product";
import { productDetailFeedback } from "../../types";
import { Button } from "@/components/ui/button";

export default function CreateFeedbackForm({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [product, setProduct] = useState<productDetailFeedback>();
  const searchParams = useSearchParams();
  const unwrappedParams = React.use(params);
  const router = useRouter()
  console.log(unwrappedParams);
  const productId = searchParams.get("product");
  console.log(productId);
  useEffect(() => {
    if (!unwrappedParams && !productId) return;
    if (unwrappedParams && productId) {
      const fetchProduct = async () => {
        try {
          const result = await productApiRequest.product(productId);
          setProduct(result.payload.data as productDetailFeedback);
        } catch (err) {
          console.log("lỗi lấy sản phẩm: ", err);
        }
      };
      fetchProduct();
    }
  }, [productId, unwrappedParams]);
  const handleBack = () => {
    router.back()
  }
  if (!product)
    return (
      <div className="flex justify-center items-center h-screen flex-col relative">
        <div className="absolute">Loading</div>
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
      </div>
    );
  return (
    <>
      <div className={styles.container}>
        <Button
          variant="ghost"
          onClick={handleBack}
          className="flex items-center space-x-2 text-blue-500 hover:text-blue-700 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Trở lại</span>
        </Button>
        <h1 className="text-2xl font-bold text-center my-4">
          Đánh giá sản phẩm
        </h1>
        <div className={styles.productInfo}>
          <img src="/productDetail/relevant.png" alt="Sản phẩm" />
          <div className={styles.productDetails}>
            <h2 className={styles.productName}>{product.name}</h2>
            <p className={styles.productDescription}>{product.description}</p>
          </div>
        </div>
        <FeedbackForm id={unwrappedParams.id} />
        <p className="text-gray-600 mt-2 flex justify-center text-sm">
          Sự đánh giá của bạn, góp phần giúp chúng tôi cải thiện và mang đến
          những sản phẩm và dịch vụ tốt hơn cho bạn.
        </p>
      </div>
    </>
  );
}
