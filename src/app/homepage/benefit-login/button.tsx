"use client";
import React from "react";
import { AuthButton } from "./AuthButton";
import { useRouter } from "next/navigation";

export default function ButtonType({ type }: { type: string }) {
  const router = useRouter();

  const handleNavigate = () => {
    if (type === "login") {
      router.push("/login");
    } else if (type === "register") {
      router.push("/register");
    } else if(type === "google"){
      router.push("/"); 
    } else{
        router.push("/");
    }
  };
  return (
    <>
      {type === "login" ? (
        <AuthButton onAction={handleNavigate}>Đăng nhập</AuthButton>
      ) : type === "register" ? (
        <AuthButton onAction={handleNavigate}>Đăng ký</AuthButton>
      ) : type === "google" ? (
        <AuthButton  onAction={handleNavigate} icon="/homepage/benefit-login/gogleicon.png">
          Đăng ký bằng tài khoản GOOGLE
        </AuthButton>
      ) : (
        <AuthButton onAction={handleNavigate} icon="/homepage/benefit-login/facebook.png">
          Đăng ký bằng tài khoản FACEBOOK
        </AuthButton>
      )}
    </>
  );
}
