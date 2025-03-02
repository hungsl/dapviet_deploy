"use client";
import React from "react";
// import ButtonTest from "./buttonTest";
// import { Input } from "@/components/ui/input";
// import productApiRequest from "@/apiRequests/product";

export default function page() {
  // const [productId, setProductId] = useState<string>("");
  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     const res = await productApiRequest.productsForAI();
  //     const products = res?.payload?.data;
  //     const productsfilter = Array.isArray(products)
  //       ? products.map(
  //           ({
  //             name,
  //             unitPrice,
  //             picture,
  //           }: {
  //             name: string;
  //             unitPrice: number;
  //             picture: string;
  //           }) => ({
  //             name,
  //             unitPrice,
  //             picture,
  //           })
  //         )
  //       : [];
  //     console.log(products);
  //   };
  //   fetchProduct();
  // }, []);

  return (
    <div>
      page
      {/* <ButtonTest text="addall"/> */}
      {/* <ButtonTest text = "content"/> */}
      {/* <Input
        type="text"
        onChange={(e) => setProductId(e.target.value)}
        value={productId}
        placeholder="Nhập productId"
      />
      <ButtonTest text="productId"  productId={productId} /> */}
    </div>
  );
}
