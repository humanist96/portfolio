import { NextResponse } from 'next/server'
import { contactStorage } from '@/lib/contact-storage'

// 초기 데모 데이터 설정을 위한 API
export async function GET() {
  const demoContacts = [
    {
      name: '홍길동',
      email: 'hong@example.com',
      message: '서비스 이용 중 오류가 발생했습니다. 확인 부탁드립니다.',
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'new' as const,
      ip_address: '127.0.0.1',
      user_agent: 'Mozilla/5.0'
    },
    {
      name: '김철수',
      email: 'kim@example.com',
      message: '비즈니스 플랜 관련 문의드립니다. 연락 부탁드립니다.',
      created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'read' as const,
      ip_address: '127.0.0.1',
      user_agent: 'Mozilla/5.0'
    },
    {
      name: '이영희',
      email: 'lee@example.com',
      message: '서비스가 정말 유용합니다. 감사합니다!',
      created_at: new Date().toISOString(),
      status: 'replied' as const,
      ip_address: '127.0.0.1',
      user_agent: 'Mozilla/5.0'
    },
    {
      name: '박민수',
      email: 'park@example.com',
      message: 'AI 기능에 대해 더 자세히 알고 싶습니다.',
      created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      status: 'new' as const,
      ip_address: '127.0.0.1',
      user_agent: 'Mozilla/5.0'
    },
    {
      name: '정수진',
      email: 'jung@example.com',
      message: '투자 분석 서비스를 이용하고 싶습니다. 상담 요청드립니다.',
      created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      status: 'closed' as const,
      ip_address: '127.0.0.1',
      user_agent: 'Mozilla/5.0'
    }
  ]
  
  try {
    // Add demo contacts to storage
    const addedContacts = []
    for (const contact of demoContacts) {
      const added = await contactStorage.addContact(contact)
      addedContacts.push(added)
    }
    
    return NextResponse.json({
      success: true,
      message: '데모 데이터가 성공적으로 추가되었습니다.',
      contacts: addedContacts
    })
  } catch (error) {
    console.error('Error adding demo data:', error)
    return NextResponse.json({
      success: false,
      message: '데모 데이터 추가 중 오류가 발생했습니다.',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}