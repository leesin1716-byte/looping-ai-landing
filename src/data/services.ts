import type { Service } from "@/src/types";

export const services: Service[] = [
  {
    id: "landing",
    title: "랜딩페이지",
    desc: "전환에 집중한 한 장짜리 페이지. 빠르게 만들고 바로 띄웁니다.",
    bullets: ["반응형 + 모바일 최적화", "문의·구매 전환 설계", "감각적인 애니메이션"],
    icon: "rocket",
  },
  {
    id: "ai-web",
    title: "AI 웹사이트",
    desc: "챗봇·생성형 기능이 들어간, 진짜 동작하는 AI 웹 서비스.",
    bullets: ["LLM 연동", "맞춤 워크플로우", "API·백엔드 연결"],
    icon: "sparkles",
  },
  {
    id: "dashboard",
    title: "대시보드 · 웹앱",
    desc: "데이터를 한눈에. 차트·필터·실시간 업데이트까지.",
    bullets: ["데이터 시각화", "관리자·내부 도구", "인증·권한 관리"],
    icon: "chart",
  },
];
