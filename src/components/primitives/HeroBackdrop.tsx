"use client";
import { cn } from "@/src/lib/cn";
import { useReducedMotion } from "@/src/lib/useReducedMotion";

// Floating ambient dots, weighted toward the left/center so the hero doesn't
// feel empty opposite the 3D crystal.
const DOTS = [
  { left: "10%", top: "32%", color: "text-violet", delay: "0s" },
  { left: "20%", top: "64%", color: "text-cyan", delay: "1.2s" },
  { left: "34%", top: "24%", color: "text-magenta", delay: "0.6s" },
  { left: "28%", top: "78%", color: "text-violet-soft", delay: "1.9s" },
  { left: "46%", top: "50%", color: "text-cyan", delay: "0.9s" },
  { left: "7%", top: "52%", color: "text-violet", delay: "2.3s" },
  { left: "40%", top: "70%", color: "text-violet-soft", delay: "1.5s" },
];

/**
 * On-brand animated hero backdrop: a tech grid + neon auroras + floating dots.
 * Fills the whole hero (incl. the side opposite the 3D crystal). Static under
 * reduced motion.
 */
export default function HeroBackdrop({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  return (
    <div aria-hidden className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* tech grid across the hero with a soft vignette */}
      <div className="absolute inset-0 opacity-[0.13] [background-image:linear-gradient(to_right,rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:52px_52px] [mask-image:radial-gradient(ellipse_95%_85%_at_50%_38%,#000_45%,transparent_82%)]" />

      {/* left-side glow to fill the empty side */}
      <div className="absolute left-[-12%] top-[16%] h-[56vh] w-[42vw] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.22),transparent_65%)] opacity-70 blur-[90px]" />

      {/* main neon aurora on the right */}
      <div
        className={cn(
          "absolute right-[-16%] top-[-14%] h-[72vh] w-[60vw] rounded-full opacity-60 blur-[90px] mix-blend-screen",
          "bg-[conic-gradient(from_140deg_at_55%_45%,#8b5cf6_0deg,#22d3ee_130deg,#d946ef_250deg,#8b5cf6_360deg)]",
          !reduced && "animate-aurora",
        )}
      />

      {/* cool secondary glow */}
      <div className="absolute right-[8%] top-[30%] h-[32vh] w-[32vh] rounded-full bg-cyan/25 opacity-60 blur-[80px]" />

      {/* floating neon dots for ambient detail */}
      {DOTS.map((dot, i) => (
        <span
          key={i}
          className={cn(
            "absolute h-1.5 w-1.5 rounded-full bg-current opacity-70 shadow-[0_0_10px_currentColor]",
            dot.color,
            !reduced && "animate-float",
          )}
          style={{ left: dot.left, top: dot.top, animationDelay: dot.delay }}
        />
      ))}
    </div>
  );
}
