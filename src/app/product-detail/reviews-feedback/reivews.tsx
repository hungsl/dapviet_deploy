import React from 'react';
import styles from './Reviews.module.css';
import { ReviewData } from './types';
import ReviewCard from './review-card';
import RatingBar from './rating-bar';

const reviewsData: ReviewData[] = [
  {
    id: '1',
    authorName: 'Lolla Smith',
    date: '30 July 2022',
    rating: 1,
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
    helpfulCount: 12,
    authorImage: '/productDetail/userfeedbk.png',
  },
  {
    id: '2',
    authorName: 'viet hung',
    date: '30 July 2022',
    rating: 2,
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
    helpfulCount: 12,
    authorImage: '/productDetail/userfeedbk.png',
  },
  {
    id: '3',
    authorName: 'hu hu ',
    date: '30 July 2022',
    rating: 3,
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
    helpfulCount: 12,
    authorImage: '/productDetail/userfeedbk.png',
  },
  {
    id: '4',
    authorName: 'skibidi',
    date: '30 July 2022',
    rating: 4,
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
    helpfulCount: 12,
    authorImage: '/productDetail/userfeedbk.png',
  },
  {
    id: '5',
    authorName: 'labubu',
    date: '30 July 2022',
    rating: 5,
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
    helpfulCount: 12,
    authorImage: '/productDetail/userfeedbk.png',
  },
  // Repeat for other reviews with unique IDs and same structure
];

const Reviews: React.FC = () => {
  const totalReviews = 32;
  const recommendedCount = 30;
  const averageRating = 4.9;
  
  return (
    <div className={styles.container}>
      <div className={styles.reviewsLayout}>
        <div className={styles.reviewsList}>
          {reviewsData.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
        
        <div className={styles.ratingSummary}>
          <div className={styles.overallRating}>
            <div className={styles.ratingTitle}>Đánh Giá Tổng Quan</div>
            <div className={styles.ratingStats}>
              <div className={styles.averageRating}>
                <img
                  loading="lazy"
                  src="/productDetail/star.png"
                  alt=""
                  className={styles.ratingIcon}
                />
                <div className={styles.ratingNumber}>{averageRating}</div>
              </div>
              <div className={styles.recommendedStats}>
                <div className={styles.recommendedCount}>
                  {recommendedCount} trên {totalReviews} ({Math.round(recommendedCount/totalReviews * 100)}%)
                </div>
                <div className={styles.recommendedText}>
                  khách hàng đã đề xuất sản phẩm này.
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.ratingBreakdown}>
            <RatingBar stars={5} count={23} total={totalReviews} />
            <RatingBar stars={4} count={9} total={totalReviews} />
            <RatingBar stars={3} count={2} total={totalReviews} />
            <RatingBar stars={2} count={0} total={totalReviews} />
            <RatingBar stars={1} count={0} total={totalReviews} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;