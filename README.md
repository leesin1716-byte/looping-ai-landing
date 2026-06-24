# Looping Ai — 랜딩페이지

AI 바이브코더 **Looping Ai**의 서비스(수주) 랜딩페이지. 단일 전환 목표는 **문의 폼 제출**이며, 페이지의 비주얼·인터랙션 퀄리티 자체가 포트폴리오 역할을 합니다.

다크 프리미엄 + 네온 톤, Spline 3D 히어로, 스크롤 리빌·3D 틸트·마그네틱 버튼·카운트업 등 인터랙션을 갖춘 한국어 단일 페이지입니다.

## 기술 스택

- **Next.js 15 (App Router) + TypeScript**
- **Tailwind CSS v4** (CSS `@theme` 디자인 토큰)
- **Framer Motion** (애니메이션) · **Lenis** (부드러운 스크롤)
- **Spline** (iframe 임베드, 지연 로딩)
- 폰트: **Pretendard**(본문/한글) + **Space Grotesk**(디스플레이)
- 문의 폼: **Web3Forms**
- 테스트: **Vitest** (검증·카운트업 로직)
- 배포: **Vercel**

## 시작하기

```bash
npm install

# 환경변수 설정: .env.local.example 을 복사해 키 입력
cp .env.local.example .env.local
# NEXT_PUBLIC_WEB3FORMS_KEY=... (https://web3forms.com 에서 무료 발급)

npm run dev      # 개발 서버 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 빌드 결과 서빙
npm run test     # 단위 테스트
npm run lint     # 린트
```

## 문의 폼 (Web3Forms)

- [web3forms.com](https://web3forms.com)에서 이메일만으로 무료 access key를 발급받아 `NEXT_PUBLIC_WEB3FORMS_KEY`에 넣으면 즉시 동작합니다.
- 키가 없으면 폼은 "설정되지 않았습니다" 안내를 표시합니다(빌드는 정상).
- 제출 로직은 `src/lib/contact.ts` 한 곳에 격리되어 있어, 추후 **Resend + Route Handler**로 교체할 때 이 파일만 수정하면 됩니다.
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

> 실적 숫자와 후기는 플레이스홀더입니다. 실제 값으로 위 파일들만 교체하세요.

## 접근성·성능

- `prefers-reduced-motion`을 존중합니다: 블롭/틸트/마퀴/카운트업 정지, Spline은 정적 그라데이션으로 폴백.
- Spline 히어로와 포트폴리오 미리보기는 지연 로딩됩니다.
- 모바일 우선 반응형.

## 배포 (Vercel)

1. 저장소를 Vercel에 연결합니다.
2. 환경변수 `NEXT_PUBLIC_WEB3FORMS_KEY`를 추가합니다.
3. 배포하면 끝입니다.

## 디자인 문서

- 설계 스펙: `docs/superpowers/specs/2026-06-24-looping-ai-landing-design.md`
- 구현 계획: `docs/superpowers/plans/2026-06-25-looping-ai-landing.md`
