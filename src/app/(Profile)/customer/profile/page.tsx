import React from "react";
import styles from "./UserProfile.module.css";
import { ProfileHeader } from "./profile-header";
import Image from "next/image";

export default async function UserProfile() {
  return (
    <div className={`${styles.profileContainer}`}>
      <div className={styles.profileWrapper}>
        <Image
          width={500}
          height={500}
          priority 
          src="/profilebackground.png"
          alt=""
          className={styles.headerImage}
        />
        <ProfileHeader />
      </div>
    </div>
  );
}
