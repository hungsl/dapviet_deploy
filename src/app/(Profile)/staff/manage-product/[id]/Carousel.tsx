"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import styles from "@/app/homepage/festivalcollection/FestivalCards.module.css";
import Image from "next/image";

export default function CarouselProductDetail({
  productsImg,
}: {
  productsImg: string[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 1;

  const handleNext = () => {
    if (currentIndex < productsImg.length - itemsPerPage) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  const visibleCards = productsImg.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  return (
    <div className={styles.container}>
      <div className={styles.gridWrapper}>
        {visibleCards.map((item, index) => (
          <Image
            key={index}
            src={item}
            alt={`Preview ${index}`}
            width={500} // Cung cấp chiều rộng
            height={300}
            priority={index === 0}
            style={{ width: '100%', height: '400px' }}
          />
        ))}
      </div>

      {/* Nút Prev */}
      <div>
        <Button
          variant="outline"
          className={`${styles.button} ${styles.prevButton} ${styles.preReleButton}`}
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          Trước
        </Button>

        {/* Nút Next */}
        <Button
          variant="outline"
          className={`${styles.button} ${styles.nextButton} ${styles.nextReleButton}`}
          onClick={handleNext}
          disabled={currentIndex + itemsPerPage >= productsImg.length}
        >
          Tiếp
        </Button>
      </div>
    </div>
  );
}
