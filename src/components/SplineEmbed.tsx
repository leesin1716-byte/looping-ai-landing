"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/src/lib/cn";
import { useReducedMotion } from "@/src/lib/useReducedMotion";

const SPLINE_URL =
  "https://my.spline.design/distortingtypography-HVtSRPvAe6lsZmpevIW7Ydk0/";

/** Lazy-mounts the Spline iframe near view; static gradient fallback under reduced motion. */
export default function SplineEmbed({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (reduced || !ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [reduced]);

  return (
    <div ref={ref} className={cn("relative h-full w-full overflow-hidden", className)}>
      {show && !reduced ? (
        <iframe
          src={SPLINE_URL}
          title="Looping Ai 3D"
          loading="lazy"
          className="h-full w-full"
          style={{ border: 0 }}
        />
      ) : (
        <div
          aria-hidden
          className="h-full w-full bg-[radial-gradient(circle_at_50%_38%,rgba(139,92,246,0.38),transparent_60%),radial-gradient(circle_at_72%_68%,rgba(34,211,238,0.28),transparent_55%)]"
        />
      )}
    </div>
  );
}
