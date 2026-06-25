import { services } from "@/src/data/services";
import Section from "@/src/components/primitives/Section";
import SectionHeading from "@/src/components/primitives/SectionHeading";
import TiltCard from "@/src/components/primitives/TiltCard";
import Reveal from "@/src/components/primitives/Reveal";
import Icon, { type IconName } from "@/src/components/primitives/Icon";

const accents = [
  { glow: "rgba(139,92,246,0.22)", icon: "text-violet-soft" },
  { glow: "rgba(34,211,238,0.20)", icon: "text-cyan-soft" },
  { glow: "rgba(217,70,239,0.20)", icon: "text-magenta-soft" },
];

export default function Services() {
  return (
    <Section id="services">
      <SectionHeading
        eyebrow="Services"
        title="무엇을 만들어 드릴까요"
        subtitle="필요한 건 하나든 전부든. 아이디어를 동작하는 웹으로 바꿔 드립니다."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {services.map((service, i) => {
          const accent = accents[i % accents.length];
          return (
            <Reveal key={service.id} delay={i * 0.1}>
              <TiltCard className="group/card h-full overflow-hidden transition-shadow duration-300 hover:border-white/20 hover:shadow-glow">
                {/* branded gradient header with the service icon (no stock imagery) */}
                <div
                  className="relative flex aspect-[16/9] items-center justify-center overflow-hidden border-b border-white/10"
                  style={{
                    backgroundImage: `radial-gradient(circle at 50% 38%, ${accent.glow}, transparent 65%)`,
                  }}
                >
                  <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(to_right,rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:30px_30px] [mask-image:radial-gradient(circle_at_50%_42%,#000,transparent_72%)]" />
                  <span
                    className={`relative grid h-16 w-16 place-items-center rounded-2xl glass shadow-glow transition-transform duration-300 group-hover/card:scale-110 ${accent.icon}`}
                  >
                    <Icon name={service.icon as IconName} size={30} />
                  </span>
                </div>

                <div className="flex flex-col gap-4 p-6">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-display text-xl font-semibold">
                      {service.title}
                    </h3>
                    <p className="text-sm text-ink-muted">{service.desc}</p>
                  </div>
                  <ul className="flex flex-col gap-2 pt-1">
                    {service.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-center gap-2 text-sm text-ink"
                      >
                        <Icon name="check" size={16} className="text-cyan" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
