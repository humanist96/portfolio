# Supabase 데이터 확인 가이드

## 🔍 Supabase 대시보드에서 직접 확인하기

### 1단계: Supabase 대시보드 접속
1. https://supabase.com/dashboard 접속
2. 프로젝트 선택 (smlxpztmpauuxbptmtcv)

### 2단계: Table Editor에서 데이터 확인
1. 왼쪽 메뉴에서 **Table Editor** 클릭
2. **contacts** 테이블 선택
3. 실제 저장된 데이터 확인

### 3단계: SQL Editor로 직접 조회
1. 왼쪽 메뉴에서 **SQL Editor** 클릭
2. 다음 쿼리 실행:

```sql
-- 모든 문의 내역 조회
SELECT * FROM contacts ORDER BY created_at DESC;

-- 최근 24시간 내 문의 조회
SELECT * FROM contacts 
WHERE created_at > NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC;

-- 문의 개수 확인
SELECT COUNT(*) as total_contacts FROM contacts;

-- 상태별 문의 개수
SELECT status, COUNT(*) as count 
FROM contacts 
GROUP BY status;
```

## 🧪 테스트 스크립트로 확인하기

### 테스트 스크립트 생성
다음 스크립트를 `test-supabase-connection.ts`로 저장:

```typescript
import { createClient } from '@supabase/supabase-js'

// 환경변수 또는 직접 입력
const supabaseUrl = 'https://smlxpztmpauuxbptmtcv.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtbHhwenRtcGF1dXhicHRtdGN2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Mzc1MjY5MSwiZXhwIjoyMDY5MzI4NjkxfQ.RBxVZSO0QcL34nT7Ca16ZA5J9nPwxiA1odTPXepE9u8'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  console.log('🔍 Supabase 연결 테스트 시작...\n')
  
  try {
    // 1. 연결 테스트
    console.log('1️⃣ 연결 상태 확인...')
    const { data: testData, error: testError } = await supabase
      .from('contacts')
      .select('count')
      .limit(1)
    
    if (testError) {
      console.error('❌ 연결 실패:', testError.message)
      return
    }
    console.log('✅ Supabase 연결 성공!\n')
    
    // 2. 데이터 조회
    console.log('2️⃣ 문의 데이터 조회...')
    const { data: contacts, error: fetchError } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)
    
    if (fetchError) {
      console.error('❌ 조회 실패:', fetchError.message)
      return
    }
    
    console.log(`✅ 총 ${contacts?.length || 0}개의 최근 문의 발견\n`)
    
    // 3. 데이터 출력
    if (contacts && contacts.length > 0) {
      console.log('📋 최근 문의 내역:')
      contacts.forEach((contact, index) => {
        console.log(`\n--- 문의 #${index + 1} ---`)
        console.log(`ID: ${contact.id}`)
        console.log(`이름: ${contact.name}`)
        console.log(`이메일: ${contact.email}`)
        console.log(`메시지: ${contact.message.substring(0, 50)}...`)
        console.log(`상태: ${contact.status}`)
        console.log(`생성일: ${new Date(contact.created_at).toLocaleString('ko-KR')}`)
      })
    } else {
      console.log('ℹ️ 아직 저장된 문의가 없습니다.')
    }
    
    // 4. 통계 정보
    console.log('\n3️⃣ 통계 정보 조회...')
    const { data: stats, error: statsError } = await supabase
      .from('contacts')
      .select('status')
    
    if (!statsError && stats) {
      const statusCounts = stats.reduce((acc, contact) => {
        acc[contact.status] = (acc[contact.status] || 0) + 1
        return acc
      }, {} as Record<string, number>)
      
      console.log('\n📊 상태별 문의 수:')
      Object.entries(statusCounts).forEach(([status, count]) => {
        console.log(`- ${status}: ${count}개`)
      })
      console.log(`- 전체: ${stats.length}개`)
    }
    
    // 5. 테스트 문의 생성
    console.log('\n4️⃣ 테스트 문의 생성 중...')
    const testContact = {
      name: '테스트 사용자',
      email: 'test@example.com',
      message: `테스트 메시지 - ${new Date().toLocaleString('ko-KR')}`,
      status: 'new' as const,
      created_at: new Date().toISOString()
    }
    
    const { data: newContact, error: insertError } = await supabase
      .from('contacts')
      .insert([testContact])
      .select()
      .single()
    
    if (insertError) {
      console.error('❌ 테스트 문의 생성 실패:', insertError.message)
      if (insertError.message.includes('row-level security')) {
        console.log('\n💡 해결방법:')
        console.log('1. Supabase SQL Editor에서 RLS 정책 업데이트')
        console.log('2. 또는 Service Role Key 사용 확인')
      }
    } else {
      console.log('✅ 테스트 문의 생성 성공!')
      console.log(`새 문의 ID: ${newContact?.id}`)
    }
    
  } catch (error) {
    console.error('❌ 예상치 못한 오류:', error)
  }
}

// 실행
testConnection()
```

### 실행 방법:
```bash
npx tsx test-supabase-connection.ts
```

## 🌐 브라우저 개발자 도구로 확인하기

### 1. Network 탭에서 API 응답 확인
1. Chrome/Edge 개발자 도구 열기 (F12)
2. **Network** 탭 선택
3. 문의 폼 제출
4. `/api/contact` 요청 찾기
5. Response 탭에서 응답 확인

### 2. Console에서 직접 API 테스트
개발자 도구 Console에서:

```javascript
// 문의 조회 테스트
fetch('/api/admin/contacts')
  .then(res => res.json())
  .then(data => {
    console.log('조회 결과:', data);
    if (data.contacts) {
      console.log(`총 ${data.contacts.length}개의 문의`);
      console.table(data.contacts);
    }
  })
  .catch(err => console.error('오류:', err));

// 문의 제출 테스트
fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: '브라우저 테스트',
    email: 'browser@test.com',
    message: '브라우저에서 직접 테스트'
  })
})
  .then(res => res.json())
  .then(data => console.log('제출 결과:', data))
  .catch(err => console.error('오류:', err));
```

## 🔧 문제 해결 체크리스트

### ✅ 확인 사항
1. **Supabase 환경변수 설정 확인**
   - [ ] NEXT_PUBLIC_SUPABASE_URL이 올바른지
   - [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY가 올바른지
   - [ ] SUPABASE_SERVICE_ROLE_KEY가 Vercel에 설정되었는지

2. **RLS 정책 확인**
   - [ ] `contacts` 테이블에 INSERT 정책이 있는지
   - [ ] Service role이 모든 작업을 할 수 있는지

3. **테이블 구조 확인**
   - [ ] `contacts` 테이블이 존재하는지
   - [ ] 필요한 모든 컬럼이 있는지

4. **API 응답 확인**
   - [ ] `/api/contact` POST 요청이 200 응답을 반환하는지
   - [ ] `/api/admin/contacts` GET 요청이 데이터를 반환하는지

## 💡 추가 디버깅 팁

### Vercel 함수 로그 확인
1. Vercel 대시보드 접속
2. 프로젝트 선택
3. **Functions** 탭 클릭
4. `/api/contact` 또는 `/api/admin/contacts` 선택
5. 실시간 로그 확인

### 로컬 테스트
```bash
# 로컬에서 실행
npm run dev

# 환경변수 확인
echo $NEXT_PUBLIC_SUPABASE_URL
echo $SUPABASE_SERVICE_ROLE_KEY
```

이 방법들을 통해 실제 데이터가 Supabase에 저장되고 있는지 확인할 수 있습니다.