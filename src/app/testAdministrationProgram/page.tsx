"use client";
import React from "react";
// import ButtonTest from "./buttonTest";
// import { Input } from "@/components/ui/input";

export default function page() {
  // const [productId, setProductId] = useState<string>("");
  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     const res = await fetch("http://localhost:3000/api/products");
  //     const products = res.ok ? await res.json() : [];
  //     const productsfilter = Array.isArray(products?.payload?.data)
  //       ? products.payload.data.map(
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
  //     console.log(productsfilter);
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
