import { services } from "@/src/data/services";
import Section from "@/src/components/primitives/Section";
import SectionHeading from "@/src/components/primitives/SectionHeading";
import TiltCard from "@/src/components/primitives/TiltCard";
import Reveal from "@/src/components/primitives/Reveal";
import Icon, { type IconName } from "@/src/components/primitives/Icon";

export default function Services() {
  return (
    <Section id="services">
      <SectionHeading
        eyebrow="Services"
        title="무엇을 만들어 드릴까요"
        subtitle="필요한 건 하나든 전부든. 아이디어를 동작하는 웹으로 바꿔 드립니다."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {services.map((service, i) => (
          <Reveal key={service.id} delay={i * 0.1}>
            <TiltCard className="h-full p-7">
              <div className="flex h-full flex-col gap-5">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet/30 to-cyan/20 text-violet-soft">
                  <Icon name={service.icon as IconName} />
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-xl font-semibold">
                    {service.title}
                  </h3>
                  <p className="text-sm text-ink-muted">{service.desc}</p>
                </div>
                <ul className="mt-auto flex flex-col gap-2 pt-2">
                  {service.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-center gap-2 text-sm text-ink"
                    >
                      <Icon
                        name="check"
                        size={16}
                        className="text-cyan"
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
