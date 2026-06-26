# Looping Ai — 랜딩페이지

AI 바이브코더 **Looping Ai**의 서비스(수주) 랜딩페이지. 단일 전환 목표는 **문의 폼 제출**이며, 페이지의 비주얼·인터랙션 퀄리티 자체가 포트폴리오 역할을 합니다.

다크 프리미엄 + 네온 톤, 커스텀 3D 히어로(Three.js), 스크롤 리빌·3D 틸트·마그네틱 버튼·카운트업 등 인터랙션을 갖춘 한국어 단일 페이지입니다.

## 기술 스택

- **Next.js 15 (App Router) + TypeScript**
- **Tailwind CSS v4** (CSS `@theme` 디자인 토큰)
- **Framer Motion** (애니메이션) · **Lenis** (부드러운 스크롤)
- **Three.js + React Three Fiber + drei** (커스텀 네온 3D 히어로, 지연 로딩)
- 폰트: **Pretendard**(본문/한글) + **Space Grotesk**(디스플레이)
- 문의 폼: **Web3Forms**
- 테스트: **Vitest** (검증·카운트업 로직)
- 배포: **Vercel**

## 시작하기

```bash
npm install

# 환경변수 설정: .env.local.example 을 복사해 키 입력
cp .env.local.example .env.local
# WEB3FORMS_KEY=... (https://web3forms.com 에서 무료 발급)

npm run dev      # 개발 서버 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 빌드 결과 서빙
npm run test     # 단위 테스트
npm run lint     # 린트
```

## 문의 폼 (Web3Forms)

- [web3forms.com](https://web3forms.com)에서 이메일만으로 무료 access key를 발급받아 `WEB3FORMS_KEY`에 넣으면 즉시 동작합니다.
- 키가 없으면 폼은 "설정되지 않았습니다" 안내를 표시합니다(빌드는 정상).
- 제출은 클라이언트 `src/lib/contact.ts` → 서버 라우트 `app/api/contact/route.ts`로 처리됩니다. 서버에서 재검증·허니팟 처리 후 **① Postgres DB 저장(`src/lib/db.ts`, `POSTGRES_URL` 설정 시 `inquiries` 테이블 자동 생성·적재) + ② Web3Forms 이메일 알림**을 수행하며, **둘 중 하나만 설정돼도** 동작합니다. 키는 서버에만 둡니다(브라우저 노출 없음).
- 문의를 DB에 쌓으려면 Vercel **Storage → Postgres** 생성(→ `POSTGRES_URL` 자동 주입) 후 재배포하세요. 저장된 문의는 Vercel/Neon 콘솔에서 `SELECT * FROM inquiries ORDER BY created_at DESC`로 확인합니다.
- 스팸 방지를 위한 허니팟 필드와 클라이언트 검증(필수값·이메일 형식)이 포함되어 있습니다.

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
> - 문의 폼 동작: Vercel 환경변수 **`WEB3FORMS_KEY`**(이메일 알림) 그리고/또는 **Storage→Postgres**(`POSTGRES_URL` 자동 주입 → `inquiries` 테이블 저장) 중 하나 이상 설정.

## 접근성·성능

- `prefers-reduced-motion`을 존중합니다: 블롭/틸트/마퀴/카운트업 정지, 3D 히어로는 정적 오로라 배경으로 폴백.
- 3D 히어로(Three.js)는 지연 로딩되며, 모바일에서는 오로라 배경만 표시해 가볍게 유지합니다.
- 모바일 우선 반응형.

## 배포 (Vercel)

1. 저장소를 Vercel에 연결합니다.
2. 환경변수 `WEB3FORMS_KEY`를 추가합니다.
3. 배포하면 끝입니다.

## 디자인 문서

- 설계 스펙: `docs/superpowers/specs/2026-06-24-looping-ai-landing-design.md`
- 구현 계획: `docs/superpowers/plans/2026-06-25-looping-ai-landing.md`
