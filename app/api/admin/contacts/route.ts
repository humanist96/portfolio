import { NextRequest, NextResponse } from 'next/server'
import { contactStorage } from '@/lib/contact-storage'

// 인증 확인 함수
function checkAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  if (!authHeader) return false
  
  const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'kevin2024!'
  
  try {
    const [type, credentials] = authHeader.split(' ')
    if (type !== 'Basic') return false
    
    const [username, password] = atob(credentials).split(':')
    return username === ADMIN_USERNAME && password === ADMIN_PASSWORD
  } catch (error) {
    return false
  }
}

export async function GET(request: NextRequest) {
  // 인증 확인 - middleware에서 이미 처리되므로 선택적
  // if (!checkAuth(request)) {
  //   return NextResponse.json(
  //     { error: 'Unauthorized' },
  //     { status: 401 }
  //   )
  // }
  
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const validStatus = status === 'all' ? undefined : status
  
  try {
    // Contact storage에서 데이터 가져오기
    const contacts = await contactStorage.getContactsByStatus(validStatus as any)
    const stats = await contactStorage.getStats()
    
    return NextResponse.json({ 
      success: true,
      contacts,
      stats,
      isDemo: false
    })
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  // 인증 확인 - middleware에서 이미 처리되므로 선택적
  // if (!checkAuth(request)) {
  //   return NextResponse.json(
  //     { error: 'Unauthorized' },
  //     { status: 401 }
  //   )
  // }
  
  try {
    const { id, status } = await request.json()
    
    await contactStorage.updateContactStatus(id, status)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating contact:', error)
    return NextResponse.json(
      { error: 'Failed to update contact' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  // 인증 확인 - middleware에서 이미 처리되므로 선택적
  // if (!checkAuth(request)) {
  //   return NextResponse.json(
  //     { error: 'Unauthorized' },
  //     { status: 401 }
  //   )
  // }
  
  try {
    const { id } = await request.json()
    
    await contactStorage.deleteContact(id)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting contact:', error)
    return NextResponse.json(
      { error: 'Failed to delete contact' },
      { status: 500 }
    )
  }
}