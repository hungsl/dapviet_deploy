import React from "react";
import styles from "./Gallery.module.css";
import { GalleryColumn } from "./gallery-column";

const leftColumnImages = [
  {
    src: "/about/imgleff.png",
    alt: "Traditional Vietnamese dress showcase",
    className: styles.imageTopLeft,
  },
  {
    src: "/about/leftxanh.png",
    alt: "Vietnamese cultural attire display",
    className: styles.imageBottomLeft,
  },
  {
    src: "/about/lefttrang.png",
    alt: "Heritage clothing exhibition",
    className: styles.imageBottomCenter,
  },
];

const rightColumnImages = [
  {
    src: "/about/camright.png",
    alt: "Modern Vietnamese fashion",
    className: styles.imageTopRight,
  },
  {
    src: "/about/rightxanh.png",
    alt: "Contemporary Vietnamese design",
    className: styles.imageBottomRight,
  },
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
                  Áo tấc cách tân - Gói hồn xưa trong dáng hình hiện đại
                  <br />
                  <br />
                  Đắp Việt - Tự hào mang đến những thiết kế Việt phục cách tân,
                  nơi thinh hoa truyền thống hòa quyện cùng hơi thở của thời đại
                  mới. Một lựa chọn hoàn hảo cho lễ hội, sự kiện trọng đại hay
                  đơn giản là những khoảnh khắc đời thường đầy phong cách
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
