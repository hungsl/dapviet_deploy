import React from "react";
// import styles from "../CollectionPage.module.css";
import { redirect } from "next/navigation";
import HeroSection from "../hero-section";
import productApiRequest from "@/apiRequests/product";
import CollectionProduct from "./collection-product";
import { ProductList } from "../type";

const CollectionPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  let collection;
  let products : ProductList;
  const unwrappedParams = await params;
  try {
    const result = await productApiRequest.collectionItem(unwrappedParams.id);
    collection = result.payload.data;
    // console.log(collection)
    const params = {
      collections: collection.name,
      page: 1,
      size: 100,
      direction: "ASC",
      search: undefined,
    };
    const product = await productApiRequest.products(params);
    products = product.payload.data;
  } catch (error) {
    console.log("Lỗi khi lấy bộ sưu tập:", error)
    redirect("/trang-chu");
  }
  // console.log(products)
  return (
    <>
      <HeroSection collection={collection} />
      <div className="container">
          <CollectionProduct products ={products}/>
      </div>
    </>
  );
};

export default CollectionPage;
