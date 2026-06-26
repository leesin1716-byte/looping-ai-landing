"use client";
import { motion } from "framer-motion";
import { processSteps } from "@/src/data/process";
import Section from "@/src/components/primitives/Section";
import SectionHeading from "@/src/components/primitives/SectionHeading";
import Reveal from "@/src/components/primitives/Reveal";
import Icon, { type IconName } from "@/src/components/primitives/Icon";
import { useReducedMotion } from "@/src/lib/useReducedMotion";

export default function Process() {
  const reduced = useReducedMotion();

  return (
    <Section id="process">
      <SectionHeading
        eyebrow="Process"
        title="3단계면 충분합니다"
        subtitle="복잡한 절차 없이, 대화하듯 시작해서 배포까지."
      />

      <div className="relative mt-16">
        {/* Timeline thread linking the three steps (desktop). Draws in on view. */}
        <motion.span
          aria-hidden
          className="absolute left-[14%] right-[14%] top-12 z-0 hidden h-px origin-left bg-gradient-to-r from-violet via-cyan to-magenta shadow-[0_0_14px_rgba(139,92,246,0.55)] md:block"
          initial={reduced ? false : { scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
        />

        <div className="relative z-10 grid gap-6 md:grid-cols-3">
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
      </div>
    </Section>
  );
}
