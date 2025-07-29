import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client (optional - only if environment variables are provided)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface ContactData {
  name: string
  email: string
  message: string
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()
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

    // Sanitize data
    const sanitizedData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      created_at: new Date().toISOString()
    }

    // Insert into Supabase if configured
    if (supabase) {
      const { data, error } = await supabase
        .from('contacts')
        .insert([sanitizedData])
        .select()

      if (error) {
        console.error('Supabase error:', error)
        return NextResponse.json(
          { 
            success: false,
            error: '메시지 전송에 실패했습니다. 잠시 후 다시 시도해주세요.' 
          },
          { status: 500 }
        )
      }

      // Success response with Supabase
      return NextResponse.json(
        { 
          success: true,
          message: '메시지가 성공적으로 전송되었습니다.',
          data: data[0]
        },
        { status: 201 }
      )
    } else {
      // Success response without Supabase (for demo purposes)
      console.log('Contact form submission (Supabase not configured):', sanitizedData)
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