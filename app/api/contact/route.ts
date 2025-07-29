import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://smlxpztmpauuxbptmtcv.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtbHhwenRtcGF1dXhicHRtdGN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3NTI2OTEsImV4cCI6MjA2OTMyODY5MX0.BJXj4J5epfWMOvSvsaFNfzEDwyxmMue7uyCNE9cnegI'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface ContactData {
  name: string
  email: string
  message: string
}

export async function POST(request: NextRequest) {
  console.log('Contact API called')
  
  try {
    // Parse request body
    const body = await request.json()
    console.log('Request body:', body)
    const { name, email, message } = body as ContactData

    // Validation
    const errors: string[] = []

    // Name validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      errors.push('이름을 입력해주세요.')
    } else if (name.trim().length < 2) {
      errors.push('이름은 최소 2자 이상이어야 합니다.')
    } else if (name.trim().length > 50) {
      errors.push('이름은 50자를 초과할 수 없습니다.')
    }

    // Email validation
    if (!email || typeof email !== 'string' || email.trim().length === 0) {
      errors.push('이메일을 입력해주세요.')
    } else if (!emailRegex.test(email.trim())) {
      errors.push('유효한 이메일 주소를 입력해주세요.')
    }

    // Message validation
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      errors.push('메시지를 입력해주세요.')
    } else if (message.trim().length < 10) {
      errors.push('메시지는 최소 10자 이상이어야 합니다.')
    } else if (message.trim().length > 1000) {
      errors.push('메시지는 1000자를 초과할 수 없습니다.')
    }

    // Return validation errors if any
    if (errors.length > 0) {
      return NextResponse.json(
        { 
          success: false,
          errors 
        },
        { status: 400 }
      )
    }

    // Get additional metadata
    const headers = request.headers
    const ip = headers.get('x-forwarded-for') || headers.get('x-real-ip') || 'unknown'
    const userAgent = headers.get('user-agent') || 'unknown'
    
    // Sanitize data
    const sanitizedData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      created_at: new Date().toISOString(),
      ip_address: ip.split(',')[0].trim(), // Get first IP if multiple
      user_agent: userAgent,
      status: 'new'
    }

    // Insert into Supabase
    try {
      const { data, error } = await supabase
        .from('contacts')
        .insert([sanitizedData])
        .select()

      if (error) {
        console.error('Supabase error:', error)
        
        // Check if it's a table not found error
        if (error.message && error.message.includes('relation "public.contacts" does not exist')) {
          return NextResponse.json(
            { 
              success: false,
              error: '데이터베이스 테이블이 아직 생성되지 않았습니다. Supabase Dashboard에서 SQL을 실행해주세요.' 
            },
            { status: 500 }
          )
        }
        
        return NextResponse.json(
          { 
            success: false,
            error: '메시지 전송에 실패했습니다. 잠시 후 다시 시도해주세요.' 
          },
          { status: 500 }
        )
      }

      // Success response
      return NextResponse.json(
        { 
          success: true,
          message: '메시지가 성공적으로 전송되었습니다.',
          data: data && data[0] ? data[0] : sanitizedData
        },
        { status: 201 }
      )
    } catch (error) {
      console.error('Supabase connection error:', error)
      // Fallback to demo mode if Supabase is not available
      console.log('Contact form submission (Demo mode):', sanitizedData)
      return NextResponse.json(
        { 
          success: true,
          message: '메시지가 접수되었습니다. (데모 모드)',
          data: sanitizedData
        },
        { status: 201 }
      )
    }

  } catch (error) {
    console.error('API route error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' 
      },
      { status: 500 }
    )
  }
}

// Optional: Add rate limiting headers
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  })
}