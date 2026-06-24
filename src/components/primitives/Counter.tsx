"use client";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { useCountUp } from "@/src/lib/useCountUp";
import { useReducedMotion } from "@/src/lib/useReducedMotion";
import { cn } from "@/src/lib/cn";

export default function Counter({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const animated = useCountUp(value, { active: inView && !reduced });

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {reduced ? value : animated}
      {suffix}
    </span>
  );
}
