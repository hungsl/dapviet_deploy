"use client";
import React from "react";
import styles from "./ProductGrid.module.css";
import { ProductDataType } from "@/schemaValidations/product.schema";
import dynamic from "next/dynamic";

const SwiperComponent = dynamic(() => import("./swiper-component"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
export const ProductGridContainer = ({ data }: { data: ProductDataType }) => {
  return (
    <div>
      <h2 className={styles.headerTitle}>Những sản phẩm liên quan</h2>
      {/* <Carousel products={dataList} /> */}
      <SwiperComponent
        collection={data.collectionName || ""}
        typeName={data.typeName}
      />
    </div>
  );
};
