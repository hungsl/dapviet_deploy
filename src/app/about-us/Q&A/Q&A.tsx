import * as React from "react";
import styles from "./Q&A.module.css";
import { FAQItem } from "./Q&A-item";
import { faqItems, contactInfo } from "./data";
import { ContactInfo } from "./contact-info";
import Image from "next/image";

export const QuestionAndAnswer: React.FC = () => {
  return (
    <div>
      <Image
        loading="lazy"
        width={1000}
        height={500}
        quality={100}
        src="/about/trang phucvv.jpg"
        alt="Hero banner"
        className={styles.heroImage}
      />
      <div className={styles.container}  id="question">
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <h1 className={styles.title}>
              Câu Hỏi Thường Gặp về Mua Sắm Việt Phục
            </h1>
            <div className={`${styles.faqSection}`}>
              <div className={styles.verticalLine} />
              <div className={styles.faqList}>
                <div className={styles.faqItems}>
                  {faqItems.map((item, index) => (
                    <FAQItem key={index} item={item} />
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.contactSection} id="contactInfo">
              {contactInfo.map((info, index) => (
                <ContactInfo key={index} info={info} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
