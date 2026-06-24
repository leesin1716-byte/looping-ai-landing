"use client";
import { useEffect, useRef, useState } from "react";

export const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

/** Animates 0 → target over `duration` ms once `active` becomes true. */
export function useCountUp(
  target: number,
  { duration = 1400, active }: { duration?: number; active: boolean },
): number {
  const [value, setValue] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setValue(Math.round(easeOutCubic(t) * target));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [target, duration, active]);

  return value;
}
