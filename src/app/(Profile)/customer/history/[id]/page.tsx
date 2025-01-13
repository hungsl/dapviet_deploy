import React from "react";
import styles from "../RatingPage.module.css";
import Link from "next/link";
import FeedbackForm from "./feedback-form";

export default async  function CreateFeedbackForm({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = await params;
  //   let product;
  // try {
  //   const result = await productApiRequest.product(
  //     unwrappedParams.id,
  //   );
  //   // console.log("productdetail: ", result);
  //   product = result.payload.data;
  // } catch (error) {
  //   redirect("/homepage");
  // }
  return (
    <>
      <div className={styles.container}>
        <Link
          href={"/customer/history"}
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
        <h1 className="text-2xl font-bold text-center my-4">Đánh giá sản phẩm</h1>
        <div className={styles.productInfo}>
          <img src="/productDetail/relevant.png" alt="Sản phẩm" />
          <div className={styles.productDetails}>
            <h2 className={styles.productName}>
              Áo Sơ Mi Việt Phục
            </h2>
            <p className={styles.productDescription}>
              Áo sơ mi truyền thống, chất liệu vải cotton cao cấp, mềm mại,
              thoáng mát, phù hợp với mọi dịp lễ hội. Áo sơ mi truyền thống,
              chất liệu vải cotton cao cấp, mềm mại, thoáng mát, phù hợp với mọi
              dịp lễ hội. Áo sơ mi truyền thống, chất liệu vải cotton cao cấp,
              mềm mại, thoáng mát, phù hợp với mọi dịp lễ hội.
            </p>
          </div>
        </div>
        <FeedbackForm id ={unwrappedParams.id}/>
        <p className="text-gray-600 mt-2 flex justify-center text-sm">
          Sự đánh giá của bạn, góp phần giúp chúng tôi cải thiện và mang đến
          những sản phẩm và dịch vụ tốt hơn cho bạn.
        </p>
      </div>
    </>
  );
}
