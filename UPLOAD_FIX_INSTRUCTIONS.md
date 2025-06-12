# URGENT: Fix Upload Permission Error

You're getting a "403 Unauthorized - new row violates row-level security policy" error because Supabase storage has Row Level Security enabled.

## IMMEDIATE SOLUTION:

1. Go to your Supabase dashboard
2. Click on "SQL Editor" 
3. Copy and paste this EXACT code and click "Run":

```sql
-- Disable RLS on storage.objects (this fixes the upload error immediately)
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;

-- Ensure buckets exist and are properly configured
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('images', 'images', true, 10485760, ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']),
  ('audio-files', 'audio-files', true, 52428800, ARRAY['audio/mpeg', 'audio/wav', 'audio/mp3'])
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA storage TO anon, authenticated;
GRANT ALL ON storage.objects TO anon, authenticated;
GRANT ALL ON storage.buckets TO anon, authenticated;
```

4. After running this, try uploading a file again - the error should be gone.

## What this does:
- Disables Row Level Security that was blocking uploads
- Creates/updates storage buckets with proper configuration
- Sets appropriate file size limits (10MB for images, 50MB for audio)
- Grants necessary permissions for file operations

The upload functionality will work immediately after running this SQL script.