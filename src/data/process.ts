import type { ProcessStep } from "@/src/types";

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "아이디어 공유",
    desc: "원하는 걸 편하게 말씀해 주세요. 레퍼런스가 있으면 더 좋습니다.",
    icon: "chat",
    deliverable: "요구사항 정리 · 일정 제안",
  },
  {
    step: 2,
    title: "빠른 프로토타입",
    desc: "며칠 안에 동작하는 시안을 만들어 함께 보며 다듬습니다.",
    icon: "bolt",
    deliverable: "확인용 시안 링크",
  },
  {
    step: 3,
    title: "완성 · 배포",
    desc: "최종본을 마무리하고 도메인 연결·배포까지 끝냅니다.",
    icon: "rocket",
    deliverable: "운영 가능한 사이트 + 코드",
  },
];
