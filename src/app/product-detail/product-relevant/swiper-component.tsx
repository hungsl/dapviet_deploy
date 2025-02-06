"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { ProductCard } from "./product-card";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// modules
import { Pagination, Navigation } from "swiper/modules";
import { cartListDataType } from "@/schemaValidations/product.schema";
import { useEffect, useState } from "react";
import productApiRequest from "@/apiRequests/product";
import { ProductCardProps } from "./types";
import "./swiper.css";
const SwiperComponent = ({
  collection,
  typeName,
}: {
  collection: string;
  typeName: string;
}) => {
  const [dataList, setProducts] = useState<cartListDataType>();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = {
          sizes: undefined,
          types: typeName ? [typeName] : undefined,
          collections: collection || undefined,
          page: 1,
          size: 10,
          direction: "ASC",
          search: undefined,
        };
        const result = await productApiRequest.products(params);
        setProducts(result.payload.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);
  if (!dataList)
    return (
      <div className="flex justify-center items-center h-screen flex-col relative">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500">Đang tải dữ liệu...</p>
      </div>
    );
  return (
    <Swiper
      spaceBetween={20}
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
      {dataList.map((item: ProductCardProps, index: number) => (
        <SwiperSlide key={index}>
          <ProductCard {...item} key={index} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperComponent;
