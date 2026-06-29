"use client";
import { cn } from "@/src/lib/cn";
import Icon from "@/src/components/primitives/Icon";

/**
 * Pricing CTA. Scrolls to the contact form (href) and, on click, dispatches a
 * "prefill-project-type" event the form listens for — so picking a package
 * pre-selects the matching 프로젝트 유형. No URL change, so no page reload.
 */
export default function PackageCta({
  type,
  highlight,
  label,
}: {
  type?: string;
  highlight: boolean;
  label: string;
}) {
  return (
    <a
      href="#contact"
      onClick={() => {
        if (type) {
          window.dispatchEvent(
            new CustomEvent("prefill-project-type", { detail: type }),
          );
        }
      }}
      className={cn(
        "relative mt-7 inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold transition-transform motion-safe:active:scale-95",
        highlight
          ? "bg-gradient-to-r from-violet to-cyan text-white shadow-glow"
          : "border border-white/10 bg-white/[0.04] hover:border-white/25",
      )}
    >
      {label}
      <Icon name="arrow-up-right" size={15} />
    </a>
  );
}
