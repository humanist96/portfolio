-- This SQL script updates the RLS policies for the contacts table
-- Run this in the Supabase SQL editor

-- Enable RLS on the contacts table
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow anonymous users to insert contacts" ON contacts;
DROP POLICY IF EXISTS "Allow service role to manage all contacts" ON contacts;
DROP POLICY IF EXISTS "Allow authenticated admin to read contacts" ON contacts;

-- Policy 1: Allow anonymous users to insert new contacts
CREATE POLICY "Allow anonymous users to insert contacts" ON contacts
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Policy 2: Allow service role full access (for admin operations)
CREATE POLICY "Allow service role to manage all contacts" ON contacts
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Policy 3: Restrict anonymous users from reading/updating/deleting
-- (They can only insert)
CREATE POLICY "Restrict anonymous read access" ON contacts
    FOR SELECT
    TO anon
    USING (false);

CREATE POLICY "Restrict anonymous update access" ON contacts
    FOR UPDATE
    TO anon
    USING (false)
    WITH CHECK (false);

CREATE POLICY "Restrict anonymous delete access" ON contacts
    FOR DELETE
    TO anon
    USING (false);

-- Optional: If you want to allow authenticated users (logged in via Supabase Auth) to read
-- CREATE POLICY "Allow authenticated users to read contacts" ON contacts
--     FOR SELECT
--     TO authenticated
--     USING (true);

-- Verify the policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'contacts';