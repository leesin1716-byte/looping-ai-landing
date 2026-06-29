import type { Metadata } from "next";
import Link from "next/link";
import { getInquiryById } from "@/src/lib/db";
import ReplyForm from "./ReplyForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "답장하기",
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

export default async function ReplyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numId = Number(id);
  const inquiry =
    Number.isInteger(numId) && numId > 0 ? await getInquiryById(numId) : null;

  return (
    <main className="min-h-screen px-5 py-12 md:px-8">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/admin"
          className="text-sm text-cyan-soft transition-opacity hover:opacity-80"
        >
          ← 문의 목록
        </Link>

        {!inquiry ? (
          <div className="mt-8 rounded-2xl glass p-10 text-center text-ink-muted">
            문의를 찾을 수 없습니다.
            <p className="mt-2 text-xs text-ink-faint">
              (DB가 연결되지 않았거나 삭제된 문의일 수 있습니다.)
            </p>
          </div>
        ) : (
          <>
            <header className="mt-4 border-b border-white/10 pb-6">
              <h1 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                답장하기
              </h1>
              <p className="mt-1 text-sm text-ink-muted">
                <span className="font-medium text-ink">{inquiry.name}</span>님에게
                회신합니다.
              </p>
            </header>

            <section className="mt-6 rounded-2xl glass p-5">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                <span className="font-display font-semibold">{inquiry.name}</span>
                <span className="text-sm text-cyan-soft">{inquiry.email}</span>
                <span className="rounded-full bg-violet/20 px-2.5 py-0.5 text-xs text-violet-soft">
                  {inquiry.project_type}
                </span>
                <span className="ml-auto text-xs text-ink-faint">
                  {fmt(inquiry.created_at)}
                </span>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-ink-muted">
                {inquiry.message}
              </p>
            </section>

            <ReplyForm id={inquiry.id} name={inquiry.name} email={inquiry.email} />
          </>
        )}
      </div>
    </main>
  );
}
