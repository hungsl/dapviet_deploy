import React from "react";
import { GalleryImageProps } from "../types";
import Image from "next/image";

export const GalleryImage: React.FC<GalleryImageProps> = ({
  src,
  alt,
  className,
}) => {
  return (
    <Image
      width={500}
      height={500}
      loading="lazy"
      src={src}
      alt={alt}
      className={className}
    />
  );
};
