# Looping Ai — 랜딩페이지

AI 바이브코더 **Looping Ai**의 서비스(수주) 랜딩페이지. 단일 전환 목표는 **문의 폼 제출**이며, 페이지의 비주얼·인터랙션 퀄리티 자체가 포트폴리오 역할을 합니다.

다크 프리미엄 + 네온 톤, 커스텀 3D 히어로(Three.js), 스크롤 리빌·3D 틸트·마그네틱 버튼·카운트업 등 인터랙션을 갖춘 한국어 단일 페이지입니다.

## 기술 스택

- **Next.js 15 (App Router) + TypeScript**
- **Tailwind CSS v4** (CSS `@theme` 디자인 토큰)
- **Framer Motion** (애니메이션) · **Lenis** (부드러운 스크롤)
- **Three.js + React Three Fiber + drei** (커스텀 네온 3D 히어로, 지연 로딩)
- 폰트: **Pretendard**(본문/한글) + **Space Grotesk**(디스플레이)
- 문의 처리: **Postgres**(저장) + **Resend**(이메일 알림) — 서버 라우트
- 테스트: **Vitest** (검증·카운트업 로직)
- 배포: **Vercel**

## 시작하기

```bash
npm install

# 환경변수 설정: .env.local.example 을 복사해 키 입력
cp .env.local.example .env.local
# RESEND_API_KEY=... (https://resend.com 무료) · POSTGRES_URL (Vercel Storage→Postgres)

npm run dev      # 개발 서버 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 빌드 결과 서빙
npm run test     # 단위 테스트
npm run lint     # 린트
```

## 문의 처리 (저장 + 이메일)

- 제출은 `src/lib/contact.ts` → 서버 라우트 `app/api/contact/route.ts`로 처리됩니다. 서버에서 재검증·허니팟 후 **① Postgres DB 저장**(`src/lib/db.ts`, `POSTGRES_URL`) + **② Resend 이메일 알림**(`src/lib/email.ts`, `RESEND_API_KEY` → `site.contactEmail`로 발송)을 수행합니다. **둘 중 하나만 설정돼도** 동작하고, 모두 서버 사이드라 키가 노출되지 않습니다.
- **이메일 알림(Resend):** [resend.com](https://resend.com)에서 무료 API 키 발급 → `RESEND_API_KEY` 설정. 도메인 미인증 시 기본 발신자(`onboarding@resend.dev`)는 **본인 Resend 계정 이메일로만** 보내지므로, 알림 받을 주소로 가입하세요. (커스텀 도메인 인증 후 `RESEND_FROM`으로 발신자 변경 가능.)
- **문의 저장(Postgres):** Vercel **Storage → Marketplace → Neon(Postgres)** 생성(→ `POSTGRES_URL`/`DATABASE_URL` 자동 주입) 후 재배포. 저장된 문의는 `SELECT * FROM inquiries ORDER BY created_at DESC`로 확인합니다.
- **스팸·도배 방지(다층):** ① 허니팟 필드, ② 타임트랩(렌더 후 2초 미만 제출은 봇으로 간주해 조용히 무시), ③ **IP 레이트리밋** — 같은 IP 기준 분당 3회·15분당 6회 초과 시 `429` 반환. 메모리 한도(인스턴스별·즉시) + Postgres 카운트(인스턴스 간 권위 한도)를 함께 사용하며, IP는 `IP_HASH_SALT`로 **해시 저장**(원본 IP는 저장 안 함). 자동화 봇 대량 공격까지 막으려면 Cloudflare Turnstile 같은 캡차 추가를 권장합니다.

## 콘텐츠 수정

모든 텍스트·숫자·작업물·후기는 `src/data/`에서만 수정합니다(코드 변경 불필요):

| 파일 | 내용 |
|---|---|
| `src/data/site.ts` | 브랜드, 내비, 히어로 카피, 마퀴, 소셜, 이메일 |
| `src/data/services.ts` | 서비스 3종 |
| `src/data/portfolio.ts` | 작업물(배열에 객체 추가 시 자동 노출) |
| `src/data/process.ts` | 진행 단계 |
| `src/data/stats.ts` | 실적 숫자 (현재 예시값) |
| `src/data/testimonials.ts` | 후기 (현재 예시값) |
| `src/data/why.ts` | 차별점 |

> **⚠️ 출시 전 체크리스트 (실제 데이터로 교체):**
> - `stats.ts` 실적 숫자 · `testimonials.ts` 후기 — 현재 **플레이스홀더(예시값)**. 실제 값으로 바꾸기 전에는 사실인 것처럼 노출하지 마세요.
> - 연락 이메일은 `wchhistory@naver.com`로 설정됨. 소셜 링크(GitHub 등)는 필요 시 `site.ts`에 추가.
> - 문의 폼 동작: **`RESEND_API_KEY`**(이메일 알림) 그리고/또는 **Storage→Postgres**(`POSTGRES_URL` → `inquiries` 저장) 중 하나 이상 설정.

## 접근성·성능

- `prefers-reduced-motion`을 존중합니다: 블롭/틸트/마퀴/카운트업 정지, 3D 히어로는 정적 오로라 배경으로 폴백.
- 3D 히어로(Three.js)는 지연 로딩되며, 모바일에서는 오로라 배경만 표시해 가볍게 유지합니다.
- 모바일 우선 반응형.

## 배포 (Vercel)

1. 저장소를 Vercel에 연결합니다.
2. 환경변수 `RESEND_API_KEY`(이메일)와 Postgres(`POSTGRES_URL`)를 설정합니다.
3. 배포하면 끝입니다.

## 디자인 문서

- 설계 스펙: `docs/superpowers/specs/2026-06-24-looping-ai-landing-design.md`
- 구현 계획: `docs/superpowers/plans/2026-06-25-looping-ai-landing.md`
