"use client";
import React, { createContext, useContext, useState } from "react";

// Tạo Context
const LoadingContext = createContext({
  loading: false,
  setLoading: (loading: boolean) => {},// eslint-disable-line @typescript-eslint/no-unused-vars
});

// Provider để bọc toàn bộ ứng dụng
export default function LoadingProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
        <>
          <div className="loader-wrapper" style ={{display: loading? '': 'none'}}>
          <div className="loader" ></div>
          </div>
          {children}
        </>
    </LoadingContext.Provider>
  );
}

// Custom Hook để sử dụng Loading Context
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useAppContext must be used within an LayoutProvider");
  }
  return context;
};
