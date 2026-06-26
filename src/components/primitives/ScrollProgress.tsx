"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import { useReducedMotion } from "@/src/lib/useReducedMotion";

export default function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });
  // Reduced-motion: track scroll exactly (no springy easing/overshoot).
  const scaleX = reduced ? scrollYProgress : smooth;
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-gradient-to-r from-violet via-cyan to-magenta"
    />
  );
}
