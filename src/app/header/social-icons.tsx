"use client";
import React, { useEffect, useState } from "react";
import styles from "./header.module.css";
import UserDropdown from "./user-icon";
import CartIcon from "./cart-icon";
import { ModeToggle } from "@/components/mode-toggle";
import AuthenButton from "../homepage/authen-button";
import { useAppContext } from "../context/app-provider";
// import LoadingAnimation from "@/components/common/LoadingAnimation";
import NotificationView from "./notification/notification";

export type HeaderProps = {
  accountGoogle: any; 
};
// const NotificationView = dynamic(() => import('./notification/notification'), { ssr: false })

export default function SocialIcons() {
  const { isLoggedIn, setIsLoggedIn } = useAppContext();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setLoading(false)
  }, [setIsLoggedIn]);
  if (loading) {
    return <div className={`w-[170px] ${styles.socialContainer}`}></div>; 
  }
  return (
    <>
      {isLoggedIn ? (
        <div className={styles.socialContainer}>
          <NotificationView />
          <CartIcon />
          <UserDropdown />
          <ModeToggle />
        </div>
      ) : (
        <AuthenButton />
      )}
    </>
  );
}
