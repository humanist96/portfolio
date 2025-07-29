# Vercel 배포 가이드

## 개요
이 가이드는 정케빈 포트폴리오 웹사이트를 Vercel에 배포하는 방법을 설명합니다. 문의 시스템은 Supabase를 사용하며, localStorage 대신 서버리스 환경에 최적화되어 있습니다.

## 사전 준비사항

1. **Vercel 계정**: https://vercel.com 에서 가입
2. **Supabase 계정**: https://supabase.com 에서 가입
3. **GitHub 계정**: 코드 저장소용

## 1단계: Supabase 설정

### 1.1 Supabase 프로젝트 생성
1. Supabase 대시보드에 로그인
2. "New Project" 클릭
3. 프로젝트 정보 입력:
   - Name: `portfolio-contact`
   - Database Password: 안전한 비밀번호 설정
   - Region: `Seoul (ap-northeast-2)` 또는 가까운 지역 선택

### 1.2 데이터베이스 설정
1. SQL Editor로 이동
2. `supabase/schema.sql` 파일의 내용을 복사하여 실행
3. 테이블이 생성되었는지 확인

### 1.3 API 키 확인
1. Settings → API로 이동
2. 다음 키들을 복사:
   - `URL`: 프로젝트 URL
   - `anon public`: 공개 키
   - `service_role secret`: 서비스 역할 키 (비밀로 유지)

## 2단계: Vercel 환경변수 설정

### 2.1 Vercel CLI 설치 (선택사항)
```bash
npm i -g vercel
```

### 2.2 환경변수 설정
Vercel 대시보드에서:
1. Project Settings → Environment Variables
2. 다음 변수들을 추가:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
```

**보안 주의사항**:
- `SUPABASE_SERVICE_ROLE_KEY`는 반드시 비밀로 유지
- `ADMIN_PASSWORD`는 강력한 비밀번호 사용
- Production 환경에서는 모든 환경변수 값 변경 필수

## 3단계: 배포

### 3.1 GitHub에 푸시
```bash
git add .
git commit -m "Configure for Vercel deployment"
git push origin main
```

### 3.2 Vercel에 연결
1. Vercel 대시보드에서 "New Project" 클릭
2. GitHub 저장소 선택
3. Framework Preset: `Next.js` 자동 감지됨
4. 환경변수가 설정되었는지 확인
5. "Deploy" 클릭

### 3.3 배포 확인
- 빌드 로그 확인
- 배포 완료 후 제공된 URL로 접속
- `/admin` 페이지 접속하여 관리자 인증 테스트

## 4단계: 배포 후 설정

### 4.1 도메인 설정 (선택사항)
1. Project Settings → Domains
2. 커스텀 도메인 추가
3. DNS 설정 업데이트

### 4.2 모니터링 설정
1. Vercel Analytics 활성화
2. Error tracking 설정
3. Performance monitoring 활성화

## 문제 해결

### 문의 폼이 작동하지 않을 때
1. Supabase 연결 확인:
   - 환경변수가 올바르게 설정되었는지 확인
   - Supabase 프로젝트가 활성화되어 있는지 확인
   
2. 브라우저 콘솔에서 에러 확인:
   - Network 탭에서 API 요청 확인
   - Console 탭에서 에러 메시지 확인

3. Vercel 함수 로그 확인:
   - Vercel 대시보드 → Functions 탭
   - 에러 로그 확인

### 관리자 페이지 접속 불가
1. 환경변수 확인:
   - `ADMIN_USERNAME`과 `ADMIN_PASSWORD` 설정 확인
   
2. Basic Auth 헤더 확인:
   - 브라우저가 인증 팝업을 표시하는지 확인
   - 올바른 자격증명 입력

### 데이터가 저장되지 않을 때
1. Supabase 테이블 확인:
   - `contacts` 테이블이 존재하는지 확인
   - RLS 정책이 올바르게 설정되었는지 확인

2. 서비스 키 확인:
   - `SUPABASE_SERVICE_ROLE_KEY`가 올바른지 확인
   - 키가 만료되지 않았는지 확인

## 보안 체크리스트

- [ ] 프로덕션용 환경변수 변경
- [ ] 강력한 관리자 비밀번호 설정
- [ ] HTTPS 활성화 확인
- [ ] CORS 설정 확인
- [ ] Rate limiting 설정 (필요시)
- [ ] 백업 전략 수립

## 유지보수

### 정기 점검사항
- Supabase 사용량 모니터링
- Vercel 빌드 시간 및 함수 사용량 확인
- 에러 로그 정기 확인
- 보안 업데이트 적용

### 백업
- Supabase 데이터 정기 백업
- 환경변수 안전한 곳에 백업
- 코드 저장소 정기 백업

## 추가 리소스

- [Vercel 문서](https://vercel.com/docs)
- [Supabase 문서](https://supabase.com/docs)
- [Next.js 배포 가이드](https://nextjs.org/docs/deployment)