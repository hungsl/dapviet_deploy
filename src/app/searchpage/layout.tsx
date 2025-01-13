import type { Metadata } from "next";
import { Headers } from "../header/header";
import { Footer } from "../footer/footer";
import { Hero } from "./hero/hero";
export const metadata: Metadata = {
  title: "Tìm kiếm Việt phục",
  description:
    "Khám phá bộ sưu tập Việt phục truyền thống tại Đắp Việt. Các sản phẩm được thiết kế với nét đẹp văn hóa, phù hợp cho mọi dịp lễ hội và sự kiện.",
};

export default async function LayoutSearchpage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Headers />
      <Hero
        // backgroundImageUrl="/searchpage/f1.jpeg"
        backgroundImageUrl="/searchpage/anhnen.png"
        content={{
          title: "Khám Phá Việt Phục - Bản Sắc Giao Thoa",
          description:
            "Đón Chào Bộ Sưu Tập Việt Phục Mới Nhất - Tinh tế, Thanh Lịch và Đậm Net Truyền Thống Việt.",
        }}
      />
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
