"use client";
import React, { useEffect, useState } from "react";
import styles from "../../history/RatingPage.module.css";
import RefeedbackForm from "./refeedback-form";
import { useRouter, useSearchParams } from "next/navigation";
import productApiRequest from "@/apiRequests/product";
import { productDetailFeedback } from "../../types";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Updatefeedback = ({ params }: { params: Promise<{ id: string }> }) => {
  const [product, setProduct] = useState<productDetailFeedback>();
  const router  = useRouter()
  const searchParams = useSearchParams();
  const unwrappedParams = React.use(params);
  // console.log(unwrappedParams);
  const productId = searchParams.get("product");
  // console.log(productId);
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
 
  return (
    <div className={`${styles.container} `}>
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
      <h1 className="text-2xl font-bold text-center my-4">Sửa Đánh Giá</h1>
      <div className={styles.productInfo}>
        <Image width={300} height={300} priority src={product?.pictures[0] || "/images/default-product.jpg"} alt="Sản phẩm" />
        <div className={styles.productDetails}>
          <h2 className={styles.productName}>
            {product?.name}
          </h2>
          {product?.description}
        </div>
      </div>
      <RefeedbackForm  id={unwrappedParams.id} />
      <p className="text-gray-600 mt-2 flex justify-center">
        Sự đánh giá của bạn, góp phần giúp chúng tôi cải thiện và mang đến những
        sản phẩm và dịch vụ tốt hơn cho bạn.
      </p>
    </div>
  );
};

export default Updatefeedback;
