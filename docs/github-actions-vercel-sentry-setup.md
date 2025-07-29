# GitHub Actions Workflow - Vercel 배포 및 Sentry 통합 가이드

## 필요한 설정

### 1. Vercel 설정
1. [Vercel Dashboard](https://vercel.com)에서 프로젝트 생성
2. Project Settings → General에서 다음 값 확인:
   - Organization ID: `VERCEL_ORG_ID`
   - Project ID: `VERCEL_PROJECT_ID`
3. Account Settings → Tokens에서 토큰 생성: `VERCEL_TOKEN`

### 2. Sentry 설정
1. [Sentry](https://sentry.io)에서 프로젝트 생성
2. Settings → Organization Settings에서 조직 slug 확인: `SENTRY_ORG`
3. Project Settings에서 프로젝트 slug 확인: `SENTRY_PROJECT`
4. Settings → Auth Tokens에서 토큰 생성 (scopes: project:releases): `SENTRY_AUTH_TOKEN`

### 3. GitHub Secrets 설정
Repository → Settings → Secrets and variables → Actions에서 추가:
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
- `VERCEL_TOKEN`
- `SENTRY_ORG`
- `SENTRY_PROJECT`
- `SENTRY_AUTH_TOKEN`
- `CODECOV_TOKEN` (선택사항)

## Next.js Sentry 설정

### 1. Sentry 패키지 설치
```bash
npm install @sentry/nextjs
```

### 2. sentry.client.config.ts
```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  debug: false,
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  integrations: [
    new Sentry.Replay({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
});
```

### 3. sentry.server.config.ts
```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  debug: false,
});
```

### 4. next.config.js 수정
```javascript
const { withSentryConfig } = require("@sentry/nextjs");

const nextConfig = {
  // 기존 Next.js 설정
};

module.exports = withSentryConfig(
  nextConfig,
  {
    silent: true,
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
  },
  {
    widenClientFileUpload: true,
    transpileClientSDK: true,
    tunnelRoute: "/monitoring",
    hideSourceMaps: true,
    disableLogger: true,
  }
);
```

## 워크플로우 특징

### 자동화된 프로세스
1. **테스트 단계**: 린팅, 타입 체크, 유닛 테스트 실행
2. **배포 단계**: 
   - main 브랜치 → Production 환경
   - develop 브랜치/PR → Preview 환경
3. **Sentry 통합**: 
   - 자동 릴리스 생성
   - 소스맵 업로드
   - 환경별 에러 추적

### 브랜치 전략
- `main`: Production 배포
- `develop`: Preview/Staging 배포
- Pull Request: Preview URL 자동 생성

### 에러 모니터링
- Sentry가 자동으로 배포와 연결
- 에러 발생 시 해당 릴리스 추적 가능
- 성능 모니터링 및 세션 리플레이 지원