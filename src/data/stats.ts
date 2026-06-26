import type { Stat } from "@/src/types";

// PLACEHOLDER — 실제 수치는 이 파일만 수정하면 됩니다.
export const stats: Stat[] = [
  { id: "projects", value: 32, suffix: "+", label: "제작한 프로젝트", icon: "rocket" },
  { id: "satisfaction", value: 98, suffix: "%", label: "고객 만족도", icon: "gem" },
  { id: "days", value: 5, suffix: "일", label: "평균 제작 기간", icon: "bolt" },
  {
    id: "communication",
    value: 100,
    suffix: "%",
    label: "수정까지 직접 소통",
    icon: "chat",
  },
];
