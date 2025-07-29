# Supabase 설정 가이드 - 정케빈 포트폴리오

## 현재 설정된 정보
- **Supabase URL**: `https://smlxpztmpauuxbptmtcv.supabase.co`
- **Anon Key**: 설정 완료 (.env.local 파일 참조)
- **프로젝트 이름**: 정케빈 포트폴리오 문의 시스템

## 1. 데이터베이스 테이블 생성

### 1.1 Supabase Dashboard 접속
1. [Supabase Dashboard](https://supabase.com/dashboard/project/smlxpztmpauuxbptmtcv) 접속
2. 좌측 메뉴에서 "SQL Editor" 클릭

### 1.2 테이블 생성
1. "New query" 버튼 클릭
2. `supabase/schema.sql` 파일의 내용을 복사하여 붙여넣기
3. "Run" 버튼 클릭하여 실행

## 2. Service Role Key 설정

### 2.1 Service Role Key 확인
1. Supabase Dashboard → Settings → API
2. "service_role" 키 복사 (비밀 유지!)

### 2.2 환경 변수 업데이트
`.env.local` 파일에서 다음 라인 수정:
```
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```
실제 service_role 키로 교체

## 3. Vercel 배포 설정

### 3.1 환경 변수 추가
[Vercel Dashboard](https://vercel.com)에서:

1. 프로젝트 선택
2. Settings → Environment Variables
3. 다음 변수 추가:

| 변수명 | 값 | 환경 |
|--------|-----|------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://smlxpztmpauuxbptmtcv.supabase.co` | 모든 환경 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (anon key) | 모든 환경 |
| `SUPABASE_SERVICE_ROLE_KEY` | (service key) | Production만 |

### 3.2 재배포
```bash
git add .
git commit -m "feat: Supabase 연동 구현 완료"
git push origin main
```

## 4. 기능 테스트

### 4.1 로컬 테스트
```bash
npm run dev
```
http://localhost:3000 에서 문의 양식 테스트

### 4.2 데이터 확인
1. Supabase Dashboard → Table Editor
2. "contacts" 테이블 선택
3. 제출된 문의 확인

## 5. 추가 설정 (선택사항)

### 5.1 이메일 알림
새 문의 시 이메일 알림을 받으려면:

1. Supabase Dashboard → Functions
2. Edge Function 생성
3. 이메일 서비스 연동 (SendGrid, Resend 등)

### 5.2 관리자 페이지
문의 관리를 위한 관리자 페이지 생성:
- `/admin` 라우트 추가
- 인증 시스템 구현
- 문의 목록 및 답변 기능

## 6. 보안 체크리스트

✅ Service Role Key는 서버 사이드에서만 사용
✅ `.env.local` 파일이 `.gitignore`에 포함됨
✅ RLS (Row Level Security) 정책 활성화됨
✅ CORS 설정 확인
✅ Rate limiting 구현 (추후 필요시)

## 7. 문제 해결

### "Invalid API key" 오류
- API 키가 올바른지 확인
- 키 앞뒤 공백 제거

### CORS 오류
- Supabase URL이 정확한지 확인
- 프로젝트 설정에서 도메인 허용

### 데이터가 저장되지 않음
- 테이블이 생성되었는지 확인
- RLS 정책이 올바른지 확인

## 8. 현재 상태

- ✅ Supabase 프로젝트 연결 완료
- ✅ 환경 변수 설정 완료
- ✅ API 라우트 구현 완료
- ✅ 데이터베이스 스키마 준비 완료
- ⏳ Service Role Key 입력 대기
- ⏳ 데이터베이스 테이블 생성 대기
- ⏳ 프로덕션 배포 대기

## 지원 및 문의
문제가 발생하면 다음을 확인하세요:
- Supabase 프로젝트 대시보드
- Vercel 빌드 로그
- 브라우저 개발자 도구 콘솔