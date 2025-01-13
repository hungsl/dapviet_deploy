//ví dụ layout sẽ xóa đi

import type { Metadata } from "next";
import LoadingProvider from "@/app/context/loading-provider";

export const metadata: Metadata = {
  title: "Cổng đăng nhập Đắp Việt",
  description: "Trang đăng nhập của hệ thống Đắp Việt",
};

export default async function LayoutAuthen({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <LoadingProvider>
        <div>{children}</div>
      </LoadingProvider>
    </div>
  );
}
