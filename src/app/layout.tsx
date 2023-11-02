import ReactQueryProvider from "@/components/Registry/ReactQueryProvider";
import TopNav from "@/components/TopNav";
import GlobalEvent from "@/events/GlobalEvent";
import clsx from "clsx";
import type { Metadata } from "next";
import { noto, roboto } from "./fonts";
import "./globals.css";
import SvgUpArrow from "./icons/UpArrow";

export const metadata: Metadata = {
  metadataBase: new URL("https://unsangu.com"),
  alternates: {
    canonical: "/",
  },
  title: "UNSANGU",
  description: "개발 관련 정보 및 기술 블로그.",
  openGraph: {
    title: "UNSANGU",
    description: "개발 관련 정보 및 기술 블로그.",
    images: [
      {
        url: "https://unsangu.com/og.png",
        width: 1280,
        height: 720,
        alt: "UNSANGU.COM",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={clsx(noto.variable, roboto.variable, noto.className)}>
        <TopNav />
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <div className="top-btn-container">
          <div className="top-btn">
            <SvgUpArrow />
          </div>
        </div>
        <div id="modal"></div>
        <GlobalEvent />
      </body>
    </html>
  );
}
