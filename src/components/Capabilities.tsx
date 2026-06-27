import Section from "@/src/components/primitives/Section";
import SectionHeading from "@/src/components/primitives/SectionHeading";
import Reveal from "@/src/components/primitives/Reveal";
import AnimatedBars from "@/src/components/primitives/AnimatedBars";

/** Browser-chrome frame wrapping a code-built UI mockup. */
function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-bg/70 shadow-glow">
      <div className="flex h-7 items-center gap-1.5 border-b border-white/10 bg-white/[0.03] px-3">
        <span className="h-2 w-2 rounded-full bg-magenta/60" />
        <span className="h-2 w-2 rounded-full bg-violet/60" />
        <span className="h-2 w-2 rounded-full bg-cyan/60" />
        <span className="ml-2 h-2 w-24 rounded-full bg-white/[0.06]" />
      </div>
      <div className="relative aspect-[16/10] p-3.5">{children}</div>
    </div>
  );
}

function LandingMock() {
  return (
    <div className="flex h-full gap-3">
      <div className="flex w-1/2 flex-col justify-center gap-2">
        <div className="h-2.5 w-4/5 rounded-full bg-gradient-to-r from-violet to-cyan" />
        <div className="h-2.5 w-3/5 rounded-full bg-white/20" />
        <div className="h-1.5 w-2/3 rounded-full bg-white/10" />
        <div className="mt-1.5 h-5 w-16 rounded-md bg-gradient-to-r from-violet to-cyan" />
      </div>
      <div className="relative w-1/2 overflow-hidden rounded-lg bg-gradient-to-br from-violet/30 to-cyan/20 ring-1 ring-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.18),transparent_55%)]" />
      </div>
    </div>
  );
}

function DashMock() {
  return (
    <div className="flex h-full gap-2">
      <div className="flex w-9 flex-col gap-1.5 rounded-md bg-white/[0.04] p-1.5">
        <div className="h-3 w-3 rounded bg-gradient-to-br from-violet to-cyan" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-1.5 rounded-full bg-white/15" />
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex-1 rounded-md bg-white/[0.04] p-1.5">
              <div className="h-1 w-2/3 rounded-full bg-white/20" />
              <div className="mt-1.5 h-2 w-1/2 rounded-full bg-gradient-to-r from-violet to-cyan" />
            </div>
          ))}
        </div>
        <AnimatedBars />
      </div>
    </div>
  );
}

function ChatMock() {
  return (
    <div className="flex h-full flex-col justify-between gap-2">
      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-1.5">
          <div className="h-4 w-4 shrink-0 rounded-full bg-gradient-to-br from-violet to-cyan" />
          <div className="rounded-lg rounded-tl-none bg-white/[0.06] px-2 py-1.5">
            <div className="h-1.5 w-24 rounded-full bg-white/25" />
            <div className="mt-1 h-1.5 w-14 rounded-full bg-white/15" />
          </div>
        </div>
        <div className="flex justify-end">
          <div className="rounded-lg rounded-tr-none bg-gradient-to-r from-violet/70 to-cyan/60 px-2 py-1.5">
            <div className="h-1.5 w-16 rounded-full bg-white/45" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-full bg-white/[0.05] px-2.5 py-2 ring-1 ring-white/10">
        <div className="h-1.5 flex-1 rounded-full bg-white/15" />
        <div className="h-4 w-4 rounded-full bg-gradient-to-br from-violet to-cyan" />
      </div>
    </div>
  );
}

const items = [
  {
    id: "landing",
    tag: "Landing",
    title: "랜딩페이지",
    desc: "전환에 집중한 한 장짜리 페이지. 감각적인 디자인과 인터랙션으로 문의·구매를 끌어냅니다.",
    mock: <LandingMock />,
  },
  {
    id: "dashboard",
    tag: "Dashboard",
    title: "대시보드 · 웹앱",
    desc: "데이터를 한눈에. 차트·필터·실시간 업데이트와 관리자 도구까지 만들어 드립니다.",
    mock: <DashMock />,
  },
  {
    id: "ai",
    tag: "AI App",
    title: "AI 웹사이트 · 챗봇",
    desc: "LLM·생성형 기능이 들어간, 진짜 동작하는 AI 서비스. API·백엔드 연동도 함께.",
    mock: <ChatMock />,
  },
];

export default function Capabilities() {
  return (
    <Section id="capabilities">
      <SectionHeading
        eyebrow="What we build"
        title={
          <>
            이런 걸 <span className="text-gradient">만들어요</span>
          </>
        }
        subtitle="필요한 형태가 무엇이든, 며칠 안에 동작하는 결과물로 만들어 드립니다."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {items.map((it, i) => (
          <Reveal key={it.id} delay={i * 0.1} className="h-full">
            <div className="group flex h-full flex-col gap-5 rounded-2xl glass p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-glow">
              <div className="transition-transform duration-500 group-hover:scale-[1.02]">
                <Frame>{it.mock}</Frame>
              </div>
              <div className="flex flex-col gap-2 px-1">
                <span className="w-fit rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-cyan-soft">
                  {it.tag}
                </span>
                <h3 className="font-display text-lg font-semibold">{it.title}</h3>
                <p className="text-sm leading-relaxed text-ink-muted">{it.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
