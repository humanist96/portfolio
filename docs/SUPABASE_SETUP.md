# Supabase 설정 가이드

## 1. Supabase 프로젝트 생성

1. [supabase.com](https://supabase.com) 접속
2. "Start your project" 클릭
3. GitHub 계정으로 로그인
4. "New Project" 클릭
5. 프로젝트 정보 입력:
   - Name: `kevin-portfolio`
   - Database Password: 강력한 비밀번호 생성
   - Region: Northeast Asia (Seoul)
   - Pricing Plan: Free tier

## 2. 데이터베이스 테이블 생성

Supabase Dashboard → SQL Editor에서 실행:

```sql
-- contacts 테이블 생성
CREATE TABLE contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  status VARCHAR(50) DEFAULT 'new',
  ip_address INET,
  user_agent TEXT
);

-- RLS (Row Level Security) 활성화
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- INSERT 정책 생성 (누구나 문의 가능)
CREATE POLICY "Anyone can insert contacts" ON contacts
  FOR INSERT WITH CHECK (true);

-- SELECT 정책 생성 (인증된 사용자만 조회 가능)
CREATE POLICY "Only authenticated can view contacts" ON contacts
  FOR SELECT USING (auth.role() = 'authenticated');
```

## 3. 환경 변수 설정

1. Supabase Dashboard → Settings → API
2. 다음 값들을 복사:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` → `SUPABASE_SERVICE_ROLE_KEY`

3. `.env.local` 파일 생성:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 4. Vercel 환경 변수 설정

1. Vercel Dashboard → Settings → Environment Variables
2. 위의 3개 환경 변수 추가
3. 모든 환경(Production, Preview, Development)에 적용

## 5. 이메일 알림 설정 (선택사항)

1. Supabase Dashboard → Database → Functions
2. 새 함수 생성:

```sql
CREATE OR REPLACE FUNCTION notify_new_contact()
RETURNS TRIGGER AS $$
BEGIN
  -- 여기에 이메일 전송 로직 추가
  -- 예: PostgREST를 통한 외부 API 호출
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_contact_created
  AFTER INSERT ON contacts
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_contact();
```

## 6. 보안 설정

1. CORS 설정 확인 (Supabase는 기본적으로 모든 도메인 허용)
2. Rate limiting은 Supabase Free tier에서 자동 적용
3. 추가 보안이 필요한 경우 API Gateway 고려

## 사용 방법

문의 폼이 제출되면:
1. 클라이언트에서 `/api/contact` 엔드포인트 호출
2. 서버에서 Supabase에 데이터 저장
3. 성공/실패 응답 반환
4. Supabase Dashboard에서 문의 내역 확인 가능