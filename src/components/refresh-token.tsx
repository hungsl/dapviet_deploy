"use client";
import { useEffect, useState } from "react";
import { differenceInMinutes } from "date-fns";
// import { useAppContext } from "@/app/context/app-provider";
import authApiRequest from "@/apiRequests/auth";
import { toast } from "@/hooks/use-toast";
import { useAppContext } from "@/app/context/app-provider";
// import { useLoading } from "@/app/context/loading-provider";

export default function RefreshToken() {
  // const { setLoading } = useLoading();
  const { setIsLoggedIn } = useAppContext();
  // const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  // const { refreshToken, accessToken, setAccessToken, setRefreshToken } =
  //   useAppContext();
  const [expireTime, setExpireTime] = useState<number | null>(null);
  // const accessToken = localStorage.getItem("accessToken");
  // const refreshToken = localStorage.getItem("refreshToken");
  useEffect(() => {
    // Đảm bảo chỉ truy cập `localStorage` trên client
    // const storedAccessToken =
    //   typeof window !== "undefined"
    //     ? localStorage.getItem("accessToken")
    //     : null;
    const storedRefreshToken =
      typeof window !== "undefined"
        ? localStorage.getItem("refreshToken")
        : null;

    // setAccessToken(storedAccessToken);
    setRefreshToken(storedRefreshToken);
  }, []);
  useEffect(() => {
    const fetchTokenExpireTime = async () => {
      //chỉ chạy khi load trang
      // console.log("lấy expireTime")
      const response = await fetch("/api/token-exp");
      const accessTokenExpiresAt = await response.json();
      const expiresAt = new Date(accessTokenExpiresAt.expireAt);//lấy ra thời gian hết hạn
      setExpireTime(expiresAt.getTime());
      const now = new Date();
      const remainingTime = differenceInMinutes(
        new Date(expiresAt.getTime()),
        now
      );// tính xem còn hạn hay không
      // console.log("Còn lại:", remainingTime, "phút");
      if (remainingTime < 10) {
        // console.log("refreshToken do hết thời gian");
        await refreshAccessToken(true); // khi mà token bị hết phiên cần load lại trang
      }
    };
    const refreshAccessToken = async (timeout: boolean) => {
      if (!refreshToken) return;
      try {
        // console.log("refreshToken: ", refreshToken);

        const result = await authApiRequest.refreshToken({
          auth: refreshToken ,
        });
        await authApiRequest.auth({
          accessToken: result.payload.data.accessToken,
          refreshToken: result.payload.data.refreshToken,
        });
        // setAccessToken(result.payload.data.accessToken);
        // setRefreshToken(result.payload.data.refreshToken);
        localStorage.setItem("accessToken", result.payload.data.accessToken);
        localStorage.setItem("refreshToken", result.payload.data.refreshToken);
        // Sau khi làm mới token, gọi API để lấy thời gian hết hạn
        await fetchTokenExpireTime();
        if (timeout) {
          window.location.reload();
        }
      } catch (error) {
        // eslint-disable-line @typescript-eslint/no-unused-vars
        console.log("Phiên của bạn đã hết hạn");
        await authApiRequest.logoutFromNextClientToNextServer();
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setIsLoggedIn(false);
        console.log("lỗi khi refreshToken: ", error);
        toast({
          variant: "destructive",
          description: "Phiên của bạn đã hết hạn",
          duration: 4000,
        });
      }
    };

    // const initializeExpireTime = async () => {
    //   if (!accessToken && refreshToken) {
    //     // Nếu chưa có accessToken, làm mới token trước
    //     setLoading(true);

    //     console.log("chưa có accessToken, làm mới token trước");
    //     await refreshAccessToken();
    //     setLoading(false);
    //   } else {
    //     // Nếu đã có accessToken, lấy thời gian hết hạn
    //     console.log("đã có accessToken, lấy thời gian hết hạn");
    //     await fetchTokenExpireTime();
    //   }
    // };

    const initializeExpireTime = async () => {
      // khởi tạo , lưu expiretime
      await fetchTokenExpireTime();
    };
    initializeExpireTime();

    const interval = setInterval(
      async () => {
        if (expireTime) {
          //có thời gian hết hạn rồi, check thời gian hết hạn với thời gian hiện tại để lấy ra số phút còn lại
          const now = new Date();
          const remainingTime = differenceInMinutes(new Date(expireTime), now);
          // console.log("Còn lại:", remainingTime, "phút");
          if (remainingTime < 10) {
            await refreshAccessToken(false); // khi mà chỉ cần refresh token không cần load lại trang
          }
        }
      },
      1000 * 60 * 5
    ); // Kiểm tra mỗi 5 phút
    return () => clearInterval(interval);
  }, [expireTime, refreshToken]);

  return null;
}
