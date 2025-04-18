import type { Metadata } from "next";
import { Headers } from "../header/header";
import { Footer } from "../footer/footer";
import Hero from "./hero";
import Chat from "../chat/chat";

export const metadata: Metadata = {
  title: "Đắp Việt - Cửa hàng Việt phục truyền thống",
  description:
    "Đắp Việt cung cấp các bộ trang phục Việt phục, cổ phục Việt Nam mang đậm nét văn hóa truyền thống và ảnh hưởng từ các nền văn hóa khác như Trung Hoa và phương Tây.",
};

export default async function Layoutsales({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Headers />
      <Hero />
      <div className="container">
        <div className="layout">
          <div className="layout">{children}</div>
        </div>
      </div>
      <div className="flex justify-center">
        <Footer />
      </div>
      <Chat />
    </>
  );
}
