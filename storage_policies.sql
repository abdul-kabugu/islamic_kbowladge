-- Storage Policies Setup for Sheikh Shahid Website
-- Run these commands in your Supabase SQL Editor to fix upload permissions

-- First, ensure storage buckets exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('audio-files', 'audio-files', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing storage policies if they exist
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Public Upload" ON storage.objects;
DROP POLICY IF EXISTS "Public Update" ON storage.objects;
DROP POLICY IF EXISTS "Public Delete" ON storage.objects;
DROP POLICY IF EXISTS "Enable read access for all users" ON storage.objects;
DROP POLICY IF EXISTS "Enable insert for all users" ON storage.objects;
DROP POLICY IF EXISTS "Enable update for all users" ON storage.objects;
DROP POLICY IF EXISTS "Enable delete for all users" ON storage.objects;

-- Create storage policies for public access (no authentication required)
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (true);
CREATE POLICY "Public Upload" ON storage.objects FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update" ON storage.objects FOR UPDATE USING (true);
CREATE POLICY "Public Delete" ON storage.objects FOR DELETE USING (true);

-- Alternative: If you want to restrict to specific buckets only
-- CREATE POLICY "Public Access Images" ON storage.objects FOR SELECT USING (bucket_id = 'images');
-- CREATE POLICY "Public Upload Images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images');
-- CREATE POLICY "Public Access Audio" ON storage.objects FOR SELECT USING (bucket_id = 'audio-files');
-- CREATE POLICY "Public Upload Audio" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'audio-files');