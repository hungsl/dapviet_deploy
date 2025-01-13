export interface StarRatingProps {
    count: number;
  }
  
  export interface TestimonialCardProps {
    imageSrc: string;
    productName: string;
    userName: string;
    review: string;
  }
  export interface TestimonialGridProps {
      testimonials: TestimonialCardProps[];
    }