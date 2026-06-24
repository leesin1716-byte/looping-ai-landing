"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { processSteps } from "@/src/data/process";
import Section from "@/src/components/primitives/Section";
import SectionHeading from "@/src/components/primitives/SectionHeading";
import Reveal from "@/src/components/primitives/Reveal";
import { useReducedMotion } from "@/src/lib/useReducedMotion";

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <Section id="process">
      <SectionHeading
        eyebrow="Process"
        title="3단계면 충분합니다"
        subtitle="복잡한 절차 없이, 대화하듯 시작해서 배포까지."
      />

      <div ref={ref} className="relative mt-16">
        <div className="absolute left-7 top-0 h-full w-px bg-white/10 md:left-0 md:top-7 md:h-px md:w-full" />
        <motion.div
          aria-hidden
          style={reduced ? { scaleX: 1, scaleY: 1 } : { scaleX: progress, scaleY: progress }}
          className="absolute left-7 top-0 h-full w-px origin-top bg-gradient-to-b from-violet to-cyan md:left-0 md:top-7 md:h-px md:w-full md:origin-left md:bg-gradient-to-r"
        />

        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {processSteps.map((s, i) => (
            <Reveal
              key={s.step}
              delay={i * 0.12}
              className="relative flex gap-5 md:flex-col"
            >
              <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl glass font-display text-xl font-bold text-gradient">
                {s.step}
              </span>
              <div className="flex flex-col gap-2 pt-2 md:pt-1">
                <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                <p className="text-sm text-ink-muted">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
