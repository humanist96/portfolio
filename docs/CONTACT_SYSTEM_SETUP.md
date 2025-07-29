# Contact System Setup Guide

## Overview
The contact system uses Supabase for storing contact form submissions. This guide explains how to set it up properly.

## Current Issue
The admin page is not showing contact inquiries because:
1. The `SUPABASE_SERVICE_ROLE_KEY` is not properly set in the environment
2. Row Level Security (RLS) policies on Supabase are blocking anonymous inserts

## Solution Steps

### Option 1: Update RLS Policies (Recommended for Quick Fix)

1. **Go to Supabase Dashboard**
   - Visit https://supabase.com/dashboard
   - Select your project (smlxpztmpauuxbptmtcv)

2. **Open SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Create a new query

3. **Run the RLS Policy Script**
   - Copy the contents of `scripts/supabase-rls-policy.sql`
   - Paste and run it in the SQL editor
   - This will allow anonymous users to insert contacts

### Option 2: Set Service Role Key (Recommended for Production)

1. **Get Service Role Key from Supabase**
   - Go to Project Settings → API
   - Copy the "service_role" key (not the anon key)

2. **Update Vercel Environment Variables**
   - Go to your Vercel project dashboard
   - Settings → Environment Variables
   - Add/Update: `SUPABASE_SERVICE_ROLE_KEY` = [your service role key]
   - Redeploy the application

3. **Update Local Environment**
   - Edit `.env.local`
   - Replace `your_service_role_key_here` with the actual key

### Testing the Fix

1. **Test Contact Submission**
   ```bash
   # Run the test script
   npx tsx scripts/test-supabase.ts
   ```

2. **Submit a Test Contact**
   - Go to your website's contact form
   - Submit a test message
   - Check the admin page to see if it appears

3. **Check Logs**
   - Open browser console on the admin page
   - Look for any error messages
   - Check Vercel Function logs for server-side errors

## How the System Works

1. **Contact Submission Flow**
   - User fills out contact form
   - Form posts to `/api/contact`
   - API uses `contact-storage.ts` to save to Supabase
   - Falls back to in-memory storage if Supabase fails

2. **Admin Dashboard Flow**
   - Admin page calls `/api/admin/contacts`
   - API uses `contact-storage.ts` to fetch from Supabase
   - Returns contacts with stats

3. **Storage Fallback**
   - If Supabase is not configured → uses in-memory storage
   - If RLS blocks insert → uses in-memory storage
   - In-memory storage is lost on server restart

## Troubleshooting

### "No contacts found" in Admin
- Check browser console for errors
- Verify Supabase credentials in environment
- Run the RLS policy script
- Check if contacts table exists in Supabase

### "Row-level security policy" error
- Run the RLS policy script in Supabase
- Or add the service role key to environment

### Contacts not persisting
- System is using in-memory fallback
- Fix Supabase connection to persist data

## Environment Variables Needed

```env
# Required
NEXT_PUBLIC_SUPABASE_URL=https://smlxpztmpauuxbptmtcv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...

# One of these is needed:
# Option 1: Service role key (bypasses RLS)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Option 2: Update RLS policies to allow anon inserts

# Admin credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=kevin2024!
```

## Security Notes

- Never expose the service role key in client-side code
- The anon key is safe to expose (it's public)
- RLS policies protect your data even with exposed anon key
- Always use HTTPS in production