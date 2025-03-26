import React from "react";
import styles from "./Footer.module.css";
import { FooterSection } from "./footer-section";
import { SocialMediaIcon } from "./social-media-icon";
import FooterRight from "./footer-copyright";
import Image from "next/image";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faTiktok } from "@fortawesome/free-brands-svg-icons";

export const Footer: React.FC = () => {
  const socialMedia = [
    {
      src: faFacebook,
      href: "https://www.facebook.com/DongQuanTram.HongNhienVu?mibextid=kFxxJD",
    },
    {
      src: faYoutube,
      href: "https://www.youtube.com/",
    },
    {
      src: faTiktok,
      href: "https://www.tiktok.com/@elysian.raiment?_t=ZS-8t240NGgHWq&_r=1",
    },
  ];

  const aboutLinks = [
    { text: "Thông tin", address: "/gioi-thieu#contactInfo" },
    {
      text: "Địa chỉ",
      className: styles.workAddress,
      address: "/gioi-thieu#contactInfo",
    },
    {
      text: "Liên lạc",
      className: styles.contact,
      address: "/gioi-thieu#contactInfo",
    },
  ];

  const helpLinks = [
    { text: "Hỏi Đáp", address: "/gioi-thieu#question" },
    {
      text: "Giao hàng",
      className: styles.delivery,
      address: "/gioi-thieu#question",
    },
    {
      text: "Thanh toán",
      className: styles.payment,
      address: "/gioi-thieu#question",
    },
    {
      text: "Hoàn trả",
      className: styles.returns,
      address: "/gioi-thieu#question",
    },
  ];

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerColumns}>
            <div className={styles.brandColumn}>
              <div className={styles.brandInfo}>
                <div className={styles.brandLogo}>
                  <Image
                    width={100}
                    height={100}
                    src="/logo.png"
                    alt="logo"
                    className="logo"
                  />
                </div>
              </div>
            </div>

            <FooterSection title="Giới thiệu" links={aboutLinks} />
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
