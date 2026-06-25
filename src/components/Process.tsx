import { processSteps } from "@/src/data/process";
import Section from "@/src/components/primitives/Section";
import SectionHeading from "@/src/components/primitives/SectionHeading";
import Reveal from "@/src/components/primitives/Reveal";
import Icon, { type IconName } from "@/src/components/primitives/Icon";

export default function Process() {
  return (
    <Section id="process">
      <SectionHeading
        eyebrow="Process"
        title="3단계면 충분합니다"
        subtitle="복잡한 절차 없이, 대화하듯 시작해서 배포까지."
      />

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {processSteps.map((s, i) => (
          <Reveal key={s.step} delay={i * 0.12} className="h-full">
            <div className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-2xl glass p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-glow">
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet to-cyan text-white shadow-glow transition-transform duration-300 group-hover:scale-110">
                  <Icon name={s.icon as IconName} size={22} />
                </span>
                <span className="font-display text-5xl font-bold leading-none text-white/[0.07]">
                  {String(s.step).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                <p className="text-sm text-ink-muted">{s.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
