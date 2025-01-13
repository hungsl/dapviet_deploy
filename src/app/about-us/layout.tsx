import type { Metadata } from "next";
import { Headers } from "../header/header";
import { Footer } from "../footer/footer";
import Chat from "../chat/chat";

export const metadata: Metadata = {
  title: "Blog về Việt phục | Đắp Việt",
  description:
    "Đọc các bài viết về văn hóa Việt phục, các phong cách cổ phục Việt Nam, và sự phát triển của thời trang truyền thống tại Đắp Việt.",
};
export default async function LayoutAuthen({
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
      <Chat />
    </>
  );
}
