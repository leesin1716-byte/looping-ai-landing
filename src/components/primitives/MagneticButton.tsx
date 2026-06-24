"use client";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/src/lib/cn";
import { useReducedMotion } from "@/src/lib/useReducedMotion";

export default function MagneticButton({
  href,
  children,
  className,
  onClick,
  variant = "primary",
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-2xl px-7 py-3.5 font-medium transition-shadow duration-300";
  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-violet to-cyan text-white shadow-glow hover:shadow-[0_0_60px_-6px_rgba(139,92,246,0.7)]"
      : "glass text-ink hover:bg-white/[0.08]";

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={cn(base, styles, className)}
    >
      {children}
    </motion.a>
  );
}
