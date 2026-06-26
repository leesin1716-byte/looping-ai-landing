import { cn } from "@/src/lib/cn";

export default function Section({
  id,
  className,
  containerClassName,
  children,
}: {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        // overflow-x-clip keeps decorative GradientBlobs from spilling past the
        // viewport (a horizontal-scroll bug on mobile) while still letting their
        // glow bleed vertically into neighbouring sections.
        "relative w-full overflow-x-clip py-24 md:py-32",
        className,
      )}
    >
      <div className={cn("mx-auto w-full max-w-6xl px-5 md:px-8", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
