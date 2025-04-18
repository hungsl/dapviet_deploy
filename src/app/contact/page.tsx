import React from "react";
import ContactForm from "./contact-form";
import styles from "./Contact.module.css";
import { ContactInfo } from "./contact-info";
import Image from "next/image";

const contactInfo = [
  { icon: "/about/EMAILcontact.png", text: "nextrad.dapviet@gmail.com" },
  { icon: "/about/phone.png", text: "0846 533 850" },
  {
    icon: "/about/location.png",
    text: "Đường D1, Đ. D1, Long Thạnh Mỹ, Thủ Đức, Hồ Chí Minh",
  },
];

export default function ContactPage() {
  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>Liên Hệ Với Chúng Tôi</h1>
        <h3 className={styles.description}>
          Cần giải đáp thắc mắc? Hãy gửi câu hỏi của bạn ngay cho chúng tôi!
        </h3>
      </div>
      <div className={styles.contactForm}>
        <div className={styles.formContainer}>
          <section className={styles.leftSection}>
            <h1 className={styles.formTitle}>
              Chúng tôi rất vui khi được nghe ý kiến của bạn.
            </h1>
            <div className={styles.contactInfoContainer}>
              {contactInfo.map((info, index) => (
                <ContactInfo key={index} {...info} />
              ))}
            </div>
            {/* Thêm icon mạng xã hội */}
            <div className={styles.socialIcons}>
              <a
                href="https://www.facebook.com/DongQuanTram.HongNhienVu?mibextid=kFxxJD"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
              >
                <Image width={100} height={100} className={styles.facebookIcon} src="/login/facebook.png" alt="Facebook" />
              </a>

              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
              >
                <Image width={100} height={100} className={styles.titokIcon}  src="/login/TikTokIcon.png" alt="TikTok" />
              </a>
            </div>
          </section>
          <ContactForm />
          {/* form section ơ day */}
        </div>
      </div>
    </>
  );
}
