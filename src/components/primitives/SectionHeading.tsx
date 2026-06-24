import { cn } from "@/src/lib/cn";
import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <span className="font-display text-xs uppercase tracking-[0.25em] text-violet-soft">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-ink-muted md:text-lg",
            align === "center" && "max-w-2xl",
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
