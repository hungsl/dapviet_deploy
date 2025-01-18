import React from "react";
import styles from "./Footer.module.css";
import { SocialMediaProps } from "./types";


export const SocialMediaIcon: React.FC<SocialMediaProps> = ({
  src,
  alt,
  href,
}) => (
  <a href={href} className={styles.socialIconWrapper} target="_blank" rel="noopener noreferrer">
    <img loading="lazy" src={src} className={styles.socialIcon} alt={alt} />
  </a>
);
