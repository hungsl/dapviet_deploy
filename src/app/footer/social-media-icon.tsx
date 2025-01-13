"use client";
import React from "react";
import styles from "./Footer.module.css";
import { SocialMediaProps } from "./types";

const handleMoveMedia = () => {};

export const SocialMediaIcon: React.FC<SocialMediaProps> = ({
  src,
  alt,
  href,
}) => (
  <a href={href} className={styles.socialIconWrapper} onClick={handleMoveMedia}>
    <img loading="lazy" src={src} className={styles.socialIcon} alt={alt} />
  </a>
);
