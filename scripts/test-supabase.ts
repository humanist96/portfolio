import { createClient } from '@supabase/supabase-js'

// Test Supabase connection and table existence
const SUPABASE_URL = 'https://smlxpztmpauuxbptmtcv.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtbHhwenRtcGF1dXhicHRtdGN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3NTI2OTEsImV4cCI6MjA2OTMyODY5MX0.BJXj4J5epfWMOvSvsaFNfzEDwyxmMue7uyCNE9cnegI'

async function testSupabase() {
  console.log('Testing Supabase connection...')
  
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    
    // Test 1: Check if we can connect
    console.log('1. Testing connection...')
    const { data: tables, error: tableError } = await supabase
      .from('contacts')
      .select('*')
      .limit(1)
    
    if (tableError) {
      console.error('❌ Error accessing contacts table:', tableError.message)
      console.error('Full error:', tableError)
      
      // Try to create the table if it doesn't exist
      console.log('\n2. Attempting to create contacts table...')
      // Note: This won't work with anon key, but will show if table exists
    } else {
      console.log('✅ Successfully connected to Supabase!')
      console.log('✅ Contacts table exists!')
      
      // Test 2: Check table structure
      console.log('\n2. Checking table structure...')
      const { data: contacts, error: fetchError } = await supabase
        .from('contacts')
        .select('*')
        .limit(5)
      
      if (fetchError) {
        console.error('❌ Error fetching contacts:', fetchError)
      } else {
        console.log(`✅ Found ${contacts?.length || 0} contacts`)
        if (contacts && contacts.length > 0) {
          console.log('Sample contact structure:', Object.keys(contacts[0]))
        }
      }
      
      // Test 3: Try to insert a test contact
      console.log('\n3. Testing insert operation...')
      const testContact = {
        name: 'Test User',
        email: 'test@example.com',
        message: 'This is a test message from the verification script',
        status: 'new',
        created_at: new Date().toISOString()
      }
      
      const { data: insertedContact, error: insertError } = await supabase
        .from('contacts')
        .insert([testContact])
        .select()
        .single()
      
      if (insertError) {
        console.error('❌ Error inserting test contact:', insertError.message)
        console.log('Note: This might be due to permissions. Anon users might not have insert permissions.')
      } else {
        console.log('✅ Successfully inserted test contact:', insertedContact)
        
        // Clean up test contact
        if (insertedContact?.id) {
          const { error: deleteError } = await supabase
            .from('contacts')
            .delete()
            .eq('id', insertedContact.id)
          
          if (deleteError) {
            console.error('Could not delete test contact:', deleteError.message)
          } else {
            console.log('✅ Cleaned up test contact')
          }
        }
      }
    }
    
    // Test 4: Check RLS policies
    console.log('\n4. Checking Row Level Security (RLS)...')
    console.log('Note: If inserts/updates fail, RLS policies might need adjustment')
    
  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

// Run the test
testSupabase()