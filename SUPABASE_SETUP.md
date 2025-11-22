# Supabase Database Setup Guide

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in project details:
   - Name: `saniat-rmel-hospital`
   - Database Password: (choose a strong password)
   - Region: (choose closest to you)
5. Wait for project to be created (2-3 minutes)

## Step 2: Get API Credentials

1. Go to Settings > API
2. Copy:
   - Project URL (e.g., `https://xxxxx.supabase.co`)
   - anon/public key (starts with `eyJ...`)

## Step 3: Create Tables

Go to SQL Editor and run this script:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create departments table
CREATE TABLE departments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  capacity INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create waiting_list table
CREATE TABLE waiting_list (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  patient_name TEXT NOT NULL,
  department_id UUID REFERENCES departments(id) ON DELETE CASCADE,
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'waiting'
);

-- Create doctors table
CREATE TABLE doctors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  specialization TEXT NOT NULL,
  department_id UUID REFERENCES departments(id) ON DELETE CASCADE,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blood_bank table
CREATE TABLE blood_bank (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  blood_type TEXT UNIQUE NOT NULL,
  units INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Step 4: Enable Row Level Security

```sql
-- Enable RLS
ALTER TABLE waiting_list ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE blood_bank ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
```

## Step 5: Create Security Policies

```sql
-- Policies for waiting_list
CREATE POLICY "Users can view waiting lists" 
  ON waiting_list FOR SELECT 
  USING (true);

CREATE POLICY "Users can insert their own waiting list entries" 
  ON waiting_list FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Policies for doctors
CREATE POLICY "Users can view doctors" 
  ON doctors FOR SELECT 
  USING (true);

-- Policies for blood_bank
CREATE POLICY "Users can view blood bank" 
  ON blood_bank FOR SELECT 
  USING (true);

-- Policies for departments
CREATE POLICY "Users can view departments" 
  ON departments FOR SELECT 
  USING (true);
```

## Step 6: Seed Initial Data

```sql
-- Insert departments
INSERT INTO departments (name, description, capacity) VALUES
('Emergency', 'Urgent care and emergency services', 20),
('Surgery', 'Surgical procedures and operations', 10),
('Radiology', 'Medical imaging and diagnostics', 15),
('Cardiology', 'Heart and cardiovascular care', 12),
('Pediatrics', 'Children healthcare services', 18);

-- Insert doctors (run after departments are inserted)
INSERT INTO doctors (name, specialization, department_id, available) VALUES
('Dr. Amina Bennani', 'Emergency Medicine', (SELECT id FROM departments WHERE name = 'Emergency' LIMIT 1), true),
('Dr. Youssef Alami', 'Cardiology', (SELECT id FROM departments WHERE name = 'Cardiology' LIMIT 1), true),
('Dr. Fatima Zahra', 'Pediatrics', (SELECT id FROM departments WHERE name = 'Pediatrics' LIMIT 1), false),
('Dr. Hassan Tazi', 'General Surgery', (SELECT id FROM departments WHERE name = 'Surgery' LIMIT 1), true),
('Dr. Laila Senhaji', 'Radiology', (SELECT id FROM departments WHERE name = 'Radiology' LIMIT 1), true);

-- Insert blood bank data
INSERT INTO blood_bank (blood_type, units) VALUES
('A+', 12),
('A-', 3),
('B+', 8),
('B-', 2),
('O+', 15),
('O-', 5),
('AB+', 4),
('AB-', 1)
ON CONFLICT (blood_type) DO NOTHING;
```

## Step 7: Enable Real-time

1. Go to Database > Replication
2. Enable replication for:
   - `waiting_list` table
   - `blood_bank` table
   - `doctors` table (optional)

## Step 8: Configure Environment Variables

Create `.env.local` file:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Verification

1. Go to Table Editor
2. Verify all tables are created
3. Check that data is seeded correctly
4. Test authentication in your app

## Troubleshooting

### RLS Policy Errors
- Make sure policies are created correctly
- Check that `auth.users` table exists (created automatically)

### Real-time Not Working
- Enable replication in Database > Replication settings
- Check browser console for connection errors

### Foreign Key Errors
- Make sure departments are inserted before doctors
- Check that department_id values match actual department IDs

