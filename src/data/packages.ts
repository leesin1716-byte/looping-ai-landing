import type { Package } from "@/src/types";

// NOTE: prices and inclusions are placeholders — they're meant to be edited
// freely here without touching the component. "부터" = "starting from".
export const packages: Package[] = [
  {
    id: "landing",
    name: "랜딩페이지",
    tagline: "빠르게 띄우는 전환형 한 장",
    price: "₩120만",
    priceNote: "부터 · 약 1주",
    icon: "rocket",
    features: [
      "반응형 + 모바일 최적화",
      "문의·구매 전환 설계",
      "감각적인 스크롤 애니메이션",
      "기본 SEO · 메타 태그",
      "Vercel 배포 + 도메인 연결",
    ],
    cta: "이 패키지로 문의",
    highlight: false,
  },
  {
    id: "web-app",
    name: "웹사이트 · 웹앱",
    tagline: "AI 기능까지 들어간 진짜 서비스",
    price: "₩390만",
    priceNote: "부터 · 약 2~4주",
    icon: "sparkles",
    features: [
      "랜딩 패키지 전체 포함",
      "멀티 페이지 · 라우팅",
      "LLM · 생성형 기능 연동",
      "DB · 인증 · API 백엔드",
      "관리자 페이지 기본 제공",
      "성능 · 접근성 최적화",
    ],
    cta: "이 패키지로 문의",
    highlight: true,
    badge: "가장 인기",
  },
  {
    id: "dashboard",
    name: "대시보드 · 운영",
    tagline: "데이터 · 내부도구 · 지속 운영",
    price: "맞춤 견적",
    priceNote: "규모에 따라 산정",
    icon: "chart",
    features: [
      "데이터 시각화 · 실시간 차트",
      "역할 기반 권한 관리",
      "외부 시스템 · API 연동",
      "운영 · 유지보수 옵션",
      "전담 커뮤니케이션",
    ],
    cta: "상담 요청",
    highlight: false,
  },
];
