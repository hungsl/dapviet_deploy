import type { Metadata } from "next";
import { Headers } from "../header/header";
import { Footer } from "../footer/footer";
import DapViet from "./dapviet/dap-viet";

export const metadata: Metadata = {
  title: "Đắp Việt - Cửa hàng Việt phục truyền thống",
  description:
    "Đắp Việt cung cấp các bộ trang phục Việt phục, cổ phục Việt Nam mang đậm nét văn hóa truyền thống và ảnh hưởng từ các nền văn hóa khác như Trung Hoa và phương Tây.",
};

export default async function LayoutAuthen({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Headers />
      <DapViet />
      <div className="container">
        <div className="layout">
          <div className="layout">{children}</div>
        </div>
      </div>
      <div className="flex justify-center">
        <Footer />
      </div>
    </>
  );
}
