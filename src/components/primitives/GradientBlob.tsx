"use client";
import { cn } from "@/src/lib/cn";
import { useReducedMotion } from "@/src/lib/useReducedMotion";

/** Animated mesh blob used as a soft background glow. Static under reduced motion. */
export default function GradientBlob({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute -z-10 h-[42rem] w-[42rem] rounded-full opacity-40 blur-[120px]",
        "bg-[radial-gradient(circle_at_30%_30%,#8b5cf6,transparent_60%),radial-gradient(circle_at_70%_70%,#22d3ee,transparent_55%)]",
        !reduced && "animate-blob",
        className,
      )}
    />
  );
}
