import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import SmoothScroll from "@/src/components/primitives/SmoothScroll";
import ScrollProgress from "@/src/components/primitives/ScrollProgress";
import { services } from "@/src/data/services";
import "./globals.css";

const SITE_URL = "https://looping-ai-landing.vercel.app";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display-face",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
    url: SITE_URL,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Looping Ai — 당신의 아이디어, 며칠 만에 웹으로",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Looping Ai — 당신의 아이디어, 며칠 만에 웹으로",
    description: "랜딩페이지 · AI 웹사이트 · 대시보드를 바이브코딩으로 빠르게.",
    images: ["/og.png"],
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
  url: SITE_URL,
  image: `${SITE_URL}/og.png`,
  email: "wchhistory@naver.com",
  areaServed: "KR",
  knowsLanguage: "ko",
  serviceType: ["랜딩페이지 제작", "AI 웹사이트 개발", "대시보드·웹앱 개발"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "제작 서비스",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.title,
        description: s.desc,
      },
    })),
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={display.variable} suppressHydrationWarning>
      <body className="grain min-h-screen">
        {/* Apply the saved/system theme before paint to avoid a flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('theme')==='light'){document.documentElement.classList.add('light')}}catch(e){}`,
          }}
        />
        {/* Pretendard (Korean body font). Loading the CSS via a <head> link
            instead of a CSS @import lets the preload scanner fetch it in
            parallel with globals.css (preconnect above shortens the handshake),
            avoiding a serial request waterfall before first paint. */}
        <link
          rel="preconnect"
          href="https://cdn.jsdelivr.net"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.css"
        />
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
        <ScrollProgress />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
