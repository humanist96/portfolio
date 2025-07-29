# 🚀 GitHub + Vercel 배포 가이드

GitHub 계정: humanist96@gmail.com

## 📋 사전 준비사항

1. **Node.js 설치 확인**
```bash
node --version  # v16 이상 필요
npm --version   # v7 이상 필요
```

2. **Git 설치 확인**
```bash
git --version
```

## 1️⃣ GitHub Repository 생성 및 업로드

### Step 1: Git 초기화 및 커밋
```bash
# 프로젝트 디렉토리에서 실행
cd C:\@Work\vibe_coding\billing_analyzer

# Git 초기화
git init

# Git 사용자 설정 (처음인 경우)
git config --global user.email "humanist96@gmail.com"
git config --global user.name "Your Name"

# 모든 파일 추가
git add .

# 첫 커밋
git commit -m "Initial commit - 정경석 포트폴리오 웹사이트"
```

### Step 2: GitHub에 새 Repository 생성
1. 브라우저에서 [GitHub](https://github.com) 로그인
2. 우측 상단 '+' 버튼 → 'New repository' 클릭
3. Repository 설정:
   - Repository name: `portfolio-jeonggyeongseok`
   - Description: "AI & 금융 IT 전문가 정경석 포트폴리오"
   - Public 선택
   - README 파일 추가 체크 해제 (이미 있음)
   - 'Create repository' 클릭

### Step 3: 로컬과 GitHub 연결
```bash
# GitHub repository와 연결 (YOUR_USERNAME을 실제 GitHub 사용자명으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/portfolio-jeonggyeongseok.git

# main 브랜치로 설정
git branch -M main

# GitHub에 푸시
git push -u origin main
```

## 2️⃣ Vercel 배포

### 방법 1: Vercel 웹사이트를 통한 배포 (추천)

1. **Vercel 계정 생성/로그인**
   - [vercel.com](https://vercel.com) 접속
   - 'Sign Up' → 'Continue with GitHub' 선택
   - GitHub 계정(humanist96@gmail.com)으로 로그인

2. **프로젝트 Import**
   - Vercel 대시보드에서 'New Project' 클릭
   - 'Import Git Repository' 선택
   - `portfolio-jeonggyeongseok` repository 선택
   - 'Import' 클릭

3. **프로젝트 설정**
   - Framework Preset: Next.js (자동 감지)
   - Root Directory: ./ (그대로 둠)
   - Environment Variables: 건너뛰기 (나중에 설정 가능)

4. **Deploy 클릭**
   - 자동으로 빌드 시작
   - 2-3분 후 배포 완료
   - 제공된 URL로 접속 테스트

### 방법 2: Vercel CLI를 통한 배포

1. **Vercel CLI 설치**
```bash
npm install -g vercel
```

2. **Vercel 로그인**
```bash
vercel login
# 이메일 입력: humanist96@gmail.com
# 인증 메일 확인 후 진행
```

3. **배포 실행**
```bash
# 프로젝트 디렉토리에서
vercel

# 프롬프트 응답:
# Set up and deploy "~/billing_analyzer"? [Y/n] → Y
# Which scope do you want to deploy to? → 본인 계정 선택
# Link to existing project? [y/N] → N
# What's your project's name? → portfolio-jeonggyeongseok
# In which directory is your code located? → ./
# Want to override the settings? [y/N] → N
```

4. **Production 배포**
```bash
vercel --prod
```

## 3️⃣ 환경 변수 설정 (선택사항)

Supabase를 사용하려면 Vercel 대시보드에서 환경 변수 설정:

1. Vercel 대시보드 → 프로젝트 선택
2. Settings → Environment Variables
3. 다음 변수 추가:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

## 4️⃣ 자동 배포 설정

GitHub에 푸시하면 자동으로 Vercel에 배포되도록 이미 설정됨:

```bash
# 코드 수정 후
git add .
git commit -m "Update: 기능 추가"
git push

# 자동으로 Vercel에서 재배포 시작
```

## 5️⃣ 커스텀 도메인 설정 (선택사항)

1. Vercel 대시보드 → Settings → Domains
2. Add Domain 클릭
3. 도메인 입력 (예: jeonggyeongseok.com)
4. DNS 설정 안내 따라 진행

## ✅ 배포 확인 체크리스트

- [ ] Vercel 제공 URL 접속 확인
- [ ] 모든 페이지 정상 작동 확인
- [ ] 반응형 디자인 테스트 (모바일/태블릿)
- [ ] Contact Form 작동 테스트 (Supabase 설정 시)
- [ ] 이미지 및 아이콘 정상 표시
- [ ] SEO 메타태그 확인 (개발자 도구)
- [ ] HTTPS 적용 확인
- [ ] 로딩 속도 테스트

## 🔧 문제 해결

### Build 실패 시
```bash
# 로컬에서 빌드 테스트
npm run build

# 타입 에러 확인
npm run type-check
```

### 환경 변수 문제
- Vercel 대시보드에서 환경 변수 재확인
- 변수명 오타 확인
- 재배포 필요

### 기타 문제
- Vercel 빌드 로그 확인
- Deployment Details → Functions 탭에서 에러 확인

## 📞 지원

- Vercel 문서: https://vercel.com/docs
- Next.js 문서: https://nextjs.org/docs
- 문제 발생 시 GitHub Issues 활용

---

배포 성공을 축하합니다! 🎉