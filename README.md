# Saniat Rmel Hospital Patient Portal

A modern patient portal web application for Saniat Rmel Hospital in Tetouan, Morocco. Built with React, Vite, Tailwind CSS, and Supabase.

## Features

- 🔐 **Patient Authentication** - Secure login and signup
- ⏱️ **Real-time Waiting Lists** - Join department queues with live updates
- 🩸 **Blood Bank Inventory** - View blood type availability
- 👨‍⚕️ **Doctor Directory** - Browse doctors and their availability
- 🗺️ **Interactive Map** - Find hospital locations

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Real-time)
- **Maps**: Leaflet + OpenStreetMap

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Create a `.env.local` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Set Up Database Tables

Run these SQL commands in your Supabase SQL Editor:

```sql
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

-- Enable Row Level Security
ALTER TABLE waiting_list ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE blood_bank ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;

-- Create policies (users can read all, insert their own waiting list entries)
CREATE POLICY "Users can view waiting lists" ON waiting_list FOR SELECT USING (true);
CREATE POLICY "Users can insert waiting lists" ON waiting_list FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view doctors" ON doctors FOR SELECT USING (true);
CREATE POLICY "Users can view blood bank" ON blood_bank FOR SELECT USING (true);
CREATE POLICY "Users can view departments" ON departments FOR SELECT USING (true);
```

### 4. Seed Initial Data

```sql
-- Insert departments
INSERT INTO departments (name, description, capacity) VALUES
('Emergency', 'Urgent care and emergency services', 20),
('Surgery', 'Surgical procedures and operations', 10),
('Radiology', 'Medical imaging and diagnostics', 15),
('Cardiology', 'Heart and cardiovascular care', 12),
('Pediatrics', 'Children healthcare services', 18);

-- Insert doctors (replace department_id with actual IDs from departments table)
INSERT INTO doctors (name, specialization, department_id, available) VALUES
('Dr. Amina Bennani', 'Emergency Medicine', (SELECT id FROM departments WHERE name = 'Emergency'), true),
('Dr. Youssef Alami', 'Cardiology', (SELECT id FROM departments WHERE name = 'Cardiology'), true),
('Dr. Fatima Zahra', 'Pediatrics', (SELECT id FROM departments WHERE name = 'Pediatrics'), false),
('Dr. Hassan Tazi', 'General Surgery', (SELECT id FROM departments WHERE name = 'Surgery'), true),
('Dr. Laila Senhaji', 'Radiology', (SELECT id FROM departments WHERE name = 'Radiology'), true);

-- Insert blood bank data
INSERT INTO blood_bank (blood_type, units) VALUES
('A+', 12),
('A-', 3),
('B+', 8),
('B-', 2),
('O+', 15),
('O-', 5),
('AB+', 4),
('AB-', 1);
```

### 5. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── LoginForm.jsx
│   │   └── SignupForm.jsx
│   ├── common/
│   │   ├── Header.jsx
│   │   ├── JoinQueueModal.jsx
│   │   └── LoadingSpinner.jsx
│   ├── dashboard/
│   │   ├── Dashboard.jsx
│   │   ├── WaitingListTab.jsx
│   │   ├── BloodBankTab.jsx
│   │   └── DoctorsTab.jsx
│   └── map/
│       └── MapView.jsx
├── hooks/
│   └── useAuth.js
├── lib/
│   └── supabaseClient.js
├── App.jsx
├── main.jsx
└── index.css
```

## Design System

Colors from `design.json`:
- Primary: #4CAF50 (green)
- Secondary: #2E7D32 (dark green)
- Accent: #43A047 (bright green)
- Background: #F5F7FA (light gray)
- Text: #4D4D4D (dark gray)

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy!

## License

MIT

