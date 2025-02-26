import React from "react";
import styles from "./ProductDetail.module.css";
import { DeliveryOption } from "./delivery-option";
// import { CarouselProductView } from "./Carousel";
import SizeButton from "./_component/size-button";
import { formatCurrency } from "@/lib/utils";
import { ProductDataType } from "@/schemaValidations/product.schema";
import { RxCross1 } from "react-icons/rx";
import { IoMdCheckmark } from "react-icons/io";
import Thumbnail from "./thumbnails";

export default async function ProductDetail({
  data,
}: {
  data: ProductDataType;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <section className={styles.productImageSection}>
          <div className={styles.imageContainer}>
            {/* <CarouselProductView imgList={data.pictures} /> */}
            <Thumbnail images={data.pictures} />
          </div>
          <div className={styles.descriptionContainer}>
            <div className={styles.descriptionHeader}>
              <h2 className={styles.descriptionTitle}>Mô Tả Sản Phẩm</h2>
              <div className={styles.divider} />
            </div>
            <p className={styles.descriptionText}>{data.description}</p>
          </div>
        </section>

        <section className={styles.productDetailsSection}>
          <div className={styles.productInfo}>
            <h1 className={styles.productTitle}>{data.name}</h1>
            <div className={styles.priceContainer}>
              {/* <span className={styles.originalPrice}>100.000 VND</span> */}
              <span className={styles.salePrice}>
                {formatCurrency(data.unitPrice)}
              </span>
              <div className={styles.stockStatus}>
                {data.status === "IN_STOCK" ? (
                  <>
                    {/* <Image
                      width={300}
                      height={300}
                      priority
                      src="/productDetail/tick.png"
                      alt="Còn hàng"
                      className={styles.stockIcon}
                    /> */}
                    <IoMdCheckmark className={styles.checkmark} size={20} />
                    <span>Còn hàng</span>
                  </>
                ) : (
                  <>
                    {/* <Image
                      width={300}
                      priority
                      height={300}
                      src="/productDetail/outstock.png"
                      alt="Hết hàng"
                      className={styles.stockIcon}
                    /> */}
                    <RxCross1 className={styles.cross} size={20} />
                    <span>Hết hàng</span>
                  </>
                )}
              </div>
            </div>

            <SizeButton sizeQuantities={data.sizeQuantities} />

            <div className={styles.deliveryOptions}>
              <DeliveryOption
                icon="/productDetail/house.png"
                text="Giao hàng tận nơi"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
