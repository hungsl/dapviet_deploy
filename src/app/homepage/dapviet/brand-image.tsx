import React from 'react';
import { ImageProps } from '../types';
import Image from 'next/image';

export const BrandImage: React.FC<ImageProps> = ({ src, alt, className }) => (
  <Image
    width={1000}
    height={500}
    quality={100}
    src={src}
    alt={alt}
    priority
    className={className}
  />
);