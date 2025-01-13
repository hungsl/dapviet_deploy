import React from "react";
import ProductReviews from "../feedback-product/product-reviews";
import Reviews from "../reviews-feedback/reivews";
import { ProductGridContainer } from "../product-relevant";
import ProductDetail from "../view-detail/product-detail";
import { Separator } from "@/components/ui/separator";
import productApiRequest from "@/apiRequests/product";
import { ProductDataType } from "@/schemaValidations/product.schema";
import { cache } from "react";

import type { Metadata, ResolvingMetadata } from "next";
import envConfig from "@/config";

const getDetail = cache(productApiRequest.product);
type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params, searchParams }: Props, // eslint-disable-line @typescript-eslint/no-unused-vars
  parent: ResolvingMetadata // eslint-disable-line @typescript-eslint/no-unused-vars
): Promise<Metadata> {
  const id = (await params).id;
  const result = await getDetail(id);
  const product = result.payload.data;
  const url = envConfig.NEXT_PUBLIC_URL + "/product-detail/" + product.id;
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      url,
      siteName: "Đắp Việt",
      images: [
        {
          url: product.pictures[0], // Must be an absolute URL
          width: 800,
          height: 600,
        },
      ],
      locale: "vi_VN",
      type: "article",
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ProductDetailPage({
  params,
  searchParams, // eslint-disable-line @typescript-eslint/no-unused-vars
}: Props) {
  const unwrappedParams = await params;
  let data: ProductDataType | null = null;
  try {
    const result = await getDetail(unwrappedParams.id);
    // console.log("productdetail: ", result);
    data = result.payload.data;
  } catch (error) {
    console.log("Lỗi khi lấy chi tiết sản phẩm: ", error);
    // redirect("/homepage");
  }
  if (!data)
    return (
      <div className="flex justify-center items-center h-screen flex-col relative">
        <div className="absolute">Loading</div>
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
      </div>
    );
  return (
    <div>
      <ProductDetail data={data} />
      <Separator className="mt-20" />
      <ProductReviews />
      <Reviews />
      <Separator className="mt-20" />
      <ProductGridContainer data={data} />
    </div>
  );
}
