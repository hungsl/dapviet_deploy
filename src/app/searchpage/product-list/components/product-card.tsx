'use client'
import React from "react";
import styles from "../ProductList.module.css";
import Image from "next/image";
import Link from "next/link";
import { ProductCardProps } from "../../types";
import { formatCurrency } from "@/lib/utils";

export default function ProductCard({
  id,
  picture,
  name,
  rating,
  unitPrice,
}: ProductCardProps) {
  return (
    <Link href={`/chi-tiet-san-pham/${id}`} className={styles.productCard}>
      <div className={styles.imageContainer}>
        <Image
          width={500}
          height={500}
          quality={100}
          loading="lazy"
          src={picture}
          alt={`Product image of ${name}`}
          className={styles.productImage}
        />
      </div>
      <div className={styles.productInfo}>
        <div className={styles.productTitle}>{name}</div>
        {Array.from({ length: 5 }, (_, index) => (
          <span
            key={index}
            className={styles.star}
            style={{ color: index + 1 <= rating ? "#ffd700" : "#ddd" }}
          >
            ★
          </span>
        ))}
        <div className={styles.productPrice}>{formatCurrency(unitPrice)}</div>
      </div>
    </Link>
  );
}
