// Server-side contact storage for Vercel Edge Functions
// Uses Supabase as primary storage with in-memory fallback

import { createClient } from '@supabase/supabase-js'

export interface Contact {
  id: number
  name: string
  email: string
  message: string
  created_at: string
  status: 'new' | 'read' | 'replied' | 'closed'
  ip_address?: string
  user_agent?: string
}

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Create a service role client for server-side operations
const getSupabaseClient = () => {
  if (!supabaseUrl || !supabaseServiceKey) {
    console.warn('Supabase credentials not configured')
    return null
  }
  
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

// In-memory fallback for when Supabase is unavailable
const inMemoryContacts: Contact[] = []
let nextId = 1

class ContactStorage {
  async getAllContacts(): Promise<Contact[]> {
    const supabase = getSupabaseClient()
    
    if (!supabase) {
      return [...inMemoryContacts].sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
    }
    
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching contacts:', error)
      return [...inMemoryContacts].sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
    }
  }
  
  async getContactsByStatus(status?: Contact['status']): Promise<Contact[]> {
    const supabase = getSupabaseClient()
    
    if (!supabase) {
      const contacts = [...inMemoryContacts]
      if (!status) return contacts
      return contacts.filter(c => c.status === status)
    }
    
    try {
      let query = supabase.from('contacts').select('*').order('created_at', { ascending: false })
      
      if (status) {
        query = query.eq('status', status)
      }
      
      const { data, error } = await query
      
      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching contacts by status:', error)
      const contacts = [...inMemoryContacts]
      if (!status) return contacts
      return contacts.filter(c => c.status === status)
    }
  }
  
  async addContact(contact: Omit<Contact, 'id'>): Promise<Contact> {
    const supabase = getSupabaseClient()
    
    if (!supabase) {
      const newContact: Contact = {
        ...contact,
        id: nextId++
      }
      inMemoryContacts.push(newContact)
      return newContact
    }
    
    try {
      const { data, error } = await supabase
        .from('contacts')
        .insert([contact])
        .select()
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error adding contact:', error)
      const newContact: Contact = {
        ...contact,
        id: nextId++
      }
      inMemoryContacts.push(newContact)
      return newContact
    }
  }
  
  async updateContactStatus(id: number, status: Contact['status']): Promise<void> {
    const supabase = getSupabaseClient()
    
    if (!supabase) {
      const index = inMemoryContacts.findIndex(c => c.id === id)
      if (index !== -1) {
        inMemoryContacts[index].status = status
      }
      return
    }
    
    try {
      const { error } = await supabase
        .from('contacts')
        .update({ status })
        .eq('id', id)
      
      if (error) throw error
    } catch (error) {
      console.error('Error updating contact status:', error)
      const index = inMemoryContacts.findIndex(c => c.id === id)
      if (index !== -1) {
        inMemoryContacts[index].status = status
      }
    }
  }
  
  async deleteContact(id: number): Promise<void> {
    const supabase = getSupabaseClient()
    
    if (!supabase) {
      const index = inMemoryContacts.findIndex(c => c.id === id)
      if (index !== -1) {
        inMemoryContacts.splice(index, 1)
      }
      return
    }
    
    try {
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id)
      
      if (error) throw error
    } catch (error) {
      console.error('Error deleting contact:', error)
      const index = inMemoryContacts.findIndex(c => c.id === id)
      if (index !== -1) {
        inMemoryContacts.splice(index, 1)
      }
    }
  }
  
  async getStats() {
    const contacts = await this.getAllContacts()
    const now = new Date()
    const today = now.toDateString()
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    
    return {
      total: contacts.length,
      new: contacts.filter(c => c.status === 'new').length,
      read: contacts.filter(c => c.status === 'read').length,
      replied: contacts.filter(c => c.status === 'replied').length,
      closed: contacts.filter(c => c.status === 'closed').length,
      todayCount: contacts.filter(c => new Date(c.created_at).toDateString() === today).length,
      weekCount: contacts.filter(c => new Date(c.created_at) >= weekAgo).length
    }
  }
}

export const contactStorage = new ContactStorage()