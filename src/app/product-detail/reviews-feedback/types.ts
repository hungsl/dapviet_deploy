export interface ReviewData {
    id: string;
    authorName: string;
    date: string;
    rating: number;
    content: string;
    helpfulCount: number;
    authorImage: string;
  }
  
  export interface RatingBarProps {
    stars: number;
    count: number;
    total: number;
  }
  
  export interface ReviewCardProps {
    review: ReviewData;
  }