import React from "react";
import styles from "./Auth.module.css";
import { BenefitItem } from "./benefit-item";
import ButtonType from "./button";
import { cookies } from "next/headers";

const benefits = [
  {
    text: "Nhận Quà Tặng Đặc Biệt Dành Riêng Cho Bạn.",
  },
  {
    text: "Ưu Đãi Hấp Dẫn Khi Mua Sắm Việt Phục.",
  },
];

export default async function AuthSection() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  if (accessToken) {
    return;
  }
  return (
    <div className="mt-20">
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <div className={styles.leftColumn}>
              <div className={styles.titleSection}>
                <div className={styles.heading}>
                  <h1 className={styles.title}>Đăng Ký Ngay!</h1>
                  <div className={styles.benefitsContainer}>
                    {benefits.map((benefit, index) => (
                      <BenefitItem key={index} {...benefit} />
                    ))}
                  </div>
                </div>
                <div className={styles.divider} />
              </div>
            </div>
            <div className={styles.rightColumn}>
              <div className={styles.authContainer}>
                <div className={styles.buttonGroup}>
                  <ButtonType type="login" />
                  <ButtonType type="register" />
                </div>
                <div className={styles.separator}>
                  <div className={styles.separatorLine} />
                  <div className={styles.separatorText}>Hoặc</div>
                  <div className={styles.separatorLine} />
                </div>
                <div className={styles.socialAuth}>
                  <ButtonType type="google" />
                  <ButtonType type="facebook" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
