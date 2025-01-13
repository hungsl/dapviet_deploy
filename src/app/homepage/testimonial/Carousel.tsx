"use client";
import { useState } from "react";
import styles from "../festivalcollection/FestivalCards.module.css";
import { TestimonialGridProps } from "./types";
import { StarRating } from "./StarRating";
import { Button } from "@/components/ui/button";

export const Carousel: React.FC<TestimonialGridProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3; // Hiển thị 3 ảnh mỗi lần

  const handleNext = () => {
    if (currentIndex < testimonials.length - itemsPerPage) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  const visibleCards = testimonials.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  return (
    <div className={`relative w-[1150px] mx-auto ${styles.disable}`}>
      <div className="flex gap-4 justify-center">
        {visibleCards.map((testimonial, index) => (
          <div
            key={index}
            className={`flex-none w-full sm:w-1/2 lg:w-1/3 p-2 ${styles.cardContainer}`}
          >
            <img
              loading="lazy"
              src={testimonial.imageSrc}
              alt={`Product image of ${testimonial.productName}`}
              className="object-cover w-full h-[300px] sm:h-[350px] lg:h-[490px] rounded-lg"
            />
            <div className="mt-4 text-base font-semibold text-center text-black">
              {testimonial.productName}
            </div>
            <StarRating count={5} />
            <div className="mt-2 text-sm text-center text-gray-600">
              -{testimonial.userName}-
            </div>
            <div className="mt-3 text-sm text-justify text-gray-800">
              {testimonial.review}
            </div>
          </div>
        ))}
      </div>

      {/* Nút Prev */}
      <Button
      variant="outline"
        className={`absolute left-4 top-1/2 transform -translate-y-1/2 bg-white px-4 text-black py-2 rounded-full shadow-lg ${
          currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handlePrev}
        disabled={currentIndex === 0}
      >
        Trước
      </Button>

      {/* Nút Next */}
      <Button
      variant="outline"
        className={`absolute right-4 top-1/2 transform -translate-y-1/2 bg-white px-4 py-2 rounded-full shadow-lg text-black ${
          currentIndex + itemsPerPage >= testimonials.length
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
        onClick={handleNext}
        disabled={currentIndex + itemsPerPage >= testimonials.length}
      >
        Tiếp
      </Button>
    </div>
  );
};
