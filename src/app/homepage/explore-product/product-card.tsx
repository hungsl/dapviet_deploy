"use client";
import React, { useEffect, useState } from "react";
import styles from "./ProductGrid.module.css";
import { ProductCardProps } from "../best-selling-product/types";
import Link from "next/link";
import productApiRequest from "@/apiRequests/product";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";

export default function ProductCard() {
  const [products, setProducts] = useState<ProductCardProps[]>();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = {
          minPrice: undefined,
          maxPrice: undefined,
          sizes: undefined,
          types: undefined,
          collections: undefined,
          page: 1,
          size: 6,
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
  if (!products)
    return (
      <div className="flex justify-center items-center h-screen flex-col relative">
        <div className="absolute">Loading</div>
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-dotted rounded-full animate-spin">
        </div>
      </div>
    );
  return (
    <div className={styles.grid}>
      {products.map((product: ProductCardProps, index: number) => (
        <Link
          prefetch
          href={`/product-detail/${product.id}`}
          key={index}
          className={styles.productCard}
        >
          <Image
            width={300}
            height={300}
            loading="lazy"
            src={product.picture}
            alt={product.name}
            className={styles.productImage}
          />
          <div className={styles.productInfo}>
            <h3 className={styles.productTitle}>{product.name}</h3>
            <p className={styles.productPrice}>
              Giá: {formatCurrency(product.unitPrice)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
