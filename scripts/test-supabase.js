// Test script for Supabase connection
// Run with: node scripts/test-supabase.js

const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = 'https://smlxpztmpauuxbptmtcv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtbHhwenRtcGF1dXhicHRtdGN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3NTI2OTEsImV4cCI6MjA2OTMyODY5MX0.BJXj4J5epfWMOvSvsaFNfzEDwyxmMue7uyCNE9cnegI';

console.log('🔄 Supabase 연결 테스트 시작...\n');
console.log(`URL: ${supabaseUrl}`);
console.log(`Key: ${supabaseAnonKey.substring(0, 20)}...`);

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  try {
    // 1. 연결 테스트
    console.log('\n1️⃣ 연결 테스트...');
    const { data: tables, error: tablesError } = await supabase
      .from('contacts')
      .select('id')
      .limit(1);

    if (tablesError) {
      if (tablesError.message.includes('relation "public.contacts" does not exist')) {
        console.log('❌ contacts 테이블이 존재하지 않습니다.');
        console.log('📋 SQL Editor에서 schema.sql 파일을 실행해주세요.\n');
        return false;
      }
      console.error('❌ 연결 오류:', tablesError.message);
      return false;
    }

    console.log('✅ Supabase 연결 성공!');

    // 2. 테스트 데이터 삽입
    console.log('\n2️⃣ 테스트 데이터 삽입...');
    const testData = {
      name: '테스트 사용자',
      email: 'test@example.com',
      message: 'Supabase 연결 테스트 메시지입니다.',
      status: 'new',
      ip_address: '127.0.0.1',
      user_agent: 'Test Script'
    };

    const { data: insertData, error: insertError } = await supabase
      .from('contacts')
      .insert([testData])
      .select();

    if (insertError) {
      console.error('❌ 삽입 오류:', insertError.message);
      return false;
    }

    console.log('✅ 테스트 데이터 삽입 성공!');
    console.log('삽입된 데이터:', insertData[0]);

    // 3. 데이터 조회
    console.log('\n3️⃣ 데이터 조회 테스트...');
    const { data: contacts, error: selectError } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (selectError) {
      console.error('❌ 조회 오류:', selectError.message);
      return false;
    }

    console.log('✅ 데이터 조회 성공!');
    console.log(`총 ${contacts.length}개의 문의 발견`);

    // 4. 통계 조회 (view가 있는 경우)
    console.log('\n4️⃣ 통계 조회 테스트...');
    const { data: stats, error: statsError } = await supabase
      .from('contact_stats')
      .select('*')
      .single();

    if (statsError) {
      console.log('⚠️  통계 뷰가 아직 생성되지 않았습니다.');
    } else {
      console.log('✅ 통계 조회 성공!');
      console.log('통계:', stats);
    }

    return true;

  } catch (error) {
    console.error('❌ 예상치 못한 오류:', error);
    return false;
  }
}

// 메인 실행
testConnection().then(success => {
  if (success) {
    console.log('\n🎉 모든 테스트 통과! Supabase가 정상적으로 설정되었습니다.');
  } else {
    console.log('\n⚠️  일부 테스트가 실패했습니다. 위의 오류 메시지를 확인하세요.');
    console.log('\n다음을 확인해주세요:');
    console.log('1. Supabase Dashboard에서 SQL Editor를 열어주세요');
    console.log('2. supabase/schema.sql 파일의 내용을 복사하여 실행해주세요');
    console.log('3. Table Editor에서 contacts 테이블이 생성되었는지 확인해주세요');
  }
});