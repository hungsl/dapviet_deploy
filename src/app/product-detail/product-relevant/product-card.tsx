import React from 'react';
import styles from './ProductCard.module.css';
import { ProductCardProps } from './types';
import Link from 'next/link';
import Image from 'next/image';

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  imageUrl,
  title,
  price
}) => {
  return (
    <Link href={`/product-detail/${id}`} prefetch className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          width={300}
          height={300}
          loading="lazy"
          src={imageUrl}
          className={styles.productImage}
          alt={title}
        />
      </div>
      <div className={styles.productInfo}>
        <div className={styles.title}>{title}</div>
        <div className={styles.price}>{price} VND</div>
      </div>
    </Link>
  );
};