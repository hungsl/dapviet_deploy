"use client";
import React, { useEffect, useState } from "react";
import styles from "./Reviews.module.css";
import { ReviewData, summaryFeedbackData } from "./types";
import ReviewCard from "./review-card";
import RatingBar from "./rating-bar";
import feedbackApiRequest from "@/apiRequests/feedback";
import { TiStarFullOutline } from "react-icons/ti";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import dynamic from "next/dynamic";

const ProductReviews = dynamic(
  () => import("../feedback-product/product-reviews"),
  { loading: () => <p>Loading...</p>, ssr: false }
);

export default function Reviews({
  avgRating,
  productId,
}: {
  avgRating: number;
  productId: string;
}) {
  const [feedback, setFeedback] = useState<ReviewData[]>();
  const [selectedSort, setSelectedSort] = useState("Mới nhất");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [summaryFeedback, setSummaryFeedback] = useState<summaryFeedbackData>();
  const [recommendedCount, setRecommendedCount] = useState(0);
  // const totalReviews = 32;
  // const recommendedCount = 30;
  // const averageRating = 4.9;
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setLoading(true);
        let properties = "createdAt";
        let direction = "DESC";
        switch (selectedSort) {
          case "Mới nhất":
            properties = "createdAt";
            direction = "DESC";
            break;
          case "Cũ nhất":
            properties = "createdAt";
            direction = "ASC";
            break;
          case "Đánh giá cao nhất":
            properties = "rating";
            direction = "DESC";
            break;
          default:
            break;
        }
        const result = await feedbackApiRequest.getProductFeedback(
          productId,
          properties,
          direction,
          currentPage
        );
        // console.log("fetchFeedback: ", result);
        const data = result.payload.data;
        setFeedback(data);
        setTotalPages(result.payload.totalPage);
      } catch (error) {
        console.log("lỗi lấy đánh giá: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedback();
  }, [productId, selectedSort, currentPage]);

  useEffect(() => {
    const fetchSummaryFeedback = async () => {
      try {
        const result = await feedbackApiRequest.getSummaryFeedback(productId);
        const data = result.payload.data;
        setSummaryFeedback(data);
        setRecommendedCount(data.total4Star + data.total5Star);
      } catch (error) {
        console.log("Lỗi lấy tổng feedback: ", error);
      }
    };
    fetchSummaryFeedback();
  }, [productId]);
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  if (!feedback || !summaryFeedback)
    return (
      <div className="flex justify-center items-center h-screen flex-col relative">
        <div className="absolute">Loading</div>
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
      </div>
    );
  return (
    <>
      <ProductReviews
        setSelectedSort={setSelectedSort}
        selectedSort={selectedSort}
      />
      <div className={styles.container}>
        <div className={styles.reviewsLayout}>
          <div className={styles.reviewsList}>
            {loading ? (
              <div className="flex justify-center items-center h-screen flex-col relative">
                <div className="absolute">Loading</div>
                <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
              </div>
            ) : feedback.length === 0 ? (
              <div className="text-center text-gray-500">
                Hãy là người đầu tiên chia sẻ cảm nhận của mình để giúp shop cải
                thiện dịch vụ!
              </div>
            ) : (
              feedback.map((review) => (
                <ReviewCard key={review.feedbackId} review={review} />
              ))
            )}
          </div>

          <div className={styles.ratingSummary}>
            <div className={styles.overallRating}>
              <div className={styles.ratingTitle}>Đánh Giá Tổng Quan</div>
              <div className={styles.ratingStats}>
                <div className={styles.averageRating}>
                  <TiStarFullOutline color="#FFD700" />
                  <div className={styles.ratingNumber}>{avgRating}</div>
                </div>
                <div className={styles.recommendedStats}>
                  <div className={styles.recommendedCount}>
                    {recommendedCount} trên {summaryFeedback.totalReviews} (
                    {Math.round(
                      (recommendedCount / summaryFeedback.totalReviews) * 100
                    )}
                    %)
                  </div>
                  <div className={styles.recommendedText}>
                    khách hàng đã đề xuất sản phẩm này.
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.ratingBreakdown}>
              <RatingBar
                stars={5}
                count={summaryFeedback.total5Star}
                total={summaryFeedback.totalReviews}
              />
              <RatingBar
                stars={4}
                count={summaryFeedback.total4Star}
                total={summaryFeedback.totalReviews}
              />
              <RatingBar
                stars={3}
                count={summaryFeedback.total3Star}
                total={summaryFeedback.totalReviews}
              />
              <RatingBar
                stars={2}
                count={summaryFeedback.total2Star}
                total={summaryFeedback.totalReviews}
              />
              <RatingBar
                stars={1}
                count={summaryFeedback.total1Star}
                total={summaryFeedback.totalReviews}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-10 mb-10">
          <PaginationContent>
            {/* Nút Previous */}
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => handlePageChange(currentPage - 1)}
                className={currentPage === 1 ? "disabled" : ""}
              />
            </PaginationItem>

            {/* Hiển thị trang đầu tiên và dấu ... nếu cần */}
            {currentPage > 3 && (
              <>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === 1}
                    onClick={() => handlePageChange(1)}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              </>
            )}

            {/* Hiển thị các trang xung quanh trang hiện tại */}
            {Array.from({ length: 5 })
              .map((_, index) => currentPage - 2 + index) // Tạo dãy trang xung quanh
              .filter((page) => page >= 1 && page <= totalPages) // Lọc bỏ trang đầu tiên và trang cuối
              .map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === page}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

            {/* Hiển thị trang cuối cùng và dấu ... nếu cần */}
            {currentPage < totalPages - 2 && (
              <>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === totalPages}
                    onClick={() => handlePageChange(totalPages)}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

            {/* Nút Next */}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => handlePageChange(currentPage + 1)}
                className={currentPage === totalPages ? "disabled" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}
