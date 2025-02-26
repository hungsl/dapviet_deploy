"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
/* eslint-disable @typescript-eslint/no-unused-vars */
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import styles from "./thumbnail.module.css";
import { Expand } from "lucide-react";
// import dynamic from "next/dynamic";

// const Swiper = dynamic(() => import("swiper/react").then(mod => mod.Swiper), { ssr: false });
// const SwiperClass = dynamic(() => import("swiper/react").then(mod => mod.), { ssr: false });
// const SwiperSlide = dynamic(() => import("swiper/react").then(mod => mod.SwiperSlide), { ssr: false });

export default function Thumbnail({ images }: { images: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [currentImage, setCurrentImage] = useState("");

  const openModal = (image: string) => {
    setCurrentImage(image);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentImage("");
  };

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
              {/* Expand button */}
              <div
                className="absolute bottom-4 right-4 bg-white p-1 rounded-md  cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-gray-200"
                onClick={(e) => {
                  openModal(image);
                }}
              >
                <Expand className="h-8 w-8 text-gray-800" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail */}
      {images.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={12}
          slidesPerView={images.length >= 4 ? 4 : images.length}
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
                  quality={60}
                  priority
                  src={image}
                  alt={image}
                  className={styles.thumbImage}
                />
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Modal hiển thị ảnh lớn */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          {/* Nội dung Modal */}
          <div className="relative">
            {/* Nút đóng */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-3xl font-bold"
            >
              &times;
            </button>
            {/* Ảnh lớn */}
            <Image
              src={currentImage}
              quality={100}
              alt="Full Size Image"
              width={900}
              height={900}
              className={styles.modelImage}
            />
          </div>
        </div>
      )}
    </div>
  );
}
