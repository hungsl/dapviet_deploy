import React from "react";
import FestivalCards from "./festivalcollection/festival-cards";
import ProductGrid from "./best-selling-product/product-cards";
import ProductGridExplore from "./explore-product/product-grid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trang chủ",
};
export default function Homepage() {
  return (
    <>
      {/* <DapViet /> */}
      <div>
        <FestivalCards />
        <ProductGrid />
        <ProductGridExplore />
        {/* <TestimonialSection /> */}
        {/* <AuthSection /> */}
      </div>
    </>
  );
}
