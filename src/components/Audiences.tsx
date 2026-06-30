import { audiences } from "@/src/data/audiences";
import Section from "@/src/components/primitives/Section";
import SectionHeading from "@/src/components/primitives/SectionHeading";
import Reveal from "@/src/components/primitives/Reveal";
import Icon, { type IconName } from "@/src/components/primitives/Icon";

export default function Audiences() {
  return (
    <Section id="audience">
      <SectionHeading
        eyebrow="For you"
        title={
          <>
            이런 분들께 <span className="text-gradient">딱 맞아요</span>
          </>
        }
        subtitle="규모나 업종은 달라도, 빠르고 멋진 웹이 필요한 분이라면 누구든."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {audiences.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.08}>
            <div className="group flex h-full items-start gap-4 rounded-2xl glass p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-glow">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-violet/30 to-cyan/20 text-cyan-soft transition-transform duration-300 group-hover:-translate-y-0.5">
                <Icon name={a.icon as IconName} />
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-display text-lg font-semibold">{a.title}</h3>
                <p className="text-sm leading-relaxed text-ink-muted">{a.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
