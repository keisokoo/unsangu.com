import TopNav from "@/components/TopNav";
import GlobalEvent from "@/events/GlobalEvent";
import clsx from "clsx";
import type { Metadata } from "next";
import { noto, roboto } from "./fonts";
import "./globals.css";
import SvgUpArrow from "./icons/UpArrow";

export const metadata: Metadata = {
  metadataBase: new URL("https://acme.com"),
  alternates: {
    canonical: "/",
  },
  title: "UNSANGU.COM",
  description: "HUMBLE DEVELOPER",
  openGraph: {
    title: "UNSANGU.COM",
    description: "HUMBLE DEVELOPER",
    images: [
      {
        url: "https://dev.obj.kr/og.png",
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
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={clsx(noto.variable, roboto.variable, noto.className)}>
        <TopNav />
        {children}
        <div className="top-btn-container">
          <div className="top-btn">
            <SvgUpArrow />
          </div>
        </div>
        <div id="script"></div>
        <GlobalEvent />
      </body>
    </html>
  );
}
