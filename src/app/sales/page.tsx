import React from "react";
import styles from "./DiscountedProducts.module.css";
import ProductList from "./product-list";

const products = [
  {
    id: "PD1",
    name: "Sản phẩm 1",
    imageUrl: "/homepage/explore/khampha1.png",
    oldPrice: 200000,
    price: 100000,
  },
  {
    id: "PD2",
    name: "Sản phẩm 1",
    imageUrl: "/homepage/explore/khampha2.png",
    oldPrice: 200000,
    price: 100000,
  },
  {
    id: "PD3",
    name: "Sản phẩm 1",
    imageUrl: "/homepage/explore/khampha3.png",
    oldPrice: 200000,
    price: 100000,
  },
  {
    id: "PD4",
    name: "Sản phẩm 1",
    imageUrl: "/homepage/explore/khampha4.png",
    oldPrice: 200000,
    price: 100000,
  },
  {
    id: "PD5",
    name: "Sản phẩm 1",
    imageUrl: "/homepage/explore/khampha5.png",
    oldPrice: 200000,
    price: 100000,
  },
  {
    id: "PD6",
    name: "Sản phẩm 1",
    imageUrl: "/homepage/explore/khampha6.png",
    oldPrice: 200000,
    price: 100000,
  },
  {
    id: "PD7",
    name: "Sản phẩm 1",
    imageUrl: "/homepage/explore/khampha1.png",
    oldPrice: 200000,
    price: 100000,
  },
  {
    id: "PD8",
    name: "Sản phẩm 1",
    imageUrl: "/homepage/explore/khampha2.png",
    oldPrice: 200000,
    price: 100000,
  },
  {
    id: "PD9",
    name: "Sản phẩm 1",
    imageUrl: "/homepage/explore/khampha3.png",
    oldPrice: 200000,
    price: 100000,
  },
  {
    id: "PD10",
    name: "Sản phẩm 1",
    imageUrl: "/homepage/explore/khampha3.png",
    oldPrice: 200000,
    price: 100000,
  },
  {
    id: "PD11",
    name: "Sản phẩm 1",
    imageUrl: "/homepage/explore/khampha3.png",
    oldPrice: 200000,
    price: 100000,
  },
  // Add more products here
];

export default function DiscountedProducts() {
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Hãy nhanh lên, trước khi quá muộn!
        </h1>
        <ProductList products={products} />
      </div>
    </>
  );
}
