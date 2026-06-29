import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/src/data/site";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: `${site.brand} 개인정보처리방침 — 문의 폼으로 수집하는 정보와 처리 방식을 안내합니다.`,
};

// NOTE: 일반적인 템플릿입니다. 실제 운영 정책·보관기간·사업자 정보에 맞게
// 이 파일의 문구를 수정하세요.
const EFFECTIVE_DATE = "2026-06-29";

function Article({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3 border-t border-white/10 pt-7">
      <h2 className="font-display text-lg font-semibold md:text-xl">
        <span className="mr-2 text-violet-soft">{n}.</span>
        {title}
      </h2>
      <div className="flex flex-col gap-2.5 text-sm leading-relaxed text-ink-muted md:text-[15px]">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen px-5 py-16 md:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="text-sm text-cyan-soft transition-opacity hover:opacity-80"
        >
          ← 홈으로
        </Link>

        <header className="mt-4 border-b border-white/10 pb-7">
          <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            개인정보처리방침
          </h1>
          <p className="mt-2 text-sm text-ink-muted">
            {site.brand}(이하 “회사”)는 이용자의 개인정보를 중요하게 생각하며,
            아래와 같이 처리합니다.
          </p>
          <p className="mt-1 text-xs text-ink-faint">시행일: {EFFECTIVE_DATE}</p>
        </header>

        <div className="mt-7 flex flex-col gap-7">
          <Article n={1} title="수집하는 개인정보 항목">
            <p>회사는 문의 응대를 위해 아래 정보를 수집합니다.</p>
            <ul className="ml-4 list-disc space-y-1.5">
              <li>문의 폼 입력 정보: 이름, 이메일 주소, 프로젝트 유형, 문의 내용</li>
              <li>
                자동 수집 정보: 스팸·악용 방지를 위한 접속 IP의 일방향 해시값
                (원본 IP는 저장하지 않습니다)
              </li>
            </ul>
          </Article>

          <Article n={2} title="수집 및 이용 목적">
            <ul className="ml-4 list-disc space-y-1.5">
              <li>문의 접수·확인 및 회신, 상담 진행</li>
              <li>서비스 제공을 위한 연락 및 견적 안내</li>
              <li>반복 제출·스팸 등 부정 이용 방지</li>
            </ul>
          </Article>

          <Article n={3} title="보유 및 이용 기간">
            <p>
              수집한 개인정보는 문의 처리 목적이 달성된 후 지체 없이 파기하는
              것을 원칙으로 합니다. 다만 관련 법령에 따라 보존이 필요한 경우 해당
              기간 동안 보관합니다.
            </p>
          </Article>

          <Article n={4} title="처리 위탁 및 제3자 제공">
            <p>
              회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다.
              다만 서비스 운영을 위해 아래와 같이 처리를 위탁할 수 있습니다.
            </p>
            <ul className="ml-4 list-disc space-y-1.5">
              <li>호스팅·인프라: Vercel</li>
              <li>문의 알림 이메일 발송: Resend</li>
              <li>문의 데이터 저장: 클라우드 데이터베이스(Postgres)</li>
            </ul>
            <p className="text-ink-faint">
              위탁받은 업체는 위탁 목적 범위 내에서만 정보를 처리합니다.
            </p>
          </Article>

          <Article n={5} title="이용자의 권리">
            <p>
              이용자는 자신의 개인정보에 대해 열람·정정·삭제·처리정지를 요청할 수
              있으며, 회사는 관련 법령에 따라 지체 없이 조치합니다. 요청은 아래
              연락처로 보내주시면 됩니다.
            </p>
          </Article>

          <Article n={6} title="개인정보 보호 문의">
            <p>
              개인정보 처리에 관한 문의·요청은 아래로 연락해 주세요.
            </p>
            <p>
              이메일:{" "}
              <a
                href={`mailto:${site.contactEmail}`}
                className="text-cyan-soft hover:underline"
              >
                {site.contactEmail}
              </a>
            </p>
          </Article>
        </div>

        <p className="mt-10 text-xs text-ink-faint">
          본 방침은 {EFFECTIVE_DATE}부터 적용됩니다. 내용이 변경되는 경우 본
          페이지를 통해 공지합니다.
        </p>
      </div>
    </main>
  );
}
