import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import SmoothScroll from "@/src/components/primitives/SmoothScroll";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display-face",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://looping-ai.vercel.app"),
  title: {
    default: "Looping Ai — 당신의 아이디어, 며칠 만에 웹으로",
    template: "%s · Looping Ai",
  },
  description:
    "랜딩페이지 · AI 웹사이트 · 대시보드를 바이브코딩으로 빠르게. 생각만 던지면 며칠 안에 진짜 동작하는 웹사이트가 나옵니다.",
  keywords: [
    "랜딩페이지 제작",
    "AI 웹사이트",
    "대시보드 개발",
    "바이브코딩",
    "웹 외주",
    "Looping Ai",
  ],
  authors: [{ name: "Looping Ai" }],
  creator: "Looping Ai",
  openGraph: {
    title: "Looping Ai — 당신의 아이디어, 며칠 만에 웹으로",
    description: "랜딩페이지 · AI 웹사이트 · 대시보드를 바이브코딩으로 빠르게.",
    type: "website",
    locale: "ko_KR",
    siteName: "Looping Ai",
  },
  twitter: {
    card: "summary_large_image",
    title: "Looping Ai — 당신의 아이디어, 며칠 만에 웹으로",
    description: "랜딩페이지 · AI 웹사이트 · 대시보드를 바이브코딩으로 빠르게.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={display.variable}>
      <body className="grain min-h-screen">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
