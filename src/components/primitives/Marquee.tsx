"use client";
import { cn } from "@/src/lib/cn";
import { useReducedMotion } from "@/src/lib/useReducedMotion";

/** Horizontally scrolling tech strip with neon dot separators. Paused under reduced motion. */
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
          "flex w-max items-center whitespace-nowrap",
          !reduced && "animate-marquee",
        )}
      >
        {row.map((label, i) => (
          <span key={i} className="flex items-center">
            <span className="font-display text-sm font-medium uppercase tracking-[0.22em] text-ink-muted/80 transition-colors">
              {label}
            </span>
            <span
              aria-hidden
              className="mx-7 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-violet to-cyan shadow-[0_0_8px_rgba(139,92,246,0.7)]"
            />
          </span>
        ))}
      </div>
    </div>
  );
}
