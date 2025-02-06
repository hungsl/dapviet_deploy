"use client";
import React, { useEffect, useState } from "react";
import styles from "../../history/RatingPage.module.css";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import feedbackApiRequest from "@/apiRequests/feedback";
import LoadingAnimation from "@/components/common/LoadingAnimation";

export default function RefeedbackForm({ id }: { id: string }) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleRating = (star: number) => {
    setRating(star);
  };
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const result = await feedbackApiRequest.getOrderFeedback(id);
        setRating(result.payload.data.rating)
        setContent(result.payload.data.content)
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };
    fetchReviews();
  }, [id]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = async() => {
    try {
      setLoading(true);
      if(!content || !rating) {
        toast({
          variant: "destructive",
          description: "Bạn không được để trống!",
          duration: 4000
        })
        return
      }
      const body = {
        content,
        rating,
      };
      const result = await feedbackApiRequest.giveFeedBack(id, body);
      toast({
        description: result.payload.message,
        duration: 4000,
      });
      router.push("/customer/history");
    } catch (error) {
      console.log("lỗi đánh giá sản phẩm: ", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className={styles.ratingSection}>
        <label className={styles.ratingLabel}>Sửa đánh giá:</label>
        {loading && <LoadingAnimation />}
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
          value={content}
          onChange={handleCommentChange}
          placeholder="Hãy chia sẻ cảm nhận của bạn về sản phẩm này."
        />
      </div>

      <button className={styles.submitButton} onClick={handleSubmit}>
        Gửi lại Đánh Giá
      </button>
    </>
  );
}
