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