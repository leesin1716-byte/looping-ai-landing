import type { Guarantee } from "@/src/types";

// Risk-reversal promises shown near the pricing/decision point.
// Edit copy here freely.
export const guarantees: Guarantee[] = [
  {
    icon: "tag",
    title: "투명한 고정 견적",
    desc: "상담 후 견적을 확정합니다. 진행 중 깜짝 추가 비용은 없어요.",
  },
  {
    icon: "bolt",
    title: "정한 일정 준수",
    desc: "시작 전 일정을 함께 정하고, 약속한 날짜에 맞춰 전달합니다.",
  },
  {
    icon: "loop",
    title: "함께 다듬는 수정",
    desc: "프로토타입을 보며 합의된 범위 안에서 충분히 반영합니다.",
  },
  {
    icon: "check",
    title: "런칭 후에도 케어",
    desc: "배포·도메인 연결까지. 이후 운영도 옵션으로 함께합니다.",
  },
];
