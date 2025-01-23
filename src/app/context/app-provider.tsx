"use client";
import React, { createContext, useContext, useState } from "react";

const AppContext = createContext({
  isLoggedIn: false,
  isRefresh: false,
  // refreshToken: "",
  shippingDetails: {
    provinceId: 0,
    districtId: 0,
  },
  shippingFee: 0,
  shippingMethod: "",
  setIsLoggedIn: (isLoggedIn: boolean) => {},// eslint-disable-line @typescript-eslint/no-unused-vars
  // setRefreshToken: (refreshToken: string) => {},// eslint-disable-line @typescript-eslint/no-unused-vars
  setShippingDetails: (details: {// eslint-disable-line @typescript-eslint/no-unused-vars
    provinceId: number;
    districtId: number;
  }) => {},
  setShippingFee: (fee: number) => {},// eslint-disable-line @typescript-eslint/no-unused-vars
  setIsRefresh: (isRefresh: boolean) => {},// eslint-disable-line @typescript-eslint/no-unused-vars
  setShippingMethod: (method: string) => {},// eslint-disable-line @typescript-eslint/no-unused-vars
});

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export default function AppProvider({
  children,
  // initialAccessToken = "",
  // initialRefreshToken = "",
}: Readonly<{
  children: React.ReactNode;
  // initialAccessToken?: string;
  // initialRefreshToken?: string;
}>) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  // const [refreshToken, setRefreshToken] = useState(initialRefreshToken);
  const [shippingDetails, setShippingDetails] = useState({
    provinceId: 45,
    districtId: 515,
  });
  const [shippingFee, setShippingFee] = useState(0);
  const [isRefresh, setIsRefresh] = useState(false);
  const [shippingMethod, setShippingMethod] = useState("");

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        isRefresh,
        // refreshToken,
        shippingDetails,
        shippingFee,
        shippingMethod,
        setIsLoggedIn,
        setIsRefresh,
        // setRefreshToken,
        setShippingDetails,
        setShippingFee,
        setShippingMethod,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
