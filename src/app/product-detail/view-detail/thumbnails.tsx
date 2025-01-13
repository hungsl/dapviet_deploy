"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import styles from "./thumbnail.module.css";

export default function Thumbnail({ images }: { images: string[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <div className={styles.container}>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={`${styles.swiperMain} custom-main-swiper`}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className={styles.slideItem}>
              <Image
                width={500}
                height={500}
                quality={100}
                priority
                src={image}
                alt={image}
                className={styles.slideImage}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail */}
      {images.length > 1 && 
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={12}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={styles.thumbs}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <button className={styles.thumbItem}>
              <Image
                width={300}
                height={300}
                loading="lazy"
                src={image}
                alt={image}
                className={styles.thumbImage}
              />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>}
    </div>
  );
}
