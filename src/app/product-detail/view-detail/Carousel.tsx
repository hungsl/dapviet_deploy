//trang nay bỏ
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import styles from "@/app/homepage/festivalcollection/Carousel.module.css";
import Image from "next/image";
import Link from "next/link";

interface ImgListProps {
  imgList: string[];
}
export const CarouselProductView: React.FC<ImgListProps> = ({ imgList }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 1; // Hiển thị 3 ảnh mỗi lần

  const handleNext = () => {
    if (currentIndex < imgList.length - itemsPerPage) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  const visibleCards = imgList.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <div className={styles.container}>
      <div className={styles.gridWrapper}>
        {visibleCards.map((item, index) => (
          <Link key={index} href={item} prefetch>
            <Image
              src={item}
                // src="/homepage/test.png"
              // src="/homepage/testdorong.jpg"
              alt="Áo Nam Truyền Thống product view"
              className={styles.productImageProd}
              width={500} // Kích thước phù hợp với yêu cầu thiết kế
              height={500} // Kích thước phù hợp với yêu cầu thiết kế
              priority 
            />
          </Link>
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
        disabled={currentIndex + itemsPerPage >= imgList.length}
      >
        Tiếp
      </Button>
    </div>
  );
};
