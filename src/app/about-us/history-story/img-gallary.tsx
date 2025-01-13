import React from 'react';
import styles from './VietnamDress.module.css';
import { HistoricalImageProps } from '../types';
import Image from 'next/image';

export const ImageGallery: React.FC<HistoricalImageProps> = ({ images }) => {
  return (
    <div className={styles.imageGallery}>
      {images.map((image, index) => (
        <Image
          width={500}
          height={500}
          key={index}
          loading="lazy"
          quality={100}
          src={image.src}
          alt={image.alt}
          className={styles.historicalImage}
        />
      ))}
    </div>
  );
};