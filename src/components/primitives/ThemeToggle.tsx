"use client";
import { useEffect, useState } from "react";
import Icon from "@/src/components/primitives/Icon";
import { cn } from "@/src/lib/cn";

/** Dark/light theme toggle. The chosen theme is applied before paint by the
 *  inline script in the layout; this just flips the class and persists it. */
export default function ThemeToggle({ className }: { className?: string }) {
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(document.documentElement.classList.contains("light"));
  }, []);

  const toggle = () => {
    const isLight = document.documentElement.classList.toggle("light");
    try {
      localStorage.setItem("theme", isLight ? "light" : "dark");
    } catch {}
    setLight(isLight);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={light ? "다크 모드로 전환" : "라이트 모드로 전환"}
      title={light ? "다크 모드" : "라이트 모드"}
      className={cn(
        "grid h-10 w-10 place-items-center rounded-xl glass text-ink-muted transition-colors hover:text-ink",
        className,
      )}
    >
      <Icon name={light ? "moon" : "sun"} size={18} />
    </button>
  );
}
