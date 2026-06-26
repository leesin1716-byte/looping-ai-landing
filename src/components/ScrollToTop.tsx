"use client";
import { useEffect, useState } from "react";
import { cn } from "@/src/lib/cn";
import Icon from "@/src/components/primitives/Icon";

/**
 * Desktop "back to top" button (mobile already has the sticky CTA bar there).
 * It's an anchor to #top, so the existing Lenis handler smooth-scrolls it — and
 * it falls back to a native jump under prefers-reduced-motion.
 */
export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 1.2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="#top"
      aria-label="맨 위로 이동"
      aria-hidden={!show}
      tabIndex={show ? undefined : -1}
      className={cn(
        "fixed bottom-6 right-6 z-40 hidden h-11 w-11 place-items-center rounded-full glass text-ink shadow-glow backdrop-blur-xl transition-all duration-300 md:grid",
        "hover:-translate-y-0.5 hover:border-white/25 hover:text-violet-soft motion-safe:active:scale-95",
        show ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <Icon name="chevron-down" size={20} className="rotate-180" />
    </a>
  );
}
