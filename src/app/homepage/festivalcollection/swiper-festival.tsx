"use client";
import { Swiper, SwiperSlide } from "swiper/react";
// import swiper style
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from "./FestivalCards.module.css";

// modules
import { Pagination, Navigation } from "swiper/modules";
import { FestivalGrid } from "./festival-grid";
import { data, datalist } from "./types";

const SwiperComponent = ({ cards }: datalist) => {
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
      {cards.map((item: data, index) => {
        return (
          <SwiperSlide key={index}>
            <div className={`flex-none w-1/3 p-2 ${styles.cardContainer}`}>
              <FestivalGrid item={item} />
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default SwiperComponent;
