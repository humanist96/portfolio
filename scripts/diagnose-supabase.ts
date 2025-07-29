#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

// .env.local 파일 로드
dotenv.config({ path: resolve(process.cwd(), '.env.local') })

console.log('🔍 Supabase 연결 진단 도구\n')
console.log('================================\n')

// 환경변수 체크
function checkEnvironmentVariables() {
  console.log('1️⃣ 환경변수 확인')
  console.log('------------------')
  
  const vars = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY
  }
  
  let allSet = true
  
  for (const [key, value] of Object.entries(vars)) {
    if (value && value !== 'your_service_role_key_here') {
      console.log(`✅ ${key}: 설정됨 (${value.substring(0, 20)}...)`)
    } else {
      console.log(`❌ ${key}: 미설정 또는 기본값`)
      allSet = false
    }
  }
  
  console.log('\n')
  return allSet
}

// Supabase 연결 테스트
async function testSupabaseConnection() {
  console.log('2️⃣ Supabase 연결 테스트')
  console.log('------------------------')
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl) {
    console.log('❌ Supabase URL이 설정되지 않았습니다.')
    return false
  }
  
  // Service Role Key로 시도
  if (serviceKey && serviceKey !== 'your_service_role_key_here') {
    console.log('🔑 Service Role Key로 연결 시도...')
    const supabase = createClient(supabaseUrl, serviceKey)
    
    try {
      const { error } = await supabase.from('contacts').select('count').limit(1)
      if (!error) {
        console.log('✅ Service Role Key로 연결 성공!')
        return supabase
      } else {
        console.log(`❌ Service Role Key 연결 실패: ${error.message}`)
      }
    } catch (e) {
      console.log(`❌ Service Role Key 연결 오류: ${e}`)
    }
  }
  
  // Anon Key로 시도
  if (anonKey) {
    console.log('🔑 Anon Key로 연결 시도...')
    const supabase = createClient(supabaseUrl, anonKey)
    
    try {
      const { error } = await supabase.from('contacts').select('count').limit(1)
      if (!error) {
        console.log('✅ Anon Key로 연결 성공!')
        return supabase
      } else {
        console.log(`❌ Anon Key 연결 실패: ${error.message}`)
      }
    } catch (e) {
      console.log(`❌ Anon Key 연결 오류: ${e}`)
    }
  }
  
  console.log('\n')
  return false
}

// RLS 정책 확인
async function checkRLSPolicies(supabase: any) {
  console.log('3️⃣ RLS 정책 확인')
  console.log('-----------------')
  
  try {
    // INSERT 테스트
    console.log('📝 INSERT 권한 테스트...')
    const testData = {
      name: 'RLS 테스트',
      email: 'rls@test.com',
      message: 'RLS 정책 테스트',
      status: 'new',
      created_at: new Date().toISOString()
    }
    
    const { data: insertData, error: insertError } = await supabase
      .from('contacts')
      .insert([testData])
      .select()
    
    if (insertError) {
      console.log(`❌ INSERT 실패: ${insertError.message}`)
      if (insertError.message.includes('row-level security')) {
        console.log('💡 해결: RLS 정책에서 INSERT 허용 필요')
      }
    } else {
      console.log('✅ INSERT 성공')
      
      // 삽입된 데이터 삭제
      if (insertData && insertData[0]) {
        await supabase.from('contacts').delete().eq('id', insertData[0].id)
      }
    }
    
    // SELECT 테스트
    console.log('\n📖 SELECT 권한 테스트...')
    const { error: selectError } = await supabase
      .from('contacts')
      .select('*')
      .limit(1)
    
    if (selectError) {
      console.log(`❌ SELECT 실패: ${selectError.message}`)
    } else {
      console.log('✅ SELECT 성공')
    }
    
  } catch (e) {
    console.log(`❌ RLS 확인 오류: ${e}`)
  }
  
  console.log('\n')
}

// 데이터 상태 확인
async function checkDataStatus(supabase: any) {
  console.log('4️⃣ 데이터 상태 확인')
  console.log('--------------------')
  
  try {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.log(`❌ 데이터 조회 실패: ${error.message}`)
      return
    }
    
    console.log(`📊 총 문의 수: ${data?.length || 0}개`)
    
    if (data && data.length > 0) {
      // 상태별 집계
      const statusCount = data.reduce((acc: any, contact: any) => {
        acc[contact.status] = (acc[contact.status] || 0) + 1
        return acc
      }, {})
      
      console.log('\n상태별 분포:')
      for (const [status, count] of Object.entries(statusCount)) {
        console.log(`  - ${status}: ${count}개`)
      }
      
      // 최근 문의
      console.log('\n최근 3개 문의:')
      data.slice(0, 3).forEach((contact: any, i: number) => {
        console.log(`  ${i + 1}. ${contact.name} (${new Date(contact.created_at).toLocaleString('ko-KR')})`)
      })
    }
    
  } catch (e) {
    console.log(`❌ 데이터 확인 오류: ${e}`)
  }
  
  console.log('\n')
}

// 권장 사항
function showRecommendations(hasServiceKey: boolean, hasData: boolean) {
  console.log('5️⃣ 권장 사항')
  console.log('-------------')
  
  if (!hasServiceKey) {
    console.log('⚠️  Service Role Key 설정 권장')
    console.log('   - Vercel 환경변수에 SUPABASE_SERVICE_ROLE_KEY 추가')
    console.log('   - Supabase Dashboard → Settings → API에서 확인')
  }
  
  if (!hasData) {
    console.log('⚠️  RLS 정책 업데이트 필요')
    console.log('   - Supabase SQL Editor에서 다음 실행:')
    console.log('   ```sql')
    console.log('   CREATE POLICY "Allow anonymous inserts" ON contacts')
    console.log('     FOR INSERT TO anon WITH CHECK (true);')
    console.log('   ```')
  }
  
  console.log('\n✅ 문제 해결 가이드:')
  console.log('   - docs/SUPABASE_DATA_CHECK_GUIDE.md 참조')
  console.log('   - docs/BROWSER_DEBUG_GUIDE.md 참조')
  console.log('   - scripts/supabase-rls-policy.sql 실행')
}

// 메인 실행
async function main() {
  // 1. 환경변수 체크
  const envOk = checkEnvironmentVariables()
  
  // 2. Supabase 연결
  const supabase = await testSupabaseConnection()
  
  if (!supabase) {
    console.log('\n❌ Supabase 연결 실패. 환경변수를 확인하세요.')
    return
  }
  
  // 3. RLS 정책 확인
  await checkRLSPolicies(supabase)
  
  // 4. 데이터 확인
  await checkDataStatus(supabase)
  
  // 5. 권장사항
  const hasServiceKey = !!(process.env.SUPABASE_SERVICE_ROLE_KEY && 
                       process.env.SUPABASE_SERVICE_ROLE_KEY !== 'your_service_role_key_here')
  showRecommendations(hasServiceKey, true)
  
  console.log('\n================================')
  console.log('진단 완료!')
}

// 실행
main().catch(console.error)