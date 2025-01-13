import type { Metadata } from "next";
import { Headers } from "../header/header";
import { Footer } from "../footer/footer";

export const metadata: Metadata = {
  title: "Liên Hệ với Đắp Việt - Chúng tôi luôn sẵn sàng hỗ trợ bạn",
  description: "Cần hỗ trợ về sản phẩm Việt phục hoặc có câu hỏi nào? Hãy liên hệ với Đắp Việt để được tư vấn nhanh chóng. Chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn."
};

export default async function LayoutContact({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="container">
        <div className="layout">
          <Headers />
          <div className="layout">{children}</div>
        </div>
      </div>
      <div className="flex justify-center">
        <Footer />
      </div>
    </>
  );
}
