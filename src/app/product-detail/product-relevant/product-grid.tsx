import React from "react";
import styles from "./ProductGrid.module.css";
import { ProductCard } from "./product-card";
import { cartListDataType } from "@/schemaValidations/product.schema";

export default function ProductGrid({
  products,
}: {
  products: cartListDataType;
}) {
  return (
    <div className={styles.grid}>
      {products.map((product, index) => (
        <ProductCard
          key={index}
          id={product.id}
          picture={product.picture}
          name={product.name}
          unitPrice={(product.unitPrice)}
          rating={product.rating}
        />
      ))}
    </div>
  );
}
