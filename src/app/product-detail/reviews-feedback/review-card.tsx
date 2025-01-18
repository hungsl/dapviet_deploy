import React from "react";
import styles from "./Reviews.module.css";
import { ReviewCardProps } from "./types";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { TiStarFullOutline } from "react-icons/ti";

export default function ReviewCard({ review }: ReviewCardProps) {
  const getRatingText = (rating: number) => {
    if (rating >= 5) return "Tuyệt vời";
    if (rating === 4) return "Rất tốt";
    if (rating === 3) return "Bình thường";
    if (rating === 2) return "Không hài lòng";
    return "Rất tệ";
  };
  return (
    <>
      <div className={styles.reviewCard}>
        <img
          loading="lazy"
          src={review.avatar || "/userProfile.png"}
          alt={`${review.username}'s profile`}
          className={styles.authorImage}
        />
        <div className={styles.reviewContent}>
          <div className={styles.reviewHeader}>
            <div className={styles.reviewMeta}>
              <div className={styles.authorName}>{review.username}</div>
              <div className={styles.reviewDate}>
                {formatDate(review.createdAt)}
              </div>
            </div>
            <div className={styles.verifiedIcon}>...</div>
          </div>
          <div className={styles.ratingDisplay}>
            {[...Array(review.rating)].map((_, index) => (
              <span
                key={index}
                className={
                  index < review.rating ? styles.filledStar : styles.emptyStar
                }
              >
                {/* <Image
                  width={300}
                  height={300}
                  loading="lazy"
                  src="/productDetail/star2.png"
                  alt={`${review.rating} star rating`}
                  className={styles.ratingImage}
                /> */}
                <TiStarFullOutline color="#FFA500" size={17} />
              </span>
            ))}
            <div className={styles.ratingText}>
              {getRatingText(review.rating)}
            </div>
          </div>
          <div className={styles.reviewText}>{review.content}</div>
          <div className={styles.reviewActions}>
            <div className={styles.helpfulCount}></div>
          </div>
        </div>
      </div>
      <div className={styles.reviewDivider} />
    </>
  );
}
