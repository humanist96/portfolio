# 브라우저 개발자 도구로 문의 시스템 디버깅하기

## 🔍 브라우저 개발자 도구 활용법

### 1. Network 탭에서 API 요청/응답 확인

#### 문의 제출 시 확인 방법:
1. **개발자 도구 열기**: F12 또는 우클릭 → 검사
2. **Network 탭** 선택
3. **Clear** 버튼 클릭 (기존 로그 삭제)
4. 문의 폼 작성 후 제출
5. `/api/contact` 요청 찾기
6. 클릭하여 상세 정보 확인:
   - **Headers**: 요청 정보
   - **Payload**: 전송한 데이터
   - **Response**: 서버 응답

#### 정상 응답 예시:
```json
{
  "success": true,
  "message": "문의가 성공적으로 전송되었습니다.",
  "data": {
    "id": 1,
    "name": "홍길동",
    "email": "test@example.com",
    "message": "문의 내용",
    "status": "new",
    "created_at": "2024-01-29T12:00:00Z"
  }
}
```

#### 오류 응답 예시:
```json
{
  "success": false,
  "error": "Row level security policy violation",
  "message": "문의 전송에 실패했습니다."
}
```

### 2. Console에서 API 직접 테스트

#### 문의 조회 테스트:
```javascript
// Admin 페이지에서 문의 목록 조회
fetch('/api/admin/contacts')
  .then(res => res.json())
  .then(data => {
    console.log('=== 문의 조회 결과 ===');
    console.log('성공 여부:', data.success);
    console.log('총 문의 수:', data.contacts?.length || 0);
    
    if (data.contacts && data.contacts.length > 0) {
      console.log('\n최근 5개 문의:');
      data.contacts.slice(0, 5).forEach((contact, i) => {
        console.log(`${i+1}. ${contact.name} (${contact.email}) - ${contact.status}`);
      });
      
      // 테이블로 보기
      console.table(data.contacts);
    } else {
      console.log('문의 내역이 없습니다.');
    }
    
    if (data.stats) {
      console.log('\n통계:', data.stats);
    }
  })
  .catch(err => console.error('❌ 오류:', err));
```

#### 문의 제출 테스트:
```javascript
// 테스트 문의 제출
const testData = {
  name: '브라우저 테스트',
  email: 'browser@test.com',
  message: '브라우저 콘솔에서 직접 테스트합니다.'
};

fetch('/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(testData)
})
  .then(res => res.json())
  .then(data => {
    console.log('=== 문의 제출 결과 ===');
    console.log('성공 여부:', data.success);
    console.log('메시지:', data.message);
    
    if (data.success) {
      console.log('✅ 문의가 성공적으로 제출되었습니다!');
      console.log('문의 ID:', data.data?.id);
    } else {
      console.error('❌ 문의 제출 실패:', data.error);
    }
  })
  .catch(err => console.error('❌ 네트워크 오류:', err));
```

#### 상태별 문의 조회:
```javascript
// 특정 상태의 문의만 조회
['new', 'read', 'replied', 'closed'].forEach(status => {
  fetch(`/api/admin/contacts?status=${status}`)
    .then(res => res.json())
    .then(data => {
      console.log(`${status} 상태 문의: ${data.contacts?.length || 0}개`);
    });
});
```

### 3. Application 탭에서 쿠키/세션 확인

1. **Application** 탭 선택
2. **Cookies** → 도메인 선택
3. 인증 관련 쿠키 확인
4. **Local Storage** / **Session Storage** 확인

### 4. 실시간 모니터링 스크립트

Console에 붙여넣어 실시간으로 문의 상태 모니터링:

```javascript
// 5초마다 문의 상태 확인
let monitorInterval;

function startMonitoring() {
  console.log('📊 문의 모니터링 시작... (5초마다 갱신)');
  
  monitorInterval = setInterval(async () => {
    try {
      const response = await fetch('/api/admin/contacts');
      const data = await response.json();
      
      if (data.success && data.stats) {
        console.clear();
        console.log(`⏰ ${new Date().toLocaleTimeString('ko-KR')}`);
        console.log('=====================================');
        console.log(`📬 전체 문의: ${data.stats.total}개`);
        console.log(`🆕 신규: ${data.stats.new}개`);
        console.log(`👀 읽음: ${data.stats.read}개`);
        console.log(`✉️ 답변: ${data.stats.replied}개`);
        console.log(`🔒 종료: ${data.stats.closed}개`);
        console.log('=====================================');
        console.log(`📅 오늘: ${data.stats.todayCount}개`);
        console.log(`📆 이번주: ${data.stats.weekCount}개`);
      }
    } catch (error) {
      console.error('모니터링 오류:', error);
    }
  }, 5000);
}

function stopMonitoring() {
  if (monitorInterval) {
    clearInterval(monitorInterval);
    console.log('🛑 모니터링 중지됨');
  }
}

// 시작: startMonitoring()
// 중지: stopMonitoring()
startMonitoring();
```

### 5. 디버깅 체크리스트

Console에서 실행하여 시스템 상태 점검:

```javascript
async function systemCheck() {
  console.log('🔧 시스템 점검 시작...\n');
  
  const checks = {
    api_contact: false,
    api_admin: false,
    supabase_connection: false,
    data_exists: false
  };
  
  // 1. Contact API 확인
  try {
    const res = await fetch('/api/contact', { method: 'GET' });
    checks.api_contact = res.ok;
    console.log(`${checks.api_contact ? '✅' : '❌'} Contact API 응답`);
  } catch (e) {
    console.log('❌ Contact API 응답 없음');
  }
  
  // 2. Admin API 확인
  try {
    const res = await fetch('/api/admin/contacts');
    const data = await res.json();
    checks.api_admin = res.ok && data.success;
    console.log(`${checks.api_admin ? '✅' : '❌'} Admin API 응답`);
    
    // 3. Supabase 연결 확인
    checks.supabase_connection = data.success;
    console.log(`${checks.supabase_connection ? '✅' : '❌'} Supabase 연결`);
    
    // 4. 데이터 존재 여부
    checks.data_exists = data.contacts && data.contacts.length > 0;
    console.log(`${checks.data_exists ? '✅' : '❌'} 저장된 데이터 (${data.contacts?.length || 0}개)`);
    
  } catch (e) {
    console.log('❌ Admin API 오류:', e.message);
  }
  
  // 결과 요약
  console.log('\n📋 점검 결과:');
  const allPassed = Object.values(checks).every(v => v);
  if (allPassed) {
    console.log('✅ 모든 시스템이 정상 작동 중입니다!');
  } else {
    console.log('⚠️ 일부 시스템에 문제가 있습니다.');
    console.log('해결 방법:');
    if (!checks.supabase_connection) {
      console.log('- Supabase 환경변수 확인');
      console.log('- Service Role Key 설정 확인');
    }
    if (!checks.data_exists) {
      console.log('- 테스트 문의를 제출해보세요');
      console.log('- Supabase 대시보드에서 직접 확인');
    }
  }
}

// 실행
systemCheck();
```

## 💡 문제 해결 팁

### 자주 발생하는 오류와 해결 방법

1. **"Row level security policy violation" 오류**
   - 원인: Supabase RLS 정책이 INSERT를 차단
   - 해결: RLS 정책 업데이트 또는 Service Role Key 사용

2. **"Supabase URL not configured" 오류**
   - 원인: 환경변수가 설정되지 않음
   - 해결: Vercel 환경변수 확인 및 재배포

3. **문의가 제출되지만 조회되지 않음**
   - 원인: 다른 테이블이나 프로젝트에 저장
   - 해결: Supabase URL과 프로젝트 확인

4. **Admin 페이지 접근 불가**
   - 원인: 인증 실패
   - 해결: username: admin, password: kevin2024! 확인

이 가이드를 활용하여 문제를 진단하고 해결할 수 있습니다!