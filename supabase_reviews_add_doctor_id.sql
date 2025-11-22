-- Migration script to add doctor_id column to existing reviews table
-- Run this in Supabase SQL Editor if you already created the reviews table

-- Add doctor_id column if it doesn't exist
ALTER TABLE reviews 
ADD COLUMN IF NOT EXISTS doctor_id UUID REFERENCES doctors(id) ON DELETE SET NULL;

-- Add a comment to document the column
COMMENT ON COLUMN reviews.doctor_id IS 'Optional: ID of the doctor being reviewed. NULL means general hospital review.';

