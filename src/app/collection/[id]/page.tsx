import React from "react";
// import styles from "../CollectionPage.module.css";
import { redirect } from "next/navigation";
import HeroSection from "../hero-section";
import productApiRequest from "@/apiRequests/product";
import CollectionProduct from "./collection-product";

const CollectionPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  let collection;
  let products;
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
    redirect("/homepage");
  }
  console.log(products)
  return (
    <>
      <HeroSection collection={collection} />
      <div className="container">
          {/* <div className={styles.productList}>
            <h2 className={styles.heading}>Our Products</h2>
            <div className={styles.products}>
              {products.map((product) => (
                <div key={product.id} className={styles.productCard}>
                  <img
                    src={product.picture}
                    alt={product.name}
                    className={styles.productImage}
                  />
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productPrice}>${product.unitPrice}</p>
                </div>
              ))}
            </div>
          </div> */}
          <CollectionProduct/>
      </div>
    </>
  );
};

export default CollectionPage;
