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
    <section id={id} className={cn("relative w-full py-24 md:py-32", className)}>
      <div className={cn("mx-auto w-full max-w-6xl px-5 md:px-8", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
