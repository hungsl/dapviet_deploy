import React from "react";
import styles from "./Footer.module.css";
import { SocialMediaProps } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SocialMediaIcon: React.FC<SocialMediaProps> = ({
  src,
  href,
}) => (
  <a href={href} className={styles.socialIconWrapper} target="_blank" rel="noopener noreferrer">
    <FontAwesomeIcon icon={src} size='xs' className={styles.socialIcon} />
  </a>
);
