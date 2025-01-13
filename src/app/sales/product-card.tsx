import React from "react";
import styles from "./DiscountedProducts.module.css";
import Link from "next/link";
import Image from "next/image";

interface ProductProps {
  id: string
  name: string;
  imageUrl: string;
  oldPrice: number;
  price: number;
}

export const ProductCard: React.FC<ProductProps> = ({ id, name, imageUrl, oldPrice, price} ) => {
  return (
    <Link href={`/product-detail/${id}`} className={styles.productCard}>
      <Image width={500} height={500} src={imageUrl} alt={name} className={styles.productImage} />
      <h3 className={styles.productName}>{name}</h3>
      <p className={styles.productPrice}>{price} VND</p>
      <p className={styles.oldPrice}>{oldPrice} VND</p>
    </Link>
  );
};
