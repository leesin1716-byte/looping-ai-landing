import type { SiteConfig } from "@/src/types";

export const site: SiteConfig = {
  brand: "Looping Ai",
  nav: [
    { label: "작업물", href: "#portfolio" },
    { label: "서비스", href: "#services" },
    { label: "후기", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
    { label: "문의", href: "#contact" },
  ],
  hero: {
    headline: "당신의 아이디어,\n며칠 만에 웹으로.",
    sub: "랜딩페이지 · AI 웹사이트 · 대시보드를 바이브코딩으로 빠르게.",
    cta: "문의하기",
    scrollCue: "스크롤해서 둘러보기",
  },
  marquee: [
    "Next.js",
    "TypeScript",
    "Tailwind",
    "AI 통합",
    "Framer Motion",
    "Vercel 배포",
    "대시보드",
    "랜딩페이지",
    "반응형",
  ],
  // NOTE: add real social/profile URLs here before launch (a broken GitHub
  // placeholder was removed). mailto is safe to keep.
  socials: [{ label: "Email", href: "mailto:hello@looping.ai" }],
  contactEmail: "hello@looping.ai",
};
