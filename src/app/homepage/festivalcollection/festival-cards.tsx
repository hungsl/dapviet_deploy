"use client";
import React, { useEffect, useState } from "react";
import styles from "./FestivalCards.module.css";
// import { Carousel } from "./Carousel";
import productApiRequest from "@/apiRequests/product";
import dynamic from "next/dynamic";
import { datalist, FestivalCardProps } from "./types";

const Carousel = dynamic(() => import("./Carousel"), { ssr: false });
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
          <div className="absolute">Loading</div>
          <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
        </div>
      </>
    );

  return (
    <>
      <h1 className={styles.festivalTitle}>Bộ Sưu Tập Lễ Hội</h1>
      <div className={styles.cardsContainer}>
        <Carousel cards={data.cards} />
      </div>
    </>
  );
}
