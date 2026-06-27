import type { Metadata } from "next";
import { getInquiries } from "@/src/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "문의 관리",
  robots: { index: false, follow: false },
};

function fmt(ts: string) {
  const d = new Date(ts);
  if (Number.isNaN(d.getTime())) return ts;
  return d.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AdminPage() {
  const rows = await getInquiries();

  return (
    <main className="min-h-screen px-5 py-12 md:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-wrap items-end justify-between gap-3 border-b border-white/10 pb-6">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              문의 관리
            </h1>
            <p className="mt-1 text-sm text-ink-muted">
              접수된 문의를 최신순으로 확인합니다.
            </p>
          </div>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-sm">
            총 <span className="font-semibold text-cyan-soft">{rows.length}</span>건
          </span>
        </header>

        {rows.length === 0 ? (
          <div className="mt-10 rounded-2xl glass p-10 text-center text-ink-muted">
            아직 접수된 문의가 없습니다.
            <p className="mt-2 text-xs text-ink-faint">
              (DB가 연결되지 않았다면 Vercel Storage→Postgres 설정 후 표시됩니다.)
            </p>
          </div>
        ) : (
          <ul className="mt-8 flex flex-col gap-4">
            {rows.map((r) => (
              <li
                key={r.id}
                className="rounded-2xl glass p-5 transition-colors hover:border-white/20"
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <span className="font-display font-semibold">{r.name}</span>
                  <a
                    href={`mailto:${r.email}`}
                    className="text-sm text-cyan-soft hover:underline"
                  >
                    {r.email}
                  </a>
                  <span className="rounded-full bg-violet/20 px-2.5 py-0.5 text-xs text-violet-soft">
                    {r.project_type}
                  </span>
                  <span className="ml-auto text-xs text-ink-faint">
                    {fmt(r.created_at)}
                  </span>
                </div>
                <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-ink-muted">
                  {r.message}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
