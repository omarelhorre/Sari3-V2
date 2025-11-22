-- Migration script to add description column to existing help_requests table
-- Run this in Supabase SQL Editor if you already created the help_requests table

-- Add description column if it doesn't exist
ALTER TABLE help_requests 
ADD COLUMN IF NOT EXISTS description TEXT;

-- Add a comment to document the column
COMMENT ON COLUMN help_requests.description IS 'Optional: Description of the help request from the patient.';

