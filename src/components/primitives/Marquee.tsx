"use client";
import { cn } from "@/src/lib/cn";
import { useReducedMotion } from "@/src/lib/useReducedMotion";

/** Horizontally scrolling strip of labels. Paused under reduced motion. */
export default function Marquee({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  const reduced = useReducedMotion();
  const row = [...items, ...items];
  return (
    <div className={cn("relative overflow-hidden", className)} aria-hidden>
      <div
        className={cn(
          "flex w-max items-center gap-10 whitespace-nowrap pr-10",
          !reduced && "animate-marquee",
        )}
      >
        {row.map((label, i) => (
          <span
            key={i}
            className="font-display text-sm uppercase tracking-[0.2em] text-ink-faint"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
