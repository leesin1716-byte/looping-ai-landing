import { cn } from "@/src/lib/cn";

export type IconName =
  | "rocket"
  | "sparkles"
  | "chart"
  | "bolt"
  | "tag"
  | "gem"
  | "chat"
  | "arrow-up-right"
  | "check"
  | "menu"
  | "close"
  | "mail"
  | "github"
  | "loop"
  | "chevron-down";

const PATHS: Record<IconName, React.ReactNode> = {
  rocket: (
    <>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 3l1.9 4.6L18.5 9.5 13.9 11.4 12 16l-1.9-4.6L5.5 9.5l4.6-1.9z" />
      <path d="M19 14l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" />
    </>
  ),
  chart: (
    <>
      <path d="M3 3v18h18" />
      <rect x="7" y="11" width="3" height="6" rx="1" />
      <rect x="12.5" y="7" width="3" height="10" rx="1" />
      <rect x="18" y="13" width="3" height="4" rx="1" />
    </>
  ),
  bolt: <path d="M13 2L4.5 13.5H11l-1 8.5L19.5 10.5H13z" />,
  tag: (
    <>
      <path d="M3 11.5V4a1 1 0 0 1 1-1h7.5a2 2 0 0 1 1.4.6l7.5 7.5a2 2 0 0 1 0 2.8l-7 7a2 2 0 0 1-2.8 0L3.6 12.9A2 2 0 0 1 3 11.5z" />
      <circle cx="7.5" cy="7.5" r="1.2" />
    </>
  ),
  gem: (
    <>
      <path d="M6 3h12l4 6-10 12L2 9z" />
      <path d="M2 9h20M9 3l-3 6 6 12 6-12-3-6" />
    </>
  ),
  chat: (
    <path d="M21 12a8 8 0 0 1-8 8 8.5 8.5 0 0 1-3.6-.8L3 21l1.8-6.4A8 8 0 1 1 21 12z" />
  ),
  "arrow-up-right": <path d="M7 17L17 7M9 7h8v8" />,
  check: <path d="M20 6L9 17l-5-5" />,
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  github: (
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.7A5.2 5.2 0 0 0 19 4.8a4.8 4.8 0 0 0-.1-3.6s-1.1-.3-3.7 1.4a12.6 12.6 0 0 0-6.4 0C6.2.9 5.1 1.2 5.1 1.2A4.8 4.8 0 0 0 5 4.8a5.2 5.2 0 0 0-1.4 3.7c0 5.2 3.2 6.4 6.2 6.7a3.4 3.4 0 0 0-.9 2.6V22" />
  ),
  loop: (
    <>
      <path d="M17 7a6 6 0 1 0 1.7 4.2" />
      <path d="M17 3v4h-4" />
    </>
  ),
  "chevron-down": <path d="M6 9l6 6 6-6" />,
};

export default function Icon({
  name,
  className,
  size = 24,
}: {
  name: IconName;
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      aria-hidden
    >
      {PATHS[name]}
    </svg>
  );
}
