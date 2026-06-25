"use client";
import { cn } from "@/src/lib/cn";
import { useReducedMotion } from "@/src/lib/useReducedMotion";

/**
 * On-brand animated hero backdrop: a neon aurora over a faint tech grid.
 * Replaces the previous external 3D embed so no foreign content bleeds into
 * the hero. Static under reduced motion.
 */
export default function HeroBackdrop({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  return (
    <div aria-hidden className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* faint grid, masked toward the right side */}
      <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:54px_54px] [mask-image:radial-gradient(ellipse_55%_60%_at_72%_42%,#000,transparent_72%)]" />

      {/* main neon aurora, concentrated where the hero copy isn't */}
      <div
        className={cn(
          "absolute right-[-16%] top-[-14%] h-[72vh] w-[60vw] rounded-full opacity-60 blur-[90px] mix-blend-screen",
          "bg-[conic-gradient(from_140deg_at_55%_45%,#8b5cf6_0deg,#22d3ee_130deg,#d946ef_250deg,#8b5cf6_360deg)]",
          !reduced && "animate-aurora",
        )}
      />

      {/* cool secondary glow for depth */}
      <div className="absolute right-[8%] top-[30%] h-[32vh] w-[32vh] rounded-full bg-cyan/25 opacity-60 blur-[80px]" />
    </div>
  );
}
