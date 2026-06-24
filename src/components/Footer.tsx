import { site } from "@/src/data/site";
import Icon from "@/src/components/primitives/Icon";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3 md:px-8">
        <div className="flex flex-col gap-3">
          <a
            href="#top"
            className="flex w-fit items-center gap-2 font-display text-lg font-bold"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-violet to-cyan text-white">
              <Icon name="loop" size={18} />
            </span>
            {site.brand}
          </a>
          <p className="max-w-xs text-sm text-ink-muted">
            당신의 아이디어, 며칠 만에 웹으로.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium text-ink">바로가기</span>
          <ul className="flex flex-col gap-2">
            {site.nav.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-ink-muted transition-colors hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium text-ink">연결</span>
          <ul className="flex flex-col gap-2">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  className="text-sm text-ink-muted transition-colors hover:text-ink"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-6 sm:flex-row md:px-8">
          <span className="text-xs text-ink-faint">
            © {year} {site.brand}. All rights reserved.
          </span>
          <span className="text-xs text-ink-faint">Built with Next.js</span>
        </div>
      </div>
    </footer>
  );
}
