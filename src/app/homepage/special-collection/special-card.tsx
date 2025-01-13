import React from "react";
import styles from "./FestivalCard.module.css";
import { FestivalCardProps } from "./types";

export const FestivalCard: React.FC<FestivalCardProps> = ({
  imageSrc,
  iconSrc,
  title,
  description,
}) => {
  return (
    <div className={styles.cardWrapper}>
      <img
        loading="lazy"
        src={imageSrc}
        className={styles.backgroundImage}
        alt="Festival clothing collection background"
      />
      <div className={styles.contentBox}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>

      <div className={styles.iconWrapper}>
        <img loading="lazy" src={iconSrc} className={styles.icon} alt="" />
      </div>
    </div>
  );
};
