"use client";
import { useState } from "react";
import { ProductCard } from "./product-card";
import { Button } from "@/components/ui/button";
import styles from "../festivalcollection/Carousel.module.css"
import { ProductCardsProps } from "./types";
export default function Carousel ({ cards } : ProductCardsProps)  {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  
  const handleNext = () => {
    if (currentIndex < cards.length - itemsPerPage) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  const visibleCards = cards.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  return (
    <div className={styles.container}>
      <div className={styles.gridWrapper}>
        {visibleCards.map((item: any, index: number) => (
          <ProductCard {...item} key={index} />
        ))}
      </div>

      {/* Nút Prev */}
      <Button
        variant="outline"
        className={`${styles.button} ${styles.prevButton}`}
        onClick={handlePrev}
        disabled={currentIndex === 0}
      >
        Trước
      </Button>

      {/* Nút Next */}
      <Button
        variant="outline"
        className={`${styles.button} ${styles.nextButton}`}
        onClick={handleNext}
        disabled={currentIndex + itemsPerPage >= cards.length}
      >
        Tiếp
      </Button>
    </div>
  );
};
