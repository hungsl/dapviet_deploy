"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProductGrid from "./product-grid";
import styles from "./ProductGrid.module.css"
import { cartListDataType } from "@/schemaValidations/product.schema";
export const Carousel = ({ products } : {products : cartListDataType}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4; 

  const handleNext = () => {
    if (currentIndex < products.length - itemsPerPage) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  const visibleCards = products.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <div className={`relative w-[1200px] mx-auto ${styles.disable}`}>
      <div className="flex gap-4 justify-center">
        <ProductGrid products={visibleCards}/>
      </div>

      {/* Nút Prev */}
      <Button
        variant="outline"
        className={`absolute left-2 top-1/2 transform -translate-y-1/2 text-black bg-gray-200 px-4 py-2 rounded-full ${
          currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handlePrev}
        disabled={currentIndex === 0}
      >
        Trước
      </Button>

      {/* Nút Next */}
      <Button
      variant="outline"
        className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-black bg-gray-200 px-4 py-2 rounded-full ${
          currentIndex + itemsPerPage >= products.length
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
        onClick={handleNext}
        disabled={currentIndex + itemsPerPage >= products.length}
      >
        Tiếp
      </Button>
    </div>
  );
};
