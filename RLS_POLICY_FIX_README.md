# RLS Policy Fix for Mock Users

## Problem
Mock users (like `test`/`test123`) can log in but cannot join queues due to Row Level Security (RLS) policy blocking inserts.

## Solution
Apply the SQL script in `supabase_rls_fix.sql` to your Supabase database.

## Steps to Apply

1. **Open Supabase Dashboard**
   - Go to your Supabase project dashboard
   - Navigate to **SQL Editor** (left sidebar)

2. **Run the SQL Script**
   - Open the file `supabase_rls_fix.sql` in this repository
   - Copy the entire contents
   - Paste into the SQL Editor
   - Click **Run** (or press Ctrl+Enter)

3. **Verify the Fix**
   - The script will:
     - Drop existing policies that might conflict
     - Create a new INSERT policy that allows both authenticated users and the mock user
     - Create a SELECT policy for users to view their own entries
     - Create an optional SELECT policy for admins to view all entries

4. **Test**
   - Log in with `test` / `test123`
   - Try to join a queue
   - It should work without RLS errors

## Mock User ID
The mock user UUID is: `a1b2c3d4-e5f6-4789-a012-b3c4d5e6f789`

This is the ID used for the `test`/`test123` login in `AuthContext.jsx`.

## Notes
- This fix allows the mock user to insert and read their own waiting list entries
- Real Supabase authenticated users will continue to work as before
- Admin users (if they exist in `auth.users` with role metadata) can view all entries

