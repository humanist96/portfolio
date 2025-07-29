import { createClient } from '@supabase/supabase-js'

// Database types
export interface Contact {
  id?: number
  name: string
  email: string
  message: string
  created_at?: string
  status?: 'new' | 'read' | 'replied' | 'closed'
  ip_address?: string
  user_agent?: string
  replied_at?: string
  reply_message?: string
  notes?: string
}

// Initialize Supabase client for client-side usage
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://smlxpztmpauuxbptmtcv.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtbHhwenRtcGF1dXhicHRtdGN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3NTI2OTEsImV4cCI6MjA2OTMyODY5MX0.BJXj4J5epfWMOvSvsaFNfzEDwyxmMue7uyCNE9cnegI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper function to get server-side Supabase client
export const getServerSupabase = () => {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set')
  }
  
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}

// Contact form helpers
export const submitContact = async (data: Omit<Contact, 'id' | 'created_at'>) => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to submit contact')
  }
  
  return response.json()
}

// Admin helpers (for future use)
export const getContacts = async (status?: Contact['status']) => {
  let query = supabase.from('contacts').select('*').order('created_at', { ascending: false })
  
  if (status) {
    query = query.eq('status', status)
  }
  
  const { data, error } = await query
  
  if (error) throw error
  return data as Contact[]
}

export const updateContactStatus = async (id: number, status: Contact['status']) => {
  const { error } = await supabase
    .from('contacts')
    .update({ status })
    .eq('id', id)
  
  if (error) throw error
}

export const replyToContact = async (id: number, replyMessage: string) => {
  const { error } = await supabase.rpc('reply_to_contact', {
    contact_id: id,
    reply_text: replyMessage
  })
  
  if (error) throw error
}