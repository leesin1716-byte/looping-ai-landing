import type { Project } from "@/src/types";

// 추가 작업물은 이 배열에 객체를 더 넣으면 자동으로 노출됩니다.
export const portfolio: Project[] = [
  {
    id: "worldcup-korea",
    title: "World Cup Korea Dashboard",
    desc: "월드컵 한국 대표팀 데이터를 실시간으로 시각화한 인터랙티브 대시보드.",
    tags: ["대시보드", "데이터 시각화", "Next.js"],
    url: "https://worldcup-korea-dashboard.vercel.app/",
  },
];
