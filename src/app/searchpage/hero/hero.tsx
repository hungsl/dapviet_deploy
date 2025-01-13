import React from "react";
import styles from "./Hero.module.css";
import { HeroProps } from "../types";
import { HeroContent } from "./hero-content";
import Image from "next/image";

export const Hero: React.FC<HeroProps> = ({ backgroundImageUrl, content }) => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroOverlay}></div>
      <Image
        width={1000}
        height={1000}
        quality={75}
        priority
        src={backgroundImageUrl}
        className={styles.backgroundImage}
        alt=""
      />
      <HeroContent title={content.title} description={content.description} />
    </section>
  );
};
