import React from "react";
import styles from "./ProductGrid.module.css";
// import { ProductGridProps } from './types';
import { ProductCard } from "./product-card";
import { cartListDataType } from "@/schemaValidations/product.schema";
import { formatCurrency } from "@/lib/utils";

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
          imageUrl={product.picture}
          title={product.name}
          price={formatCurrency(product.unitPrice)}
        />
      ))}
    </div>
  );
}
