'use client'
import React, { useEffect, useState } from "react";
import styles from "../../ReviewFeedback.module.css";
import Link from "next/link";
import feedbackApiRequest from "@/apiRequests/feedback";
import Image from "next/image";
import { orderFeedback } from "../../../types";
import { formatDate } from "@/lib/utils";

export default function ReviewFeedback({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [reviews, setReviews] = useState<orderFeedback>();
  const unwrappedParams = React.use(params);
 
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const result = await feedbackApiRequest.getOrderFeedback(unwrappedParams.id);
        setReviews(result.payload.data);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };
    fetchReviews();
  }, [unwrappedParams]);
  if (!reviews)
    return (
    <div className="flex justify-center items-center h-screen flex-col relative">
        <div className="absolute">Loading</div>
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-dotted rounded-full animate-spin">
        </div>
      </div>
    );
  return (
    <div className={styles.reviewContainer}>
      <Link
        href={"/customer/history"}
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
        <span>Trở lại danh sách</span>
      </Link>
      <div className={styles.reviewCard}>
        <div className={styles.productName}>{reviews.productName}</div>
        {Array.from({ length: 5 }, (_, index) => (
          <span
            key={index}
            className={styles.star}
            style={{ color: index + 1 <= reviews.rating ? "#ffd700" : "#ddd" }}
          >
            ★
          </span>
        ))}
        <div className={styles.reviewDate}>
          {formatDate(reviews.createdAt)}
        </div>
        <div className={styles.boxFeed}>
          <Image
            width={300}
            height={300}
            priority
            src={reviews.productImage}
            alt={reviews.productName}
            className={styles.productImage}
          />
          <div className={styles.description}>{reviews.content}</div>
        </div>
        <div className={styles.boxButton}>
          <Link
            href={{
              pathname: `/customer/feedback/${unwrappedParams.id}`,
              query: { product: reviews.productId },
            }}
            className={styles.reviewButton}
          >
            Sửa đánh Giá
          </Link>
        </div>
      </div>
    </div>
  );
}
