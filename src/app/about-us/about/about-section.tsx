import React from "react";
import styles from "./About.module.css";
import { AboutSectionProps } from "../types";
import { AboutContent } from "./about-content";
import Image from "next/image";

export const AboutSection: React.FC<AboutSectionProps> = ({
  content,
  tagline,
  imageSrc,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.background}>
          <div className={`${styles.contentWrapper} bg-accent`}>
            <div className={`${styles.grid} `}>
              <div className={`${styles.textColumn} text-accent-foreground`}>
                {content.map((item, index) => (
                  <AboutContent
                    key={index}
                    title={item.title}
                    description={item.description}
                  />
                ))}
                <p className={styles.tagline}>{tagline}</p>
              </div>
              <div className={styles.imageColumn}>
                <Image
                  width={500}
                  height={500}
                  quality={100}
                  loading="lazy"
                  src={imageSrc}
                  alt="Traditional Vietnamese clothing showcase"
                  className={styles.image}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
