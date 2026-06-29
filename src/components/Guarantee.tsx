import { guarantees } from "@/src/data/guarantees";
import Section from "@/src/components/primitives/Section";
import SectionHeading from "@/src/components/primitives/SectionHeading";
import Reveal from "@/src/components/primitives/Reveal";
import Icon, { type IconName } from "@/src/components/primitives/Icon";

export default function Guarantee() {
  return (
    <Section id="guarantee">
      <SectionHeading
        eyebrow="Our Promise"
        title={
          <>
            시작이 <span className="text-gradient">부담되지 않게</span>
          </>
        }
        subtitle="리스크는 줄이고, 약속은 분명하게. 믿고 맡길 수 있도록 기본을 지킵니다."
      />

      <Reveal className="mt-12">
        {/* One divided panel — visually distinct from the card sections.
            Inner cell borders form the grid lines; outer edges are clipped
            by the rounded, overflow-hidden container. */}
        <div className="overflow-hidden rounded-3xl glass">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {guarantees.map((g) => (
              <div
                key={g.title}
                className="group flex flex-col gap-3 border-b border-r border-white/10 p-7 transition-colors hover:bg-white/[0.03]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-violet/30 to-cyan/20 text-cyan-soft transition-transform duration-300 group-hover:-translate-y-0.5">
                  <Icon name={g.icon as IconName} size={20} />
                </span>
                <h3 className="font-display text-base font-semibold">{g.title}</h3>
                <p className="text-sm leading-relaxed text-ink-muted">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
