-- SQL for Achievements Table and Storage
-- Run this in the Supabase SQL Editor

-- 1. Create the achievements table
CREATE TABLE IF NOT EXISTS public.achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT null,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

-- 3. Create policies for the table
-- Allow everyone to view achievements
CREATE POLICY "Allow public read access"
  ON public.achievements FOR SELECT
  USING (true);

-- Allow authenticated users (admin) to manage achievements
CREATE POLICY "Allow authenticated CRUD"
  ON public.achievements FOR ALL
  USING (auth.role() = 'authenticated');

-- 4. Create a bucket for achievement images
INSERT INTO storage.buckets (id, name, public)
VALUES ('achievement-images', 'achievement-images', true)
ON CONFLICT (id) DO NOTHING;

-- 5. Storage Policies
-- Allow public access to images
CREATE POLICY "Public Access Achievements"
ON storage.objects FOR SELECT
USING ( bucket_id = 'achievement-images' );

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated Upload Achievements"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'achievement-images' 
    AND auth.role() = 'authenticated'
);

-- Allow authenticated users to delete images
CREATE POLICY "Authenticated Delete Achievements"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'achievement-images' 
    AND auth.role() = 'authenticated'
);
