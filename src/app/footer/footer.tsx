import React from "react";
import styles from "./Footer.module.css";
import { FooterSection } from "./footer-section";
import { SocialMediaIcon } from "./social-media-icon";
import FooterRight from "./footer-copyright";
import Image from "next/image";

export const Footer: React.FC = () => {
  const socialMedia = [
    {
      src: "/homepage/benefit-login/facebook.png",
      alt: "Facebook",
    },
    {
      src: "/homepage/footer/iconyoutube.png",
      alt: "YouTube",
    },
    {
      src: "/homepage/footer/iconTiktok.png",
      alt: "Social Media Icon",
    },
  ];

  const aboutLinks = [
    { text: "Thông tin" , address: "/about-us#contactInfo"},
    { text: "Địa chỉ", className: styles.workAddress , address: "/about-us#contactInfo" },
    { text: "Liên lạc", className: styles.contact , address: "/about-us#contactInfo"},
  ];

  const helpLinks = [
    { text: "Hỏi Đáp" , address: "/about-us#question"},
    { text: "Giao hàng", className: styles.delivery , address: "/about-us#question"},
    { text: "Thanh toán", className: styles.payment  , address: "/about-us#question"},
    { text: "Hoàn trả", className: styles.returns , address: "/about-us#question" },
  ];

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerColumns}>
            <div className={styles.brandColumn}>
              <div className={styles.brandInfo}>
                <div className={styles.brandLogo}>
                  <Image width={100} height={100} src="/logo.png" alt="logo" className="logo" />
                </div>
              </div>
            </div>

            <FooterSection title="Giới thiệu" links={aboutLinks}/>
            <FooterSection title="Trợ Giúp" links={helpLinks} />

            <div className={styles.socialColumn}>
              <div className={styles.socialContent}>
                <div className={styles.socialContainer}>
                  <div className={styles.followUs}>Cập nhật tin tức</div>
                  <div className={styles.socialIcons}>
                    {socialMedia.map((social, index) => (
                      <SocialMediaIcon key={index} {...social} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.footerBottom}>
            {/* <Link href="/" className={styles.guide}>Hướng dẫn</Link>
            <Link href="/" className={styles.terms}>Điều khoản và điều khoản</Link>
            <Link href="/" className={styles.privacy}>Chính sách bảo mật</Link> */}
          </div>
        </div>
      <FooterRight />
      </footer>
    </>
  );
};
