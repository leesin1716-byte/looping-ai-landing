"use client";
import { motion, type Variants } from "framer-motion";
import { site } from "@/src/data/site";
import { cn } from "@/src/lib/cn";
import MagneticButton from "@/src/components/primitives/MagneticButton";
import GradientBlob from "@/src/components/primitives/GradientBlob";
import Marquee from "@/src/components/primitives/Marquee";
import Icon from "@/src/components/primitives/Icon";
import SplineEmbed from "@/src/components/SplineEmbed";
import { useReducedMotion } from "@/src/lib/useReducedMotion";

export default function Hero() {
  const reduced = useReducedMotion();
  const lines = site.hero.headline.split("\n");

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const item: Variants = reduced
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
      };

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-80">
        <SplineEmbed className="h-full w-full" />
      </div>
      <GradientBlob className="-left-40 top-0" />
      <GradientBlob className="-right-40 bottom-0" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-bg/50 via-bg/20 to-bg" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-bg via-bg/40 to-transparent" />

      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex max-w-3xl flex-col items-start gap-6"
        >
          <motion.span
            variants={item}
            className="glass w-fit rounded-full px-4 py-1.5 text-xs text-ink-muted"
          >
            AI 바이브코더 · 빠른 웹 제작
          </motion.span>

          <motion.h1
            variants={item}
            className="break-keep font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-7xl"
          >
            {lines.map((line, i) => (
              <span
                key={i}
                className={cn("block", i === lines.length - 1 && "text-gradient")}
              >
                {line}
              </span>
            ))}
          </motion.h1>

          <motion.p
            variants={item}
            className="max-w-xl break-keep text-lg text-ink-muted md:text-xl"
          >
            {site.hero.sub}
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <MagneticButton href="#contact">{site.hero.cta}</MagneticButton>
            <MagneticButton href="#portfolio" variant="ghost">
              작업물 보기
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-6 flex flex-col items-center gap-4">
        <a
          href="#services"
          aria-label={site.hero.scrollCue}
          className="flex flex-col items-center gap-1 text-ink-faint transition-colors hover:text-ink-muted"
        >
          <span className="text-xs tracking-wide">{site.hero.scrollCue}</span>
          <Icon name="chevron-down" size={18} className="animate-float" />
        </a>
        <Marquee items={site.marquee} className="fade-x w-full max-w-3xl" />
      </div>
    </section>
  );
}
