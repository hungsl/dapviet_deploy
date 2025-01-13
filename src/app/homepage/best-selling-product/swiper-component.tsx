"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { ProductCard } from "./product-card";
// import swiper style
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// modules
import { Pagination, Navigation } from "swiper/modules";
import { ProductCardProps, ProductCardsProps } from "./types";
import "./swiper.css";

const SwiperComponent = ({ cards }: ProductCardsProps) => {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={3}
      navigation={true}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      className="w-[100%]"
      loop={true}
      modules={[Pagination, Navigation]}
      //   style={{
      //     "--swiper-navigation-color": "#ffffff",
      //     "--swiper-pagination-color": "#ffffff",
      //     "--swiper-pagination-bottom": "0px",
      //   }}
    >
      {cards.map((item: ProductCardProps, index: number) => (
        <SwiperSlide key={index}>
          <ProductCard {...item} key={index} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperComponent;
