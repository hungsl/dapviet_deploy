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
    template: "%s | Đắp Việt - Sản phẩm Việt phục truyền thống",
    default: "Đắp Việt - Việt phục truyền thống",
  },
  description:
    "Đắp Việt cung cấp các bộ trang phục Việt phục, cổ phục Việt Nam mang đậm nét văn hóa truyền thống và ảnh hưởng từ các nền văn hóa khác như Trung Hoa và phương Tây. Khám phá các bộ sưu tập độc đáo của chúng tôi.",
  keywords:
    "Việt phục, Áo dài, Đắp Việt, Quần áo truyền thống, Áo dài cách tân, Cổ phục Việt Nam",
  openGraph: {
    title: "Đắp Việt - Việt phục truyền thống",
    description:
      "Khám phá bộ sưu tập Việt phục độc đáo của Đắp Việt. Chất lượng cao, giá tốt.",
    url: "https://dapviet.shop",
    siteName: "Đắp Việt",
    images: [
      {
        url: "https://aekqgmlegdfbpjvohkqg.supabase.co/storage/v1/object/public/hung-pics//HomepagePerson3.png", // Thay bằng ảnh của bạn
        width: 1200,
        height: 630,
        alt: "Đắp Việt - Việt phục truyền thống",
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
