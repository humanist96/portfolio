# ⚡ 빠른 배포 가이드 (5분 완성)

GitHub 계정: humanist96@gmail.com

## 🎯 즉시 실행 명령어

### 1단계: 프로젝트 준비 (1분)
```bash
# 프로젝트 디렉토리로 이동
cd C:\@Work\vibe_coding\billing_analyzer

# 의존성 설치
npm install

# 빌드 테스트
npm run build
```

### 2단계: GitHub 업로드 (2분)
```bash
# Git 초기화 및 설정
git init
git config user.email "humanist96@gmail.com"
git config user.name "Your Name"

# 커밋
git add .
git commit -m "Initial commit - Portfolio Website"

# GitHub repository 연결 (YOUR_GITHUB_USERNAME을 실제 사용자명으로 변경)
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/portfolio-jeonggyeongseok.git
git branch -M main
git push -u origin main
```

### 3단계: Vercel 배포 (2분)

#### 옵션 A: 웹 브라우저 방법 (추천) ✨
1. [vercel.com](https://vercel.com) 접속
2. "Sign Up" → "Continue with GitHub"
3. "New Project" → Repository 선택 → "Import"
4. "Deploy" 클릭
5. 완료! 🎉

#### 옵션 B: CLI 방법
```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel

# Production 배포
vercel --prod
```

## 📌 중요 정보

### 배포된 URL
```
https://portfolio-jeonggyeongseok.vercel.app
또는
https://YOUR-PROJECT-NAME.vercel.app
```

### 업데이트 방법
```bash
# Windows 사용자
deploy.bat "업데이트 내용"

# Mac/Linux 사용자
./deploy.sh "업데이트 내용"
```

## ❓ 자주 묻는 질문

**Q: GitHub repository 생성은 어디서?**
A: [github.com/new](https://github.com/new) 에서 생성

**Q: Vercel 무료인가요?**
A: 네! 개인 프로젝트는 완전 무료입니다.

**Q: 도메인 연결 가능?**
A: Vercel Dashboard → Settings → Domains에서 설정

**Q: 환경 변수 설정?**
A: Vercel Dashboard → Settings → Environment Variables

## 🚨 문제 해결

### Build 에러
```bash
npm run build  # 로컬에서 먼저 테스트
npm run type-check  # 타입 에러 확인
```

### Push 권한 에러
```bash
# GitHub 토큰 생성 필요
# Settings → Developer settings → Personal access tokens
```

### Vercel 배포 실패
- Build 로그 확인
- 환경 변수 재확인
- node_modules 삭제 후 재설치

---

**도움이 필요하면 언제든 문의하세요!** 🤝