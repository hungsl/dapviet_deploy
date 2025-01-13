"use client";
import React, { useEffect, useState } from "react";
import { HeaderProps } from "./social-icons";
import authApiRequest from "@/apiRequests/auth";
import { toast } from "@/hooks/use-toast";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAppContext } from "../context/app-provider";
import LoadingAnimation from "@/components/common/LoadingAnimation";

export default function UeGoogleLogin({ accountGoogle }: HeaderProps) {
  // const {setLoading} = useLoading()
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const { setIsLoggedIn } = useAppContext();
  // const { closePopup } = usePopup();
  useEffect(() => {
    // Lấy token từ localStorage
    const token = localStorage.getItem("accessToken");
    setAccessToken(token);
    // console.log("get token from localStorage");
    // console.log("token: ", token);
  }, []);

  useEffect(() => {
    const callGoogleLogin = async () => {
      try {
        console.log("dang chay login google");
        setLoading(true);
        const { image, ...rest } = accountGoogle.user;
        const updatedAccountGoogle = { ...rest, avatar: image };
        console.log("Updated AccountGoogle:", updatedAccountGoogle);
        const result = await authApiRequest.loginByGoogle(updatedAccountGoogle);
        await authApiRequest.auth({
          accessToken: result.payload.data.accessToken,
          refreshToken: result.payload.data.refreshToken,
        });
        // setAccessToken(result.payload.data.accessToken);
        // setRefreshToken(result.payload.data.refreshToken);
        localStorage.setItem("accessToken", result.payload.data.accessToken);
        localStorage.setItem("refreshToken", result.payload.data.refreshToken);
        setIsLoggedIn(true);
        toast({
          description: result.payload.message,
          duration: 2000,
        });
      } catch (error) {
        console.log(error);
        toast({
          variant: "destructive",
          description: "Có lỗi xảy ra khi đăng nhập",
          duration: 4000,
        });
      } finally {
        // console.log(path)
        // if (path !== "/login") {
        //   setIsLoggedIn(true);
        //   closePopup();
        //   setTimeout(() => {
        //     signOut({ redirect: false });
        //   }, 2000);
        //   setLoading(false);
        // } else {
        //   console.log('move to homepage')
        //   router.push("/homepage");
        //   setTimeout(() => {
        //     signOut({ redirect: false });
        //   }, 2000);
        //   // console.log("move to homepage");
        //   setLoading(false);
        // }
        router.push('/homepage')
        signOut({ redirect: false });
      }
    };
    const checkAccessToken = async () => {
      if (!accessToken && accountGoogle !== null) {
        // console.log("login google");
        await callGoogleLogin();
      }
    };
    checkAccessToken();
  }, [accessToken]);
  return <>{loading && <LoadingAnimation />}</>;
}
