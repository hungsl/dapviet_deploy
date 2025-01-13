"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { usePopup } from "../context/popup-provider";

export default function AuthenButton() {
  const { openPopup, setContent } = usePopup();
  const handleOpenLogin = () => {
    setContent('login');
    openPopup();
  };
  const handleOpenRegister = () => {
    setContent('register');
    openPopup();
  };
  return (
    <div>
      <Button onClick={handleOpenRegister} variant="outline" style={{marginRight: '15px'}} >Đăng ký</Button>
      <Button onClick={handleOpenLogin}  variant="outline">Đăng nhập</Button>
    </div>
  );
}
