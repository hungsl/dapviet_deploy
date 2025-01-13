import React from 'react';
import { GalleryColumnProps } from '../types';
import styles from './Gallery.module.css';
import { GalleryImage } from './gallery-image';

export const GalleryColumn: React.FC<GalleryColumnProps> = ({ images }) => {
  return (
    <div className={styles.galleryColumn}>
      {images.map((image, index) => (
        <GalleryImage
          key={index}
          src={image.src}
          alt={image.alt}
          className={image.className}
        />
      ))}
    </div>
  );
};