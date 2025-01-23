import React from "react";
import { ProductDetail } from "./productDetail";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = await params;

  return (
    <>
      <ProductDetail productId={unwrappedParams.id}/>
    </>
  );
}
