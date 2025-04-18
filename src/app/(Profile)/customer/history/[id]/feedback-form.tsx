"use client";
import React, { useState } from "react";
import styles from "../RatingPage.module.css";
import { toast } from "@/hooks/use-toast";
import feedbackApiRequest from "@/apiRequests/feedback";
import { useRouter } from "next/navigation";
import LoadingAnimation from "@/components/common/LoadingAnimation";

export default function FeedbackForm({ id }: { id: string }) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleRating = (star: number) => {
    setRating(star);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!content || !rating) {
        toast({
          variant: "destructive",
          description: "Bạn không được để trống!",
          duration: 3000,
        });
        return;
      }
      const body = {
        content,
        rating,
      };
      const result = await feedbackApiRequest.giveFeedBack(id, body);
      toast({
        description: result.payload.message,
        duration: 3000,
      });
    } catch (error) {
      console.log("lỗi đánh giá sản phẩm: ", error);
    } finally {
      setLoading(false);
      router.push("/customer/history");
    }
  };
  return (
    <div>
      <div className={styles.ratingSection}>
        {loading && <LoadingAnimation />}
        <label className={styles.ratingLabel}>Đánh giá sản phẩm:</label>
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
          className={`${styles.commentInput} !text-foreground`}
          value={content}
          onChange={handleCommentChange}
          placeholder="Hãy chia sẻ cảm nhận của bạn về sản phẩm này."
        />
      </div>

      <button className={styles.submitButton} onClick={handleSubmit}>
        Gửi Đánh Giá
      </button>
    </div>
  );
}
