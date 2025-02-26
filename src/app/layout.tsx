import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import AppProvider from "./context/app-provider";
import LoadingProvider from "./context/loading-provider";
import { PopupProvider } from "@/app/context/popup-provider";
import PopupWrapper from "@/components/common/popup-wrapper";
import { ConvexClientProvider } from "./context/convex-provider";
import RefreshToken from "@/components/refresh-token";
// import Chat from "./chat/chat";

const roboto = Roboto({ subsets: ["vietnamese"], weight: ["100", "300"] });
export const metadata: Metadata = {
  title: {
    template: "%s | Đắp Việt - Áo dài cách tân & Việt phục hiện đại",
    default: "Đắp Việt - Áo dài cách tân & Việt phục hiện đại",
  },
  description:
    "Đắp Việt chuyên cung cấp áo dài cách tân, mang vẻ đẹp truyền thống kết hợp phong cách hiện đại. Chất liệu cao cấp, thiết kế đa dạng, phù hợp cho mọi dịp lễ hội, sự kiện và đời thường.",
  keywords:
    "Áo dài cách tân, Việt phục hiện đại, Đắp Việt, Quần áo truyền thống, Áo dài nữ, Áo dài nam, Áo dài đôi, Áo dài cưới, Áo dài trẻ em",
  openGraph: {
    title: "Đắp Việt - Áo dài cách tân & Việt phục hiện đại",
    description:
      "Khám phá bộ sưu tập áo dài cách tân độc đáo tại Đắp Việt. Thiết kế sang trọng, phù hợp cho mọi dịp.",
    url: "https://dapviet.shop",
    siteName: "Đắp Việt",
    images: [
      {
        url: "https://aekqgmlegdfbpjvohkqg.supabase.co/storage/v1/object/public/hung-pics//HomepagePerson3.png",
        width: 700,
        height: 1200,
        alt: "Đắp Việt - Áo dài cách tân & Việt phục hiện đại",
      },
    ],
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={roboto.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          <AppProvider>
            <LoadingProvider>
              <ConvexClientProvider>
                <PopupProvider>
                  <div>{children}</div>
                  <PopupWrapper />
                </PopupProvider>
              </ConvexClientProvider>
              <RefreshToken />
            </LoadingProvider>
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
