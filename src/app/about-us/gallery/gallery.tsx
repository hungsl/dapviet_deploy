import React from 'react';
import styles from './Gallery.module.css';
import { GalleryColumn } from './gallery-column';

const leftColumnImages = [
  {
    src: "/about/imgleff.png",
    alt: "Traditional Vietnamese dress showcase",
    className: styles.imageTopLeft
  },
  {
    src: "/about/leftxanh.png",
    alt: "Vietnamese cultural attire display",
    className: styles.imageBottomLeft
  },
  {
    src: "/about/lefttrang.png",
    alt: "Heritage clothing exhibition",
    className: styles.imageBottomCenter
  }
];

const rightColumnImages = [
  {
    src: "/about/camright.png",
    alt: "Modern Vietnamese fashion",
    className: styles.imageTopRight
  },
  {
    src: "/about/rightxanh.png",
    alt: "Contemporary Vietnamese design",
    className: styles.imageBottomRight
  }
];

export default function Gallery() {
  return (
    <div className={styles.galleryWrapper}>
      <div className={styles.mainContainer}>
        <div className={styles.contentWrapper}>
          <div className={styles.galleryGrid}>
            <div className={styles.galleryColumn}>
              <div className={styles.imageContainer}>
                <div className={styles.imageGrid}>
                  <div className={styles.leftColumn}>
                    <GalleryColumn images={leftColumnImages} />
                  </div>
                  <div className={styles.rightColumn}>
                    <GalleryColumn images={rightColumnImages} />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.galleryColumn}>
              <div className={styles.textContent}>
                <h1 className={styles.title}>Đắp Việt</h1>
                <div className={styles.divider} />
                <p className={styles.description}>
                  Nơi hội tụ tinh hoa văn hóa và nghệ thuật Việt Nam thông qua
                  những bộ Việt Phục truyền thống.
                  <br />
                  <br />
                  Chúng tôi tự hào là cầu nối giữa quá khứ và hiện tại, mang
                  đến cho bạn không chỉ những bộ trang phục đẹp mắt mà còn là
                  hành trình khám phá lịch sử, văn hóa, và bản sắc dân tộc.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};