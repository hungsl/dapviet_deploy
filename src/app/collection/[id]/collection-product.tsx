"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./ListCollectionItem.css";
import { BsDot } from "react-icons/bs";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { ProductList } from "../type";

interface CollectionProductProps {
  products: ProductList;
}
export default function CollectionProduct({ products }: CollectionProductProps) {
  // const images = [
  //   "https://aekqgmlegdfbpjvohkqg.supabase.co/storage/v1/object/public/hung-pics/078074bc-b755-4bf6-a0cf-38324478e2f7.jpeg",
  //   "https://aekqgmlegdfbpjvohkqg.supabase.co/storage/v1/object/public/hung-pics/efc91c3d-cf06-4a43-9f32-2fd320d3dc97.jpeg",
  //   "https://aekqgmlegdfbpjvohkqg.supabase.co/storage/v1/object/public/hung-pics/ed518589-2885-400e-a0fc-53e83d6ec648.png",
  //   "https://aekqgmlegdfbpjvohkqg.supabase.co/storage/v1/object/public/hung-pics/ec5e7bb8-3661-438e-94a0-bb26e99711be.png",
  //   "https://aekqgmlegdfbpjvohkqg.supabase.co/storage/v1/object/public/hung-pics/b1976b41-73d4-4ead-ae6f-3b57bdf1554f.jpeg",
  //   "https://aekqgmlegdfbpjvohkqg.supabase.co/storage/v1/object/public/hung-pics/078074bc-b755-4bf6-a0cf-38324478e2f7.jpeg",
  //   "https://aekqgmlegdfbpjvohkqg.supabase.co/storage/v1/object/public/hung-pics/078074bc-b755-4bf6-a0cf-38324478e2f7.jpeg",
  // ];
  return (
    <div className="containersss">
      <h1 className="headingss">Sự Kết Hợp Hoàn Hảo</h1>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        {products.map((product, index) => (
          <SwiperSlide className="card" key={index}>
            <Link href="product-detail">
              <img src={product.picture} alt={`slide_image_${index}`} />
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price text-red-500">{formatCurrency(product.unitPrice)}</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}

        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <BsDot />
          </div>
          <div className="swiper-button-next slider-arrow">
            <BsDot />
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>
  );
}
