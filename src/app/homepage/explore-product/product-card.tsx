import React from "react";
import styles from "./ProductGrid.module.css";
import { ProductCardProps, ProductGridProps } from "./types";
import Link from "next/link";

const products: ProductGridProps = {
  products: [
    {
      id: "PR00001",
      imageUrl:
        "/homepage/explore/khampha1.png",
      title: "Eto V Neck Yellow",
      price: "129.000 VND",
    },
    {
      id: "PR00002",
      imageUrl:
        "/homepage/explore/khampha2.png",
      title: "Macaroon Dry Half",
      price: "139.000 VND",
    },
    {
      id: "PR00003",
      imageUrl:
        "/homepage/explore/khampha3.png",
      title: "Wave Stripe Hally",
      price: "129.000 VND",
    },
    {
      id: "PR00004",
      imageUrl:
        "/homepage/explore/khampha4.png",
      title: "Eve Punching Floral",
      price: "123.000 VND",
    },
    {
      id: "PR00005",
      imageUrl:
        "/homepage/explore/khampha5.png",
      title: "Floral Waffle Tee",
      price: "199.000 VND",
    },
    {
      id: "PR00006",
      imageUrl:
        "/homepage/explore/khampha6.png",
      title: "Snap Pure Blouse",
      price: "229.000 VND",
    },
  ],
};

export default function ProductCard() {
  return (
    <div className={styles.grid}>
      {products.products.map((product: ProductCardProps, index: number) => (
        <Link
          prefetch
          href={`/product-detail/${product.id}`}
          key={index}
          className={styles.productCard}
        >
          <img
            loading="lazy"
            src={product.imageUrl}
            alt={product.title}
            className={styles.productImage}
          />
          <div className={styles.productInfo}>
            <h3 className={styles.productTitle}>{product.title}</h3>
            <p className={styles.productPrice}>Giá: {product.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
