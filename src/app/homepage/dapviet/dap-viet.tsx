import React from "react";
import styles from "./DapViet.module.css";
import { BrandDescription } from "./brand-description";
import { BrandImage } from "./brand-image";
import Image from "next/image";

export default function DapViet() {
  return (
    <div className={styles.container}>
       <Image
          src="/homepage/background.png"
          width={1000}
          height={1000}
          quality={100}
          alt="trang-chu"
          className={styles.backgroundImage}
        />
      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <div className={styles.imageGroup}>
            <div className={styles.mainImageWrapper}>
              <BrandImage
                // src="/homepage/aotrang.png"
                src="/homepage/hac2.png"
                alt="Traditional Vietnamese clothing showcase"
                className={styles.mainImage}
              />
            </div>
            <div className={styles.sideImageWrapper}>
              <BrandImage
                // src="/homepage/aoxanh2.png"
                src="/homepage/hac.png"
                alt="Vietnamese fashion detail"
                className={styles.sideImage}
              />
            </div>
          </div>
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.brandSection}>
            <div className={styles.brandContainer}>
              <div className={styles.brandContentWrapper}>
                <BrandDescription
                  title="Đắp Việt"
                  subtitle="Tinh Hoa Trang Phục Việt"
                  description1="Gìn giữ văn hóa, lan tỏa phong cách Việt trong từng bộ trang phục."
                  description2="Trang phục Việt - Tinh hoa từ đôi tay, vẻ đẹp dành riêng cho bạn."
                />
              </div>
              <div className={styles.decorativeImageWrapper}>
                {/* <BrandImage
                  // src="/homepage/aovang1.png"
                  src="/homepage/aovang1.png"
                  alt="Decorative Vietnamese pattern"
                  className={styles.decorativeImage}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
