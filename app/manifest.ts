import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Looping Ai — 당신의 아이디어, 며칠 만에 웹으로",
    short_name: "Looping Ai",
    description: "랜딩페이지 · AI 웹사이트 · 대시보드를 바이브코딩으로 빠르게.",
    start_url: "/",
    display: "standalone",
    background_color: "#07070C",
    theme_color: "#07070C",
    lang: "ko",
    categories: ["business", "productivity"],
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
