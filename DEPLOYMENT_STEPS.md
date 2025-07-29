# Vercel 배포 단계별 가이드

## 완료된 변경사항
1. ✅ 3D 애니메이션에서 빨간색 요소 제거
2. ✅ 전체 배경색을 고급스러운 네이비 계열로 변경
   - Deep navy (#0a0e27)
   - Midnight blue (#0f172a)
   - Royal navy (#1e293b)
   - Soft navy gray (#334155)

## Vercel 배포 단계

### 1. GitHub에 코드 푸시
```bash
git add .
git commit -m "Update: Remove red elements and change to navy color scheme"
git push origin main
```

### 2. Vercel 웹사이트에서 배포
1. https://vercel.com 로그인
2. 기존 프로젝트로 이동 또는 "New Project" 클릭
3. GitHub 저장소 연결

### 3. 환경변수 설정 (중요!)
Vercel 대시보드 > Settings > Environment Variables에서 추가:

```
NEXT_PUBLIC_SUPABASE_URL=https://smlxpztmpauuxbptmtcv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtbHhwenRtcGF1dXhicHRtdGN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3NTI2OTEsImV4cCI6MjA2OTMyODY5MX0.BJXj4J5epfWMOvSvsaFNfzEDwyxmMue7uyCNE9cnegI
SUPABASE_SERVICE_ROLE_KEY=[Supabase Dashboard에서 확인]
ADMIN_USERNAME=admin
ADMIN_PASSWORD=kevin2024!
```

### 4. Supabase 테이블 생성
Supabase Dashboard > SQL Editor에서 실행:

```sql
-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'closed')),
  ip_address TEXT,
  user_agent TEXT
);

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create policy for service role
CREATE POLICY "Service role can do everything" ON contacts
  FOR ALL USING (auth.role() = 'service_role');

-- Create index for performance
CREATE INDEX idx_contacts_status ON contacts(status);
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);
```

### 5. 배포 확인
```bash
# 배포 후 테스트
SITE_URL=https://portfolio-two-gray-ler88ek154.vercel.app node scripts/test-deployment.js
```

## 변경된 디자인 특징
- 고급스러운 네이비 색상 그라데이션
- 빨간색 요소 완전 제거
- 더 세련된 색상 조합 (보라, 파랑, 인디고)
- 향상된 가독성을 위한 배경 오버레이

## 문제 해결
- 환경변수가 제대로 설정되었는지 확인
- Supabase 테이블이 생성되었는지 확인
- 빌드 로그에서 에러 확인