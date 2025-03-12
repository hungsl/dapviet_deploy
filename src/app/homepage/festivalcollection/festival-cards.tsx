"use client";
import React, { useEffect, useState } from "react";
import styles from "./FestivalCards.module.css";
// import { Carousel } from "./Carousel";
import productApiRequest from "@/apiRequests/product";
import { datalist, FestivalCardProps } from "./types";
import dynamic from "next/dynamic";
// import SwiperComponent from "./swiper-festival";

const SwiperComponent = dynamic(() => import("./swiper-festival"), {
  ssr: false,
});
export default function FestivalCards() {
  const [data, setData] = useState<datalist>();

  useEffect(() => {
    const fetchCollection = async () => {
      const result = await productApiRequest.collection();
      const { data } = result.payload;
      const trans = transformFestivalCards(data);
      setData(trans);
    };
    const transformFestivalCards = (cards: FestivalCardProps[]): datalist => {
      return {
        cards: cards.map((card) => ({
          id: card.id,
          name: card.name,
          images: card.images[0] || "", // Lấy ảnh đầu tiên trong mảng (hoặc để chuỗi rỗng nếu không có)
        })),
      };
    };
    fetchCollection();
  }, []);
  if (!data)
    return (
      <>
        <h1 className={styles.festivalTitle}>Bộ Sưu Tập Lễ Hội</h1>
        <div className="flex justify-center items-center h-screen flex-col relative">
          <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500">Đang tải dữ liệu...</p>
        </div>
      </>
    );

  return (
    <>
      <h1 className={styles.festivalTitle}>Bộ Sưu Tập Lễ Hội</h1>
      <div className={styles.cardsContainer}>
        {data.cards && data.cards.length > 0 ? (
          <SwiperComponent cards={data.cards} />
        ) : (
          <p className={styles.emptyMessage}>Oops! Hiện chưa có trang phục nào cho bộ sưu tập! 🏮</p>
        )}
      </div>
    </>
  );
}
