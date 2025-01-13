import React from "react";
import styles from "../../ReviewFeedback.module.css";
import Link from "next/link";
import feedbackApiRequest from "@/apiRequests/feedback";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ReviewFeedback({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = await params;
  const cookie = await cookies();
  const accessToken = cookie.get("accessToken")?.value;

  let reviews;
  try {
    const result = await feedbackApiRequest.getFeedback(
      unwrappedParams.id,
      accessToken || ""
    );
    reviews = result.payload.data;
  } catch (error) {
    console.log(error)
    redirect("/homepage");
  }

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
        <div className={styles.reviewDate}>{new Date(reviews.createdAt).toISOString().toString().split("T")[0]}</div>
        <div className={styles.boxFeed}>
          <img
            src={reviews.productImage}
            alt={reviews.productName}
            className={styles.productImage}
          />
          <div className={styles.description}>{reviews.content}</div>
        </div>
        <div className={styles.boxButton}>
          <Link
            href={`/customer/feedback/${unwrappedParams.id}`}
            className={styles.reviewButton}
          >
            Sửa Đánh Giá
          </Link>
        </div>
      </div>
    </div>
  );
}
