import Section from "@/src/components/primitives/Section";
import SectionHeading from "@/src/components/primitives/SectionHeading";
import Reveal from "@/src/components/primitives/Reveal";

const stack = [
  { mark: "N", name: "Next.js", role: "프레임워크" },
  { mark: "R", name: "React", role: "UI 라이브러리" },
  { mark: "TS", name: "TypeScript", role: "타입 안정성" },
  { mark: "T", name: "Tailwind", role: "스타일링" },
  { mark: "FM", name: "Framer Motion", role: "인터랙션" },
  { mark: "3D", name: "Three.js", role: "3D 그래픽" },
  { mark: "AI", name: "AI · LLM", role: "생성형 기능" },
  { mark: "▲", name: "Vercel", role: "배포 · 호스팅" },
];

export default function TechStack() {
  return (
    <Section id="stack">
      <SectionHeading
        eyebrow="Stack"
        title={
          <>
            검증된 <span className="text-gradient">모던 스택</span>으로
          </>
        }
        subtitle="빠르게 만들면서도 유지보수와 확장이 쉬운 기술로 제작합니다."
      />

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {stack.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.05}>
            <div className="group flex items-center gap-3 rounded-2xl glass p-4 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-glow">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet to-cyan text-sm font-bold text-white shadow-glow transition-transform duration-300 group-hover:scale-110">
                {t.mark}
              </span>
              <div className="flex min-w-0 flex-col">
                <span className="truncate font-display text-sm font-semibold">
                  {t.name}
                </span>
                <span className="truncate text-xs text-ink-muted">{t.role}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
