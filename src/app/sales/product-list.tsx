"use client";
import React, { useState } from "react";
import styles from "./DiscountedProducts.module.css";
import { ProductCard } from "./product-card";
import dynamic from "next/dynamic";

interface ProductProps {
  id: string;
  name: string;
  imageUrl: string;
  oldPrice: number;
  price: number;
}

interface Props {
  products: ProductProps[];
}
const CountdownTimer = dynamic(() => import('./coutdown'), { ssr: false })

export default function ProductList({ products }: Props) {
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <CountdownTimer />
      <div className={styles.productGrid}>
        {currentProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
      <div className={styles.pagination}>
        <button onClick={handlePrev} disabled={currentPage === 1}>
          Trước
        </button>
        <span>
          Trang {currentPage} / {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Tiếp theo
        </button>
      </div>
    </>
  );
}
