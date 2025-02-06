import React from "react";
import styles from "./UserProfile.module.css";
import { ProfileHeader } from "./profile-header";
import Image from "next/image";

export default async function UserProfile() {
  return (
    <div className={`${styles.profileContainer}`}>
      <div className={styles.profileWrapper}>
        <div className={styles.boxheader}>
          <Image
            width={500}
            height={500}
            src="/profilebackground.png"
            alt="background"
            className={styles.headerImage}
          />
          <ProfileHeader />
        </div>
      </div>
    </div>
  );
}
