import { Headers } from "../header/header";
import { Footer } from "../footer/footer";
import Chat from "../chat/chat";

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
