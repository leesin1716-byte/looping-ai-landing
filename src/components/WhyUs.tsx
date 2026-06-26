import { why } from "@/src/data/why";
import Section from "@/src/components/primitives/Section";
import SectionHeading from "@/src/components/primitives/SectionHeading";
import Reveal from "@/src/components/primitives/Reveal";
import Icon, { type IconName } from "@/src/components/primitives/Icon";

const spans = ["md:col-span-2", "md:col-span-1", "md:col-span-1", "md:col-span-2"];

export default function WhyUs() {
  return (
    <Section id="why">
      <SectionHeading
        eyebrow="Why Looping Ai"
        title={
          <>
            왜 <span className="text-gradient">Looping Ai</span>일까요
          </>
        }
        subtitle="빠르고, 합리적이고, 퀄리티 높고, 무엇보다 직접 소통합니다."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {why.map((w, i) => {
          const span = spans[i % spans.length];
          const wide = span.includes("col-span-2");
          return (
            <Reveal key={w.id} delay={i * 0.08} className={span}>
              <div className="group relative h-full overflow-hidden rounded-2xl glass p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-glow">
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                {/* Watermark fills the wide bento cards' empty space. */}
                {wide && (
                  <Icon
                    name={w.icon as IconName}
                    size={128}
                    className="pointer-events-none absolute -bottom-7 right-2 text-ink/[0.05] transition-transform duration-500 group-hover:scale-110 group-hover:text-ink/[0.08]"
                  />
                )}
                <div className="relative flex h-full flex-col gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-violet/30 to-cyan/20 text-cyan-soft">
                    <Icon name={w.icon as IconName} />
                  </span>
                  <h3 className="font-display text-xl font-semibold">{w.title}</h3>
                  <p className="max-w-md text-sm text-ink-muted">{w.desc}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
