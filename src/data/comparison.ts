import type { ComparisonRow } from "@/src/types";

// "직접 개발" = building it yourself, "일반 외주" = a typical agency.
// Copy is editable here without touching the component.
export const comparison: ComparisonRow[] = [
  { feature: "제작 기간", diy: "막막함 · 러닝커브", agency: "보통 2~3개월", us: "3일 ~ 4주" },
  { feature: "시작 비용", diy: "내 시간 · 인건비", agency: "수백만원 ~", us: "₩120만 부터" },
  { feature: "커뮤니케이션", diy: "—", agency: "PM 거쳐 전달", us: "대표가 직접" },
  { feature: "AI · 최신 스택", diy: "직접 학습 필요", agency: "보수적 · 추가비용", us: "기본 탑재" },
  { feature: "수정 반영", diy: "본인 역량껏", agency: "느리고 추가비용", us: "빠르게 즉시" },
  { feature: "런칭 후 관리", diy: "스스로", agency: "계약 끝나면 종료", us: "지속 케어" },
  { feature: "디자인 퀄리티", diy: "들쭉날쭉", agency: "템플릿 위주", us: "맞춤 · 감각적" },
];
