"use client";
import dynamic from "next/dynamic";
import { useReducedMotion } from "@/src/lib/useReducedMotion";

// WebGL is client-only and lazy-loaded so it never blocks first paint.
const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

export default function HeroScene({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  // Under reduced motion we skip the 3D entirely and let the static
  // HeroBackdrop (aurora) carry the hero.
  if (reduced) return null;
  return (
    <div aria-hidden className={className}>
      <HeroCanvas />
    </div>
  );
}
