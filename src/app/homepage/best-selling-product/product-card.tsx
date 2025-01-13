import React from "react";
import styles from "./ProductGrid.module.css";

import { ProductCardProps } from "./types";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  picture,
  name,
  unitPrice,
}) => {
  return (
    
    <Link href={`/product-detail/${id}`} className={styles.gridColumn}>
      <div className={styles.productCard}>
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
          <div className={styles.productPrice}>{formatCurrency(unitPrice)}</div>
        </div>
      </div>
    </Link>
  );
};
