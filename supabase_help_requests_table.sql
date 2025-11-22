-- Create help_requests table for patient help requests
-- Run this in Supabase SQL Editor

-- Create help_requests table
CREATE TABLE IF NOT EXISTS help_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hospital_id TEXT NOT NULL,
  patient_name TEXT NOT NULL,
  description TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'resolved', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security
ALTER TABLE help_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for help_requests
-- Allow everyone to view help requests
DROP POLICY IF EXISTS "Anyone can view help requests" ON help_requests;
CREATE POLICY "Anyone can view help requests" 
  ON help_requests FOR SELECT 
  USING (true);

-- Allow authenticated users to insert help requests
DROP POLICY IF EXISTS "Anyone can insert help requests" ON help_requests;
CREATE POLICY "Anyone can insert help requests" 
  ON help_requests FOR INSERT 
  WITH CHECK (true);

-- Allow updates (for status changes)
DROP POLICY IF EXISTS "Anyone can update help requests" ON help_requests;
CREATE POLICY "Anyone can update help requests" 
  ON help_requests FOR UPDATE 
  USING (true)
  WITH CHECK (true);

-- Allow deletes
DROP POLICY IF EXISTS "Anyone can delete help requests" ON help_requests;
CREATE POLICY "Anyone can delete help requests" 
  ON help_requests FOR DELETE 
  USING (true);

-- Enable real-time for help_requests table
-- Go to Database > Replication and enable replication for 'help_requests' table

