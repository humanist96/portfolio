# GitHub 푸시 가이드

## 현재 상태
- ✅ Git 저장소 초기화 완료
- ✅ 모든 변경사항 커밋 완료
- ✅ 원격 저장소 연결됨: https://github.com/humanist96/portfolio.git
- ✅ 1개의 커밋이 푸시 대기 중

## 푸시 명령어

### 방법 1: 간단한 푸시
```bash
git push origin main
```

### 방법 2: 강제 푸시 (기존 내용 덮어쓰기)
⚠️ 주의: 기존 저장소의 내용을 모두 덮어씁니다!
```bash
git push -f origin main
```

### 방법 3: 새 브랜치로 푸시
안전하게 새 브랜치로 먼저 푸시하려면:
```bash
git checkout -b deployment
git push -u origin deployment
```

## GitHub 인증 문제 해결

### Personal Access Token 사용 (권장)
1. GitHub.com 로그인
2. Settings → Developer settings → Personal access tokens → Tokens (classic)
3. "Generate new token" 클릭
4. 권한 선택: `repo` (전체 선택)
5. 토큰 생성 및 복사
6. 푸시 시 비밀번호 대신 토큰 사용

### 인증 캐시 설정
```bash
# Windows
git config --global credential.helper manager

# Mac
git config --global credential.helper osxkeychain

# Linux
git config --global credential.helper cache
```

## 푸시 후 확인사항
1. GitHub 저장소에서 파일 확인
2. Vercel이 자동으로 배포 시작
3. Vercel 대시보드에서 배포 상태 확인

## 문제 발생 시
- 인증 실패: Personal Access Token 재생성
- 충돌 발생: `git pull origin main` 후 재시도
- 권한 없음: 저장소 소유자 확인