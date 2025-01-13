import React from "react";
import styles from "@/app/(authen)/authen-style.module.css"
import RegisterPopup from "./register-popup";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Đăng ký Đắp Việt",
};
export default function RegisterPage() {
  return (
    <div className = {styles.bodyLogin}>
      <RegisterPopup/>
    </div>
  );
}
