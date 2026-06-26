"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { cn } from "@/src/lib/cn";
import { useReducedMotion } from "@/src/lib/useReducedMotion";
import ErrorBoundary from "./ErrorBoundary";

// WebGL is client-only and lazy-loaded so it never blocks first paint.
const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

export default function HeroScene({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShown(true), 150);
    return () => clearTimeout(t);
  }, []);

  // Under reduced motion we skip the 3D entirely and let the static
  // HeroBackdrop (aurora) carry the hero.
  if (reduced) return null;
  return (
    <div
      aria-hidden
      className={cn(
        "transition-opacity duration-1000 ease-out",
        shown ? "opacity-100" : "opacity-0",
        className,
      )}
    >
      {/* If WebGL is unavailable or the chunk errors, fall back silently to the
          static HeroBackdrop aurora instead of crashing the page. */}
      <ErrorBoundary>
        <HeroCanvas />
      </ErrorBoundary>
    </div>
  );
}
