import PageGlobalEvent from "@/components/PageGlobalEvent";
import TopNav from "@/components/TopNav";
import clsx from "clsx";
import type { Metadata } from "next";
import { noto, roboto } from "./fonts";
import "./globals.css";
import SvgUpArrow from "./icons/UpArrow";

export const metadata: Metadata = {
  title: "UNSANGU.COM",
  description: "HUMBLE DEVELOPER",
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
        <PageGlobalEvent />
      </body>
    </html>
  );
}
