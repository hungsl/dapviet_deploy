import React from "react";
import styles from "./DiscountedProducts.module.css";
import ProductList, { ProductProps } from "./product-list";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const products : ProductProps[]= [
  // {
  //   id: "PD1",
  //   name: "Sản phẩm 1",
  //   imageUrl: "/homepage/explore/khampha1.png",
  //   oldPrice: 200000,
  //   price: 100000,
  // },
  // {
  //   id: "PD2",
  //   name: "Sản phẩm 1",
  //   imageUrl: "/homepage/explore/khampha2.png",
  //   oldPrice: 200000,
  //   price: 100000,
  // },
  // {
  //   id: "PD3",
  //   name: "Sản phẩm 1",
  //   imageUrl: "/homepage/explore/khampha3.png",
  //   oldPrice: 200000,
  //   price: 100000,
  // },
  // {
  //   id: "PD4",
  //   name: "Sản phẩm 1",
  //   imageUrl: "/homepage/explore/khampha4.png",
  //   oldPrice: 200000,
  //   price: 100000,
  // },
  // {
  //   id: "PD5",
  //   name: "Sản phẩm 1",
  //   imageUrl: "/homepage/explore/khampha5.png",
  //   oldPrice: 200000,
  //   price: 100000,
  // },
  // {
  //   id: "PD6",
  //   name: "Sản phẩm 1",
  //   imageUrl: "/homepage/explore/khampha6.png",
  //   oldPrice: 200000,
  //   price: 100000,
  // },
  // {
  //   id: "PD7",
  //   name: "Sản phẩm 1",
  //   imageUrl: "/homepage/explore/khampha1.png",
  //   oldPrice: 200000,
  //   price: 100000,
  // },
  // {
  //   id: "PD8",
  //   name: "Sản phẩm 1",
  //   imageUrl: "/homepage/explore/khampha2.png",
  //   oldPrice: 200000,
  //   price: 100000,
  // },
  // {
  //   id: "PD9",
  //   name: "Sản phẩm 1",
  //   imageUrl: "/homepage/explore/khampha3.png",
  //   oldPrice: 200000,
  //   price: 100000,
  // },
  // {
  //   id: "PD10",
  //   name: "Sản phẩm 1",
  //   imageUrl: "/homepage/explore/khampha3.png",
  //   oldPrice: 200000,
  //   price: 100000,
  // },
  // {
  //   id: "PD11",
  //   name: "Sản phẩm 1",
  //   imageUrl: "/homepage/explore/khampha3.png",
  //   oldPrice: 200000,
  //   price: 100000,
  // },
  // Add more products here
];

export default function DiscountedProducts() {
  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center">
        <Card className="">
          <CardHeader>
            <CardTitle className="text-center">
              Chưa Có Sản Phẩm Giảm Giá
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              Rất tiếc, hiện tại chưa có sản phẩm nào đang được giảm giá. Quý
              khách vui lòng quay lại sau để khám phá những ưu đãi hấp dẫn!
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="outline">Email tôi khi có giảm giá</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Hãy nhanh lên, trước khi quá muộn!</h1>
        <ProductList products={products} />
      </div>
    </>
  );
}
