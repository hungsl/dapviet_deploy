"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { ProductCard } from "./product-card";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay"; 
// modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { ProductCardProps } from "./types";
import "./swiper.css";
import {
  cartListDataType,
} from "@/schemaValidations/product.schema";
import { useEffect, useState } from "react";
import productApiRequest from "@/apiRequests/product";

const SwiperComponent = () => {
  const [dataList, setDataList] = useState<cartListDataType>();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await productApiRequest.topProducts();
        setDataList(result.payload.data);
      } catch (error) {
        console.error("Failed to get products:", error);
      }
    };
    fetchProducts();
  }, []);
  if (!dataList)
    return (
    <div className="flex justify-center items-center h-screen flex-col relative">
        <div className="absolute">Loading</div>
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-dotted rounded-full animate-spin">
        </div>
      </div>
    );
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={3}
      navigation={true}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      className="w-[100%]"
      loop={true}
      autoplay={{
        delay: 3000, 
        disableOnInteraction: false, // Không tắt autoplay khi người dùng tương tác
        pauseOnMouseEnter: true, // Dừng autoplay khi hover vào Swiper
      }}
      modules={[Pagination, Navigation, Autoplay]}
    >
      {dataList.map((item: ProductCardProps, index: number) => (
        <SwiperSlide key={index}>
          <ProductCard {...item} key={index} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperComponent;
