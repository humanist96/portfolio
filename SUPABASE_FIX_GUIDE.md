# Supabase 문의 시스템 긴급 수정 가이드

## 🚨 현재 문제
- 문의 폼 제출이 실패함 (RLS 정책으로 차단됨)
- Admin 페이지에서 문의 내역이 보이지 않음

## ✅ 즉시 해결 방법

### 1. Supabase SQL Editor에서 실행

다음 SQL을 복사하여 Supabase SQL Editor에서 실행하세요:

```sql
-- 기존 정책 삭제
DROP POLICY IF EXISTS "Allow anonymous users to insert contacts" ON contacts;
DROP POLICY IF EXISTS "Allow service role to manage all contacts" ON contacts;

-- 익명 사용자가 문의를 등록할 수 있도록 허용
CREATE POLICY "Allow anonymous users to insert contacts" ON contacts
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Service role 전체 권한 (admin 작업용)
CREATE POLICY "Allow service role to manage all contacts" ON contacts
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- 확인
SELECT * FROM pg_policies WHERE tablename = 'contacts';
```

### 2. 실행 방법
1. https://supabase.com/dashboard 접속
2. 프로젝트 선택
3. SQL Editor 클릭
4. 위 SQL 복사 & 붙여넣기
5. Run 클릭

### 3. 테스트
1. 홈페이지에서 문의 전송
2. /admin 페이지에서 확인

## 🔑 Service Role Key 설정 (선택사항)

Service role key를 설정하면 RLS를 우회할 수 있습니다:

1. Supabase Dashboard → Settings → API
2. "service_role" 키 복사
3. Vercel 환경변수에 추가:
   - 변수명: `SUPABASE_SERVICE_ROLE_KEY`
   - 값: 복사한 키

## 현재 설정된 환경변수
- ✅ NEXT_PUBLIC_SUPABASE_URL
- ✅ NEXT_PUBLIC_SUPABASE_ANON_KEY
- ❌ SUPABASE_SERVICE_ROLE_KEY (미설정)
- ✅ ADMIN_USERNAME
- ✅ ADMIN_PASSWORD