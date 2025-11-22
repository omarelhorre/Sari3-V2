-- Fix RLS Policy for waiting_list table to allow mock users
-- This allows the mock user (test/test123) to insert records into waiting_list

-- First, check if the policy exists and drop it
DROP POLICY IF EXISTS "Users can insert waiting lists" ON waiting_list;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON waiting_list;
DROP POLICY IF EXISTS "waiting_list_insert_policy" ON waiting_list;

-- Create a new policy that allows both authenticated users and the mock user
-- The mock user ID is: a1b2c3d4-e5f6-4789-a012-b3c4d5e6f789
CREATE POLICY "Users can insert waiting lists" 
  ON waiting_list FOR INSERT 
  WITH CHECK (
    -- Allow if auth.uid() matches user_id (for real Supabase users)
    auth.uid() = user_id 
    OR 
    -- Allow if user_id matches the mock user UUID (for mock/test users)
    user_id = 'a1b2c3d4-e5f6-4789-a012-b3c4d5e6f789'::uuid
  );

-- Also ensure users can read their own waiting list entries
DROP POLICY IF EXISTS "Users can view own waiting lists" ON waiting_list;
DROP POLICY IF EXISTS "Enable read access for users" ON waiting_list;

CREATE POLICY "Users can view own waiting lists" 
  ON waiting_list FOR SELECT 
  USING (
    auth.uid() = user_id 
    OR 
    user_id = 'a1b2c3d4-e5f6-4789-a012-b3c4d5e6f789'::uuid
  );

-- Allow admins to view all waiting list entries (if you have admin users in auth.users)
-- This is optional but useful for admin dashboard
CREATE POLICY "Admins can view all waiting lists" 
  ON waiting_list FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND (auth.users.raw_user_meta_data->>'role' = 'admin' 
           OR auth.users.raw_app_meta_data->>'role' = 'admin')
    )
  );

