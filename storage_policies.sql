-- Storage Policies Setup for Sheikh Shahid Website
-- Run these commands in your Supabase SQL Editor to fix upload permissions

-- SOLUTION 1: Disable RLS entirely on storage.objects (Recommended for development)
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;

-- SOLUTION 2: If Solution 1 doesn't work, run these commands instead:
-- First, ensure storage buckets exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('audio-files', 'audio-files', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Drop all existing storage policies
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Public Upload" ON storage.objects;
DROP POLICY IF EXISTS "Public Update" ON storage.objects;
DROP POLICY IF EXISTS "Public Delete" ON storage.objects;
DROP POLICY IF EXISTS "Enable read access for all users" ON storage.objects;
DROP POLICY IF EXISTS "Enable insert for all users" ON storage.objects;
DROP POLICY IF EXISTS "Enable update for all users" ON storage.objects;
DROP POLICY IF EXISTS "Enable delete for all users" ON storage.objects;
DROP POLICY IF EXISTS "Give anon users access to JPG images in folder 1jco7" ON storage.objects;
DROP POLICY IF EXISTS "Give users authenticated access to folder 1jco7/*" ON storage.objects;

-- Enable RLS and create comprehensive policies
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create bucket-specific policies for images
CREATE POLICY "images_policy_select" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "images_policy_insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images');
CREATE POLICY "images_policy_update" ON storage.objects FOR UPDATE USING (bucket_id = 'images');
CREATE POLICY "images_policy_delete" ON storage.objects FOR DELETE USING (bucket_id = 'images');

-- Create bucket-specific policies for audio files
CREATE POLICY "audio_policy_select" ON storage.objects FOR SELECT USING (bucket_id = 'audio-files');
CREATE POLICY "audio_policy_insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'audio-files');
CREATE POLICY "audio_policy_update" ON storage.objects FOR UPDATE USING (bucket_id = 'audio-files');
CREATE POLICY "audio_policy_delete" ON storage.objects FOR DELETE USING (bucket_id = 'audio-files');