import { testimonials } from "@/src/data/testimonials";
import Section from "@/src/components/primitives/Section";
import SectionHeading from "@/src/components/primitives/SectionHeading";
import Reveal from "@/src/components/primitives/Reveal";
import Icon from "@/src/components/primitives/Icon";

export default function Testimonials() {
  return (
    <Section id="testimonials">
      <SectionHeading
        eyebrow="Reviews"
        title="고객들의 이야기"
        subtitle="결과물과 경험, 두 가지 모두 만족시키는 것이 목표입니다."
      />

      <div className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:overflow-visible md:pb-0">
        {testimonials.map((t, i) => (
          <Reveal
            key={t.id}
            delay={i * 0.08}
            className="min-w-[85%] snap-center sm:min-w-[55%] md:min-w-0"
          >
            <figure className="flex h-full flex-col gap-5 rounded-2xl glass p-7">
              <Icon name="sparkles" className="text-violet-soft" />
              <blockquote className="text-ink md:text-lg">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3 pt-2">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-violet to-cyan text-sm font-bold text-white">
                  {t.author.slice(0, 1)}
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{t.author}</span>
                  <span className="text-xs text-ink-muted">{t.role}</span>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
