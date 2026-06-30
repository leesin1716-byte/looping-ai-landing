import type { Audience } from "@/src/types";

// "이런 분들께 맞아요" — helps visitors self-identify. Edit freely.
export const audiences: Audience[] = [
  {
    icon: "rocket",
    title: "창업 · 스타트업",
    desc: "MVP와 랜딩을 빠르게 띄워 아이디어를 곧바로 검증하고 싶은 분",
  },
  {
    icon: "tag",
    title: "소상공인 · 자영업",
    desc: "가게와 브랜드를 온라인에서 제대로 보여주고 문의를 받고 싶은 분",
  },
  {
    icon: "chart",
    title: "마케터 · 대행사",
    desc: "캠페인용 페이지가 자주, 빠르게 필요한 분",
  },
  {
    icon: "sparkles",
    title: "행사 · 이벤트",
    desc: "기간 한정 페이지를 급하게, 그러나 멋지게 띄워야 하는 분",
  },
];
