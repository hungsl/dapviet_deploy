export interface ReviewData {
  feedbackId: string;
  content: string;
  createdAt: string;
  rating: number;
  username: string;
  avatar: string;
}

export interface RatingBarProps {
  stars: number;
  count: number;
  total: number;
}

export interface ReviewCardProps {
  review: ReviewData;
}

export interface summaryFeedbackData {
  totalReviews: number;
  total5Star: number;
  total4Star: number;
  total3Star: number;
  total2Star: number;
  total1Star: number;
}