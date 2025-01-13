import React from "react";
import styles from "@/app/(authen)/authen-style.module.css";
import LoginPopup from "./login-popup";
import { Metadata } from "next";
// import { auth } from "@/auth";
// import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Đăng nhập Đắp Việt",
};
export default async function LoginPage() {
  //  const accountGoogle = await auth();
  //  if(accountGoogle){
  //   redirect("/homepage");
  //  }
  return (
    <div className = {styles.bodyLogin}>
      <LoginPopup />
    </div>
  );
}
