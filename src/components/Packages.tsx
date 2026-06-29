import type { Package } from "@/src/types";
import { packages } from "@/src/data/packages";
import { cn } from "@/src/lib/cn";
import Section from "@/src/components/primitives/Section";
import SectionHeading from "@/src/components/primitives/SectionHeading";
import Reveal from "@/src/components/primitives/Reveal";
import Icon, { type IconName } from "@/src/components/primitives/Icon";
import PackageCta from "@/src/components/PackageCta";

// Maps a package to the matching 프로젝트 유형 option in the contact form,
// so the CTA can pre-select it. Keys are package ids.
const FORM_TYPE: Record<string, string> = {
  landing: "랜딩페이지",
  "web-app": "AI 웹사이트",
  dashboard: "대시보드·웹앱",
};

function PackageCard({ p }: { p: Package }) {
  const body = (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[1.65rem] p-7 transition-all duration-300 hover:-translate-y-1",
        p.highlight ? "bg-surface shadow-glow" : "glass hover:border-white/20",
      )}
    >
      {/* hover glow accent */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

      {p.badge && (
        <span className="absolute right-6 top-7 rounded-full bg-gradient-to-r from-violet to-cyan px-3 py-1 text-xs font-semibold text-white shadow-glow">
          {p.badge}
        </span>
      )}

      <span className="relative grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-violet/30 to-cyan/20 text-cyan-soft">
        <Icon name={p.icon as IconName} />
      </span>

      <h3 className="relative mt-5 font-display text-xl font-semibold">{p.name}</h3>
      <p className="relative mt-1.5 text-sm text-ink-muted">{p.tagline}</p>

      <div className="relative mt-5 flex items-end gap-1.5">
        <span
          className={cn(
            "font-display text-3xl font-bold tracking-tight",
            p.highlight && "text-gradient",
          )}
        >
          {p.price}
        </span>
        <span className="pb-1 text-xs text-ink-faint">{p.priceNote}</span>
      </div>

      <div className="relative my-6 h-px bg-white/10" />

      <ul className="relative flex flex-1 flex-col gap-3">
        {p.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-ink-muted">
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-cyan/15 text-cyan-soft">
              <Icon name="check" size={13} />
            </span>
            <span className="break-keep">{f}</span>
          </li>
        ))}
      </ul>

      <PackageCta type={FORM_TYPE[p.id]} highlight={p.highlight} label={p.cta} />
    </div>
  );

  if (!p.highlight) return body;

  // Gradient ring frames the most popular plan.
  return (
    <div className="h-full rounded-[1.75rem] bg-gradient-to-b from-violet/50 via-cyan/30 to-magenta/30 p-px shadow-glow">
      {body}
    </div>
  );
}

export default function Packages() {
  return (
    <Section id="pricing">
      <SectionHeading
        eyebrow="Pricing"
        title={
          <>
            규모가 어떻든, <span className="text-gradient">명확한 패키지</span>로
          </>
        }
        subtitle="숨은 비용 없이 범위와 일정을 먼저 투명하게. 무료 상담으로 시작하세요."
      />

      <div className="mt-14 grid items-stretch gap-6 md:grid-cols-3">
        {packages.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.08} className="h-full">
            <PackageCard p={p} />
          </Reveal>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-ink-faint">
        모든 패키지는 무료 상담 후 시작합니다 · 일정과 견적을 먼저 명확히 안내드려요.
      </p>
    </Section>
  );
}
