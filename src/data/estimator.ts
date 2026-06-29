// Config for the interactive project estimator. All numbers are 만원 (10k KRW)
// and are PLACEHOLDER reference values — edit freely here. `formType` maps to a
// 프로젝트 유형 option in the contact form so the CTA can pre-select it.

export type EstimatorType = {
  id: string;
  label: string;
  base: number; // 만원
  formType: string;
  weeks: [number, number];
};

export type EstimatorScale = {
  id: string;
  label: string;
  mult: number;
  note: string;
};

export type EstimatorOption = {
  id: string;
  label: string;
  add: number; // 만원
  note?: string;
};

export const estimatorTypes: EstimatorType[] = [
  { id: "landing", label: "랜딩페이지", base: 120, formType: "랜딩페이지", weeks: [1, 2] },
  { id: "webapp", label: "웹사이트·웹앱", base: 390, formType: "AI 웹사이트", weeks: [2, 4] },
  { id: "dashboard", label: "대시보드", base: 500, formType: "대시보드·웹앱", weeks: [3, 6] },
];

export const estimatorScales: EstimatorScale[] = [
  { id: "s", label: "소규모", mult: 1, note: "한 페이지 · 핵심 기능" },
  { id: "m", label: "중간", mult: 1.6, note: "여러 페이지 · 기능 다수" },
  { id: "l", label: "대규모", mult: 2.4, note: "복잡한 기능 · 연동" },
];

export const estimatorOptions: EstimatorOption[] = [
  { id: "ai", label: "AI · 생성형 기능", add: 150 },
  { id: "admin", label: "관리자 페이지", add: 80 },
  { id: "i18n", label: "다국어 지원", add: 60 },
  { id: "design", label: "디자인 고도화", add: 90 },
];
