'use client'
import React, { useState } from "react";
import styles from "../../history/RatingPage.module.css";
import { toast } from "@/hooks/use-toast";

export default function RefeedbackForm() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleRating = (star: number) => {
    setRating(star);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    // Xử lý gửi đánh giá, có thể gửi data đến server
    toast({
      description: "Đánh giá đã được gửi!",
      duration: 3000,
    });
  };
  return (
    <>
      <div className={styles.ratingSection}>
        <label className={styles.ratingLabel}>Sửa đánh giá:</label>
        <div className={styles.starRating}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={styles.star}
              onClick={() => handleRating(star)}
              style={{ color: star <= rating ? "#ffd700" : "#ddd" }}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <div className={styles.commentSection}>
        <label className={styles.ratingLabel}>Nhận xét của bạn:</label>
        <textarea
          className={styles.commentInput}
          value={comment}
          onChange={handleCommentChange}
          placeholder="Hãy chia sẻ cảm nhận của bạn về sản phẩm này."
        />
      </div>

      <button className={styles.submitButton} onClick={handleSubmit}>
        Gửi Đánh Giá
      </button>
    </>
  );
}
