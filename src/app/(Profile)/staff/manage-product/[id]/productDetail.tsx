"use client";
import React, { useEffect, useState } from "react";
import styles from "./ProductDetail.module.css";
import CarouselProductDetail from "./Carousel";
import Link from "next/link";
import ButtonEdit from "./ButtonEdit";
import productApiRequest from "@/apiRequests/product";
import { ProductResType } from "@/schemaValidations/product.schema";
import { formatCurrency } from "@/lib/utils";
import { useAppContext } from "@/app/context/app-provider";

export function ProductDetail({ productId }: { productId: string }) {
  const { isRefresh } = useAppContext();
  const [data, setData] = useState<ProductResType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (productId) {
      const fetchData = async () => {
        try {
          const result = await productApiRequest.productStaff(productId);
          // console.log("productdetail: ", result);
          setData(result.payload);
        } catch (error) {
          console.log("lỗi lấy sản phẩm : ", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [productId, isRefresh]);
  if (loading && !data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div className={styles.productContainer}>
      <Link
        href={"/staff/manage-product"}
        className="flex items-center space-x-2 text-blue-500 hover:text-blue-700 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span>Trở lại danh sách</span>
      </Link>
      <div className={styles.productHeader}>
        <h1 className={styles.productName}>{data?.data.name}</h1>
        <div className={`${styles.productImage}`}>
          <CarouselProductDetail productsImg={data?.data.pictures || []} />
        </div>
      </div>
      <div className={styles.flexColum}>
        <div className={styles.productInfo}>
          <div className={styles.productStatus}>
            <p>
              <strong>Trạng thái:</strong> {data?.data.status}
            </p>
          </div>
          <div className={styles.productQuantity}>
            <p>
              {/* <strong>Số lượng trong kho:</strong> {data.data.quantity} */}
            </p>
          </div>

          <div className={styles.productAttributes}>
            <div className={styles.sizes}>
              <strong>Kích cỡ:</strong>
              <ul>
                {data &&
                  Object.entries(data.data.sizeQuantities).map(
                    ([key, value]) => (
                      <li className={styles.box} key={key}>
                        {`${value.size}: x${value.quantity}`}
                      </li>
                    )
                  )}
              </ul>
            </div>

            <div className={`flex justify-between ${styles.colors} mt-4`}>
              <div>
                <strong>Type</strong>
                <ul>{data?.data.typeName && <li>{data?.data.typeName}</li>}</ul>
              </div>
              <div>
                <strong>Collection</strong>
                <ul>
                  {data?.data.collectionName && (
                    <li>{data.data.collectionName}</li>
                  )}
                </ul>
              </div>
            </div>
            <div className="mt-4"></div>
            <div className={styles.productPrice}>
              <h2>{formatCurrency(data?.data.unitPrice)}</h2>
            </div>
          </div>
        </div>
        {/* Thêm phần mô tả bên cạnh */}
        <div className={`${styles.productDescription}`}>
          <p>
            <strong>Mô tả sản phẩm:</strong>
          </p>
          <p className={styles.description}>{data?.data.description}</p>
          <ButtonEdit productId={data?.data.id || ""} />
        </div>
      </div>
    </div>
  );
}
