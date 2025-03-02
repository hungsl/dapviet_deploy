"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Thumbs, Zoom, Keyboard } from "swiper/modules";
/* eslint-disable @typescript-eslint/no-unused-vars */
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/autoplay";
import styles from "./thumbnail.module.css";
import "swiper/css/zoom";
import { SquareX } from "lucide-react";
// import dynamic from "next/dynamic";

// const Swiper = dynamic(() => import("swiper/react").then(mod => mod.Swiper), { ssr: false });
// const SwiperClass = dynamic(() => import("swiper/react").then(mod => mod.), { ssr: false });
// const SwiperSlide = dynamic(() => import("swiper/react").then(mod => mod.SwiperSlide), { ssr: false });

export default function Thumbnail({ images }: { images: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
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
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false, // Không tắt autoplay khi người dùng tương tác
          pauseOnMouseEnter: true, // Dừng autoplay khi hover vào Swiper
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className={`${styles.swiperMain} custom-main-swiper`}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className={`${styles.slideItem}`}>
              <Image
                onClick={() => openModal(index)}
                width={500}
                height={500}
                quality={100}
                priority
                src={image}
                alt={image}
                className={styles.slideImage}
              />
              {/* Expand button */}
              {/* <div
                className="absolute bottom-4 right-4 bg-white p-1 rounded-md  cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-gray-200"
                onClick={(e) => {
                  openModal(image);
                }}
              >
                <Expand className="h-8 w-8 text-gray-800" />
              </div> */}
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
                  loading="lazy"
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
      {/* Modal hiển thị ảnh lớn */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50" onClick={closeModal}>
          <div className="relative w-[100%] max-w-[620px] h-[100%] !bg-white/100 bg-opacity-50" onClick={(e) => e.stopPropagation()} >
            {/* Nút đóng */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-50 items-center justify-center text-white bg-red-400 hover:bg-red-600  p-1 rounded-lg text-xl font-bold shadow-md transition duration-300 block md:hidden"
            >
              <SquareX />
            </button>
            {/* Swiper trong Modal */}
            <Swiper
              initialSlide={currentIndex} // Bắt đầu từ ảnh đang mở
              loop={true}
              spaceBetween={10}
              navigation={true}
              zoom={true}
              keyboard= {{
                enabled: true,
                onlyInViewport: true,
                pageUpDown: true
              }}
              modules={[FreeMode, Navigation, Thumbs, Autoplay, Zoom, Keyboard]}
              className={`${styles.swiperMain} custom-main-swiper`}
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="swiper-zoom-container">
                    <Image
                      width={900}
                      height={900}
                      quality={100}
                      loading="lazy"
                      src={image}
                      alt={`Modal Image ${index}`}
                      className={styles.modelImage}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
}
