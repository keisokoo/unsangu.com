import { Noto_Sans_KR, Roboto } from "next/font/google";

export const noto = Noto_Sans_KR({
  subsets: ["latin"],
  display: "block",
  preload: true,
  weight: ["400", "700"],
  variable: "--font-noto",
});
export const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  variable: "--font-roboto",
});
