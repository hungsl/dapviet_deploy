import React from "react";
import styles from "./ProductCard.module.css";
import { ProductCardProps } from "./types";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  picture,
  name,
  unitPrice,
}) => {
  return (
    <Link href={`/chi-tiet-san-pham/${id}`} prefetch className={styles.card}>
      <Image
        width={500}
        height={500}
        loading="lazy"
        src={picture}
        className={styles.productImage}
        alt={name}
      />
      <div className={styles.productInfo}>
        <div className={styles.title}>{name}</div>
        <div className={styles.price}>{formatCurrency(unitPrice)}</div>
      </div>
    </Link>
  );
};
