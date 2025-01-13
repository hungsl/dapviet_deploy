import type { Metadata } from "next";
import { Headers } from "../header/header";
import { Footer } from "../footer/footer";

export const metadata: Metadata = {
  title: "Bộ sưu tập",
  description:
    "Những thiết kế trong bộ sưu tập là câu chuyện về ký ức, nơi quá khứ và hiện tại giao thoa, tái hiện vẻ đẹp Việt Nam qua từng giai đoạn lịch sử",
};

export default async function LayoutCollection({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Headers />
      {children}
      <div className="flex justify-center">
        <Footer />
      </div>
    </>
  );
}
