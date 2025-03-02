"use client";
import authApiRequest from "@/apiRequests/auth";
// import { useAppContext } from '@/app/context/app-provider'
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { useAppContext } from "@/app/context/app-provider";
// import { getItemWithExpiry } from '@/lib/utils';

function LogoutPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const accessTokenParams = searchParams?.get("accessToken");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const { setIsLoggedIn } = useAppContext();
  // const {accessToken} = useAppContext()
  // const accessToken = getItemWithExpiry("accessToken")
  useEffect(() => {
    // Lấy token từ localStorage
    const token = localStorage.getItem("accessToken");
    setAccessToken(token);
  }, []);
  useEffect(() => {
    setIsLoggedIn(false);
    // signOut();
    if (accessTokenParams === accessToken)
      authApiRequest.logoutFromNextClientToNextServer(true).then((res) => {// eslint-disable-line @typescript-eslint/no-unused-vars
        router.push(`/dang-nhap?redirectFrom=${pathname}`);
      });
  }, [accessTokenParams]);

  return <div>Logout</div>;
}
export default function Logout() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <LogoutPage />
    </Suspense>
  );
}