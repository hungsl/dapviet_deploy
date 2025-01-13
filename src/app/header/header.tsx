import React from "react";
import { NAVIGATION_ITEMS } from "./constants";
import styles from "./header.module.css";
import { NavigationLinks } from "./navigation-link";
import SocialIcons from "./social-icons";
import Image from "next/image";
export const Headers: React.FC = async () => {
  return (
    <header className={`${styles.header} bg-background`}>
      <div className={styles.logo}>
        <Image priority width={200} height={200} src="/logo.png" alt="logo" className="logo" />
      </div>
      <div className={styles.navigationWrapper}>
        <div className={styles.navigationContainer}>
          <NavigationLinks
            items={NAVIGATION_ITEMS}
            className={styles.navLinks}
          />
          <div className={styles.activeIndicator} />
        </div>
        <SocialIcons />
      </div>
    </header>
  );
};
