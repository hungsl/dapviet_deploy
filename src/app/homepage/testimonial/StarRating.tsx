import * as React from "react";
import { StarRatingProps } from "./types";

export function StarRating({ count }: StarRatingProps) {
  return (
    <div className="flex gap-1 items-start mt-2.5 min-h-[15px] w-[91px]">
      {Array.from({ length: count }).map((_, index) => (
        <img
          key={index}
          loading="lazy"
          src="/productDetail/star.png"
          alt=""
          className="object-contain shrink-0 aspect-square w-[15px]"
        />
      ))}
    </div>
  );
}