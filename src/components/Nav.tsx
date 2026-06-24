"use client";
import { useEffect, useState } from "react";
import { site } from "@/src/data/site";
import { cn } from "@/src/lib/cn";
import MagneticButton from "@/src/components/primitives/MagneticButton";
import Icon from "@/src/components/primitives/Icon";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = site.nav
      .map((n) => document.getElementById(n.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2.5" : "py-4",
      )}
    >
      <nav
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 md:px-6 transition-all duration-300",
          scrolled ? "glass shadow-glow" : "border border-transparent",
        )}
      >
        <a
          href="#top"
          className="flex items-center gap-2 font-display text-lg font-bold tracking-tight"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-violet to-cyan text-white">
            <Icon name="loop" size={18} />
          </span>
          {site.brand}
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {site.nav.map((link) => {
            const isActive = active === link.href;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    "group/nav relative text-sm transition-colors hover:text-ink",
                    isActive ? "text-ink" : "text-ink-muted",
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-1.5 left-0 h-px w-full origin-left bg-gradient-to-r from-violet to-cyan transition-transform duration-300",
                      isActive ? "scale-x-100" : "scale-x-0 group-hover/nav:scale-x-100",
                    )}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:block">
          <MagneticButton href="#contact" className="px-5 py-2.5 text-sm">
            {site.hero.cta}
          </MagneticButton>
        </div>

        <button
          type="button"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-xl glass md:hidden"
        >
          <Icon name={open ? "close" : "menu"} size={20} />
        </button>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl px-4 md:hidden">
          <ul className="glass flex flex-col gap-1 rounded-2xl p-3">
            {site.nav.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-ink-muted transition-colors hover:bg-white/5 hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="px-1 pt-2">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="block rounded-xl bg-gradient-to-r from-violet to-cyan px-4 py-3 text-center font-medium text-white"
              >
                {site.hero.cta}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
