import ReactQueryClient from "@/components/Registry/ReactQueryClient";
import TopNav from "@/components/TopNav";
import GlobalEvent from "@/events/GlobalEvent";
import clsx from "clsx";
import type { Metadata } from "next";
import Script from "next/script";
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
      <head>
          {/* Start Naver Analytics */}
      <Script src="//wcs.naver.net/wcslog.js"/>
      <Script id="naver-analytics" type="text/javascript">{
        `
      if(!wcs_add) var wcs_add = {};
      wcs_add["wa"] = "30a71d2c2fc570";
      if(window.wcs) {
        wcs_do();
      }
        `
      }
      </Script>
          {/* End Naver Analytics */}
          {/* Start Google Tag Manager */}
          <Script id="google-tag" strategy="afterInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-PFG3G4G8');`}</Script>
        {/* End Google Tag Manager */}
        {/* Google tag (gtag.js) */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-LDDD08LDK3"/>
        <Script id="google-analytics">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-LDDD08LDK3');`}
        </Script>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={clsx(noto.variable, roboto.variable, noto.className)}>
<noscript
  dangerouslySetInnerHTML={{
    __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PFG3G4G8"
    height="0" width="0" style="display:none;visibility:hidden"></iframe>`
  }}
/>
        <TopNav />
        <ReactQueryClient>{children}</ReactQueryClient>
        <div className="top-btn-container">
          <div className="top-btn">
            <SvgUpArrow />
          </div>
        </div>
        <div id="modal"></div>
        <div id="script"></div>
        <GlobalEvent />
      </body>
    </html>
  );
}
