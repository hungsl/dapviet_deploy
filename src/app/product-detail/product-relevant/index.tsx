import React from "react";
import { Carousel } from "./Carousel";
import styles from "./ProductGrid.module.css";
import {
  cartListDataType,
  ProductDataType,
} from "@/schemaValidations/product.schema";
import productApiRequest from "@/apiRequests/product";
import { redirect } from "next/navigation";

export const ProductGridContainer = async ({
  data,
}: {
  data: ProductDataType;
}) => {
  let dataList: cartListDataType;
  try {
    const params = {
      sizes: undefined,
      types: Array.isArray(data.typeName) ? data.typeName : [data.typeName],
      collections: data.collectionName ? data.collectionName : undefined,
      page: 1,
      size: 20,
      direction: "ASC",
      search: undefined,
    };
    // console.log(params);
    const result = await productApiRequest.products(params);
    dataList = result.payload.data;
  } catch (error) {
    console.log("fail to get product:", error)
    redirect("/homepage");
  }
  return (
    <div>
      <h2 className={styles.headerTitle}>Những sản phẩm liên quan</h2>
      <Carousel products={dataList} />
    </div>
  );
};
