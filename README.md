# 정경석 포트폴리오 - Next.js 웹사이트

AI와 금융 IT 전문가 정경석의 포트폴리오 웹사이트입니다.

## 🚀 Vercel 무료 배포 가이드

### 1단계: 프로젝트 준비

1. **의존성 설치**
```bash
npm install
```

2. **로컬 테스트**
```bash
npm run dev
```
http://localhost:3000 에서 확인

### 2단계: GitHub 리포지토리 생성

1. [GitHub](https://github.com)에서 새 리포지토리 생성
2. 로컬 프로젝트를 GitHub에 푸시:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### 3단계: Vercel 배포

1. **Vercel 계정 생성**
   - [Vercel](https://vercel.com)에서 무료 계정 생성
   - GitHub 계정으로 로그인 권장

2. **프로젝트 Import**
   - Vercel 대시보드에서 "New Project" 클릭
   - GitHub 리포지토리 선택
   - Import 클릭

3. **프로젝트 설정**
   - Framework Preset: Next.js (자동 감지됨)
   - Root Directory: ./
   - Build Command: `npm run build` (기본값)
   - Output Directory: 자동 설정

4. **환경 변수 설정** (옵션)
   - Supabase를 사용하려면 환경 변수 추가:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`

5. **Deploy 클릭**
   - 자동으로 빌드 및 배포 진행
   - 완료 후 `https://your-project.vercel.app` 형태의 URL 제공

### 4단계: 도메인 설정 (옵션)

1. Vercel 프로젝트 설정에서 "Domains" 탭
2. 커스텀 도메인 추가 가능
3. 또는 Vercel의 무료 서브도메인 사용

## 📝 환경 변수 설정

1. `.env.example` 파일을 `.env.local`로 복사
2. 실제 값으로 변경:

```env
# Supabase (옵션)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 🔧 주요 기능

- ✨ 반응형 디자인
- 🌙 다크 모드 지원 (구현 예정)
- 📱 모바일 최적화
- ⚡ 빠른 로딩 속도
- 🔒 보안 헤더 적용
- ♿ WCAG AA 접근성 준수

## 📂 프로젝트 구조

```
├── app/              # Next.js 13+ App Directory
├── components/       # React 컴포넌트
├── docs/            # 문서
├── public/          # 정적 파일
├── .github/         # GitHub Actions
└── package.json     # 프로젝트 설정
```

## 🛠️ 기술 스택

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Database**: Supabase (옵션)
- **Deployment**: Vercel

## 💡 추가 팁

### Vercel 무료 플랜 제한사항
- 월 100GB 대역폭
- 무제한 웹사이트
- 자동 HTTPS
- 글로벌 CDN
- 개인 및 비상업적 프로젝트용

### 성능 최적화
- 이미지는 Next.js Image 컴포넌트 사용
- 폰트는 Next.js Font 최적화 사용
- 불필요한 JavaScript 번들 최소화

### 문제 해결
- 빌드 실패 시: `npm run build` 로컬에서 먼저 테스트
- 타입 에러: `npm run type-check` 실행
- 환경 변수: Vercel 대시보드에서 정확히 설정

## 📞 지원

배포 중 문제가 있으면:
1. Vercel 빌드 로그 확인
2. GitHub Issues에 문의
3. Vercel 공식 문서 참조

---

**Made with ❤️ by 정경석**