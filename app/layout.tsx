import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#07070C",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Looping Ai",
  description:
    "랜딩페이지 · AI 웹사이트 · 대시보드를 바이브코딩으로 빠르게 제작하는 AI 바이브코더.",
  url: "https://looping-ai.vercel.app",
  email: "hello@looping.ai",
  areaServed: "KR",
  knowsLanguage: "ko",
  serviceType: ["랜딩페이지 제작", "AI 웹사이트 개발", "대시보드·웹앱 개발"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={display.variable}>
      <body className="grain min-h-screen">
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-violet focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          메인 콘텐츠로 건너뛰기
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
