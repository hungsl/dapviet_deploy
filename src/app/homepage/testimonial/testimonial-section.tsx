import * as React from "react";
import { Carousel } from "./Carousel";

const testimonials = [
  {
    imageSrc:
      "/homepage/feedbackimg.png",
    productName: "Essence Long Denim",
    userName: "Lisa",
    review:
      "I like this pants. Its fit and perfect for me. The material is so comfortable that it can be used anywhere. It is also suitable to be combined with all types of my clothes.",
  },
  {
    imageSrc:
      "/homepage/feedbackimg.png",
    productName: "Classic White Tee",
    userName: "John",
    review:
      "This shirt is a wardrobe staple. It feels soft and the quality is outstanding. I wear it almost daily!",
  },
  {
    imageSrc:
      "/homepage/feedback2img.png",
    productName: "Sporty Joggers",
    userName: "Emma",
    review:
      "These joggers are perfect for my morning workouts. Lightweight, breathable, and stylish.",
  },
  {
    imageSrc:
      "/homepage/feedbackimg.png",
    productName: "Leather Backpack",
    userName: "Sophia",
    review:
      "This backpack is both functional and fashionable. Great for work and travel.",
  },
  {
    imageSrc:
      "/homepage/feedback2img.png",
    productName: "Sneakers Max",
    userName: "Michael",
    review: "Comfortable and stylish sneakers. They pair well with any outfit.",
  },
  {
    imageSrc:
      "/homepage/feedbackimg.png",
    productName: "Winter Coat",
    userName: "Emily",
    review: "Warm and cozy! Perfect for the winter season.",
  },
];

export function TestimonialSection() {
  return (
    <>
      {" "}
      <div className="mt-16 text-5xl font-semibold text-center max-md:mt-10 max-md:max-w-full max-md:text-4xl mb-20">
        Cảm Nhận Của Khách Hàng
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-6 py-6 bg-sky-50  w-[85%] pl-14 rounded-md">
          <Carousel testimonials={testimonials} />
        </div>
      </div>
    </>
  );
}
