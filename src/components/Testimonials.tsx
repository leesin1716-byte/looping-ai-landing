"use client";
import { testimonials } from "@/src/data/testimonials";
import type { Testimonial } from "@/src/types";
import Section from "@/src/components/primitives/Section";
import SectionHeading from "@/src/components/primitives/SectionHeading";
import Reveal from "@/src/components/primitives/Reveal";
import Icon from "@/src/components/primitives/Icon";
import { cn } from "@/src/lib/cn";
import { useReducedMotion } from "@/src/lib/useReducedMotion";

function Card({ t, className }: { t: Testimonial; className?: string }) {
  return (
    <figure
      className={cn(
        "flex h-full w-full flex-col gap-4 rounded-2xl glass p-6",
        className,
      )}
    >
      <Icon name="sparkles" className="text-violet-soft" />
      <blockquote className="text-sm leading-relaxed text-ink md:text-base">
        “{t.quote}”
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-3 pt-1">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet to-cyan text-sm font-bold text-white">
          {t.author.slice(0, 1)}
        </span>
        <div className="flex flex-col">
          <span className="text-sm font-medium">{t.author}</span>
          <span className="text-xs text-ink-muted">{t.role}</span>
        </div>
      </figcaption>
    </figure>
  );
}

/** One seamless auto-scrolling row (content duplicated so -50% loops cleanly). */
function Row({ items, reverse }: { items: Testimonial[]; reverse?: boolean }) {
  return (
    <div
      className={cn(
        "flex w-max gap-5 pr-5 animate-marquee-slow group-hover:[animation-play-state:paused]",
        reverse && "[animation-direction:reverse]",
      )}
    >
      {[...items, ...items].map((t, i) => (
        <Card
          key={`${t.id}-${i}`}
          t={t}
          className="w-[300px] shrink-0 sm:w-[360px]"
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const reduced = useReducedMotion();
  const row1 = testimonials.slice(0, 3);
  const row2 = testimonials.slice(3);

  return (
    <Section id="testimonials">
      <SectionHeading
        eyebrow="Reviews"
        title="고객들의 이야기"
        subtitle="결과물과 경험, 두 가지 모두 만족시키는 것이 목표입니다."
      />

      {reduced ? (
        // Reduced motion: a calm static grid / swipe carousel, no auto-scroll.
        <div className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="min-w-[85%] snap-center sm:min-w-[55%] md:min-w-0"
            >
              <Card t={t} />
            </div>
          ))}
        </div>
      ) : (
        <Reveal>
          <div className="group mt-14 flex flex-col gap-5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]">
            <Row items={row1} />
            <Row items={row2} reverse />
          </div>
        </Reveal>
      )}
    </Section>
  );
}
