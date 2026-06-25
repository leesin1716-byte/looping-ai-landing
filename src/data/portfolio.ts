import type { Project } from "@/src/types";

// 추가 작업물은 이 배열에 객체를 더 넣으면 자동으로 노출됩니다.
export const portfolio: Project[] = [
  {
    id: "happych",
    title: "행복충전팜 — 스마트팜 수경재배",
    desc: "당일 수확·당일 발송 유럽샐러드 브랜드 랜딩. 식욕을 자극하는 비주얼과 스토리텔링으로 구매·매장 방문을 유도합니다.",
    tags: ["랜딩페이지", "브랜드", "이커머스"],
    url: "https://happych-landing.vercel.app/",
  },
  {
    id: "kwpa",
    title: "대한민국 수도배관세척관리 총연합회",
    desc: "협회 공식 채널과 자격증 수강 모집. 공지·가격 비교·시공 사례·문의 폼·FAQ까지 갖춘 풀퍼널 랜딩.",
    tags: ["랜딩페이지", "협회·공식", "리드 전환"],
    url: "https://water-pipe-landing.vercel.app/",
  },
  {
    id: "waterclean",
    title: "수도배관 세척 — 무료 상담",
    desc: "“안 보이는 배관”의 불안을 건드리는 질문형 후크로 무료 상담 전환에 집중한 단일 목표 랜딩.",
    tags: ["랜딩페이지", "상담 전환", "워터"],
    url: "https://waterclean-landing.vercel.app/",
  },
  {
    id: "academy",
    title: "수도배관 세척관리 교육 모집",
    desc: "생활기술 직업 교육 훈련생 모집. 비교·진로 설계로 설득하는 다크 톤 랜딩.",
    tags: ["랜딩페이지", "교육 모집", "다크 UI"],
    url: "https://academy-landing-teal.vercel.app/",
  },
];
