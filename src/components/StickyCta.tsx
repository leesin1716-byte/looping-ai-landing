"use client";
import { useEffect, useState } from "react";
import { site } from "@/src/data/site";
import { cn } from "@/src/lib/cn";
import Icon from "@/src/components/primitives/Icon";

/**
 * Mobile-only sticky conversion bar. Slides up once the visitor scrolls past
 * the hero, and hides itself while the contact form is on screen (so it never
 * competes with the real form).
 */
export default function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.9;
      const contact = document.getElementById("contact");
      const contactInView = contact
        ? (() => {
            const r = contact.getBoundingClientRect();
            return r.top < window.innerHeight * 0.85 && r.bottom > 0;
          })()
        : false;
      setVisible(pastHero && !contactInView);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] md:hidden",
        "transition-transform duration-300 ease-out motion-reduce:transition-none",
        visible ? "translate-y-0" : "pointer-events-none translate-y-[150%]",
      )}
    >
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-surface/90 p-2 pl-4 shadow-glow backdrop-blur-xl">
        <div className="flex min-w-0 flex-col">
          <span className="text-sm font-semibold">지금 바로 시작하세요</span>
          <span className="truncate text-xs text-ink-muted">
            아이디어를 며칠 만에 웹으로
          </span>
        </div>
        <a
          href="#contact"
          tabIndex={visible ? undefined : -1}
          className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-gradient-to-r from-violet to-cyan px-5 py-2.5 text-sm font-medium text-white shadow-glow transition-transform motion-safe:active:scale-[0.97]"
        >
          {site.hero.cta}
          <Icon name="arrow-up-right" size={15} />
        </a>
      </div>
    </div>
  );
}
