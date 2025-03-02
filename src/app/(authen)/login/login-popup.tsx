import React from "react";
import styles from "@/app/(authen)/authen-style.module.css";
import LoginForm from "./login-form";
import Image from "next/image";
import { Suspense } from "react";
export default function LoginPopup() {
  return (
    <div className={`${styles.loginPage} bg-background`}>
      <div className={styles.contentWrapper}>
        <div className={styles.loginSection}>
          <div className={styles.brandSection}>
            <div className={styles.logoContainer}>
              <Image
                width={300}
                height={300}
                priority
                src="/login/Vector.png"
                alt="Viet Phuc Logo"
                className={styles.logo}
              />
            </div>
              <div className={styles.brandContent}>
                <h1 className={styles.brandTitle}>
                  <a href="/trang-chu" className={styles.link}>
                    Đắp Việt
                  </a>
                </h1>
                <p className={styles.brandDescription}>
                  Nơi lưu giữ nét đẹp dân tộc, hân hạnh đón bạn
                </p>
            </div>
          </div>

          <div className={styles.boxLoginForm}>
            <Suspense fallback={<div>Loading...</div>}>
              <LoginForm />
            </Suspense>
          </div>
        </div>
        <div className={styles.imageSection}>
          <div className={styles.imageWrapper}>
            <Image
              width={500}
              height={500}
              quality={100}
              priority
              src="/login/vietphuclogin.jpg"
              alt="Traditional Vietnamese clothing showcase"
              className={styles.showcaseImage}
            />
            <div className={styles.imageOverlay} />
          </div>
        </div>
      </div>
    </div>
  );
}
