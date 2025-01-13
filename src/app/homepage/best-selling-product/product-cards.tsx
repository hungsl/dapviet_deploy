"use client";
import React, { useEffect, useState } from "react";
import styles from "./ProductGrid.module.css";
import productApiRequest from "@/apiRequests/product";
import dynamic from "next/dynamic";
import { ProductCardProps } from "./types";

const Carousel = dynamic(() => import("./Carousel"), { ssr: false });

export default function ProductGrid() {
  const [data, setData] = useState<ProductCardProps[]>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await productApiRequest.topProducts();
        setData(result.payload.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);
  if (!data)
    return (
      <>
        <h1 className={styles.festivalTitle}>Sản Phẩm Bán Chạy</h1>
        <div className="flex justify-center items-center h-screen flex-col relative">
          <div className="absolute">Loading</div>
          <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
        </div>
      </>
    );
  return (
    <>
      <h1 className={styles.festivalTitle}>Sản Phẩm Bán Chạy</h1>
      <div className={styles.gridContainer}>
        <div className={styles.gridWrapper}>
          <Carousel cards={data} />
        </div>
      </div>
    </>
  );
}
