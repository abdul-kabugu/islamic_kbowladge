-- FINAL STORAGE FIX for Sheikh Shahid Website
-- Run this EXACT script in your Supabase SQL Editor

-- Step 1: Completely disable RLS on storage.objects
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;

-- Step 2: Create buckets if they don't exist  
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('images', 'images', true, 10485760, ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']),
  ('audio-files', 'audio-files', true, 52428800, ARRAY['audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/x-wav'])
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Step 3: Grant public access to storage schema (if needed)
GRANT USAGE ON SCHEMA storage TO anon, authenticated;
GRANT ALL ON storage.objects TO anon, authenticated;
GRANT ALL ON storage.buckets TO anon, authenticated;

-- Step 4: Ensure buckets are marked as public
UPDATE storage.buckets SET public = true WHERE id IN ('images', 'audio-files');

-- Verification query - run this to check everything is working
SELECT 
  id, 
  name, 
  public, 
  file_size_limit,
  allowed_mime_types
FROM storage.buckets 
WHERE id IN ('images', 'audio-files');