-- Supabase Database Setup for Sheikh Shahid Islamic Studies Website
-- Run these SQL commands in your Supabase SQL Editor

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  cover_image VARCHAR(500) NOT NULL,
  category VARCHAR(100) NOT NULL,
  author VARCHAR(100) NOT NULL DEFAULT 'Sheikh Shahid',
  published_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  reading_time INTEGER NOT NULL DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create audio_content table
CREATE TABLE IF NOT EXISTS audio_content (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  audio_url VARCHAR(500) NOT NULL,
  cover_image VARCHAR(500) NOT NULL,
  duration VARCHAR(20) NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  is_currently_playing BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create videos table
CREATE TABLE IF NOT EXISTS videos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  youtube_id VARCHAR(50) NOT NULL,
  thumbnail_url VARCHAR(500) NOT NULL,
  duration VARCHAR(20) NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create schedules table
CREATE TABLE IF NOT EXISTS schedules (
  id SERIAL PRIMARY KEY,
  mosque_name VARCHAR(255) NOT NULL,
  mosque_location VARCHAR(255) NOT NULL,
  day_of_week VARCHAR(50) NOT NULL,
  time_slot VARCHAR(100) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  teacher VARCHAR(255) NOT NULL,
  additional_info TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_audio_content_updated_at BEFORE UPDATE ON audio_content FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_videos_updated_at BEFORE UPDATE ON videos FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_schedules_updated_at BEFORE UPDATE ON schedules FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Insert sample data

-- Sample articles
INSERT INTO articles (title, content, excerpt, cover_image, category, author, reading_time) VALUES
('Maana ya Shahada katika Maisha ya Mwislamu', 'Shahada ni rukuni ya kwanza ya Uislamu, na ni muhimu kuifahamu vizuri maana yake na matokeo yake katika maisha ya mwislamu. Shahada ni kusema "La ilaha illa Allah, Muhammad rasul Allah" kwa dhamira na kwa mdomo...', 'Shahada ni rukuni ya kwanza ya Uislamu, na ni muhimu kuifahamu vizuri maana yake na matokeo yake...', 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250', 'Akidah', 'Sheikh Shahid', 5),
('Jinsi ya Kusali Salah Kwa Mujibu wa Sunnah', 'Salah ni ibada ya pili muhimu katika Uislamu, na ni lazima tuijue jinsi ya kuisali kwa mujibu wa Sunnah ya Mtume Muhammad (SAW). Salah ni muhimu sana kwa mwislamu...', 'Salah ni ibada ya pili muhimu katika Uislamu, na ni lazima tuijue jinsi ya kuisali kwa mujibu wa...', 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250', 'Fiqh', 'Sheikh Shahid', 8),
('Maadili ya Mwislamu katika Jamii', 'Mwislamu anatakiwa kuwa na maadili mazuri katika jamii yake, na kuwa mwongozi wa maadili. Dini ya Kiislamu inasisitiza umuhimu wa maadili mazuri...', 'Mwislamu anatakiwa kuwa na maadili mazuri katika jamii yake, na kuwa mwongozi wa maadili...', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250', 'Maadili', 'Sheikh Shahid', 6);

-- Sample audio content
INSERT INTO audio_content (title, description, audio_url, cover_image, duration, is_currently_playing) VALUES
('Hukumu za Maarufa na Miongozi', 'Mafunzo kuhusu jinsi ya kuishi maisha ya kiislamu kwa mujibu wa Qur''an na Sunnah', '/audio/hukumu-za-maarufa.mp3', 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200', '15:42', TRUE),
('Darsa za Mnaasaha wa Hajj', 'Mafunzo kuhusu ibada ya Hajj na maandalizi yake', '/audio/darsa-za-hajj.mp3', 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100', '12:35', FALSE),
('Maadili ya Mwislamu', 'Jinsi mwislamu anavyopaswa kuishi katika jamii', '/audio/maadili-ya-mwislamu.mp3', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100', '18:22', FALSE);

-- Sample videos
INSERT INTO videos (title, description, youtube_id, thumbnail_url, duration) VALUES
('Hukumu za Maarufa na Miongozi', 'Mafunzo kuhusu jinsi ya kuamrisha maarufa na kukataza maovu kwa mujibu wa mfumo wa Kiislamu.', 'dQw4w9WgXcQ', 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg', '45:22'),
('Maadili ya Mwislamu', 'Jinsi mwislamu anavyopaswa kuishi', 'dQw4w9WgXcQ', 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg', '30:15'),
('Salah za Sunnah', 'Umuhimu wa salah za ziada', 'dQw4w9WgXcQ', 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg', '22:45'),
('Tafsiri ya Qur''an', 'Kuelewa ujumbe wa Qur''an', 'dQw4w9WgXcQ', 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg', '1:15:30');

-- Sample schedules
INSERT INTO schedules (mosque_name, mosque_location, day_of_week, time_slot, subject, teacher, additional_info, is_active) VALUES
('Masjid Aisha Mombasa', 'Mombasa', 'Jumamosi', 'Baada Ya Alfajri', 'Al-Khabir wal-majrizi', 'Abuu Khatlaab', 'Assaalllin', TRUE),
('Masjid Aisha Mombasa', 'Mombasa', 'Jumapili', 'Baada Ya Magharibi', 'Ahyaa Assaallib', 'Abuu Haashim', 'Assaalllin', TRUE),
('Masjid Aisha Mombasa', 'Mombasa', 'Jumatatu', 'Baada Ya Magharibi', 'Al-Khabir wal-majrizi', 'Abuu Abdirahim', 'Assaalllin', TRUE),
('Masjid Aisha Mombasa', 'Mombasa', 'Jumanne', 'Baada Ya Magharibi', 'Almuhaasawaqul-fiql', 'Abuu Haashim', 'Assaalllin', TRUE),
('Masjid An-Nuur Nairobi', 'Nairobi', 'Alhamisi', 'Baada Ya Magharibi', 'Taalimi Sunnah', 'Abuu Khatlaab', 'Sheikh Shahid', TRUE),
('Masjid An-Nuur Nairobi', 'Nairobi', 'Ijumaa', 'Baada Ya Magharibi', 'Meeshadhaatuuq-sahwa', 'Abuu Yasser Mahmud', 'Sheikh Shahid', TRUE),
('Masjid An-Nuur Nairobi', 'Nairobi', 'Jumamosi', 'Baada Ya Magharibi', 'Aruumuudhaaq Maqj''ill', 'Abuu Khatlaab', 'Sheikh Shahid', TRUE),
('Masjid An-Nuur Nairobi', 'Nairobi', 'Jumapili', 'Baada Ya Magharibi', 'Meeshakawuud Al-arqaqm', 'Abuu Swaahib Swaleh', 'Sheikh Shahid', TRUE);

-- Create storage buckets and policies
-- First create the buckets (if they don't exist)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('audio-files', 'audio-files', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for public access
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (true);
CREATE POLICY "Public Upload" ON storage.objects FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update" ON storage.objects FOR UPDATE USING (true);
CREATE POLICY "Public Delete" ON storage.objects FOR DELETE USING (true);

-- Enable Row Level Security (RLS)
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE audio_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Enable read access for all users" ON articles FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON audio_content FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON videos FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON schedules FOR SELECT USING (true);

-- Create policies for authenticated users to insert/update/delete
CREATE POLICY "Enable insert for authenticated users only" ON articles FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users only" ON articles FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Enable delete for authenticated users only" ON articles FOR DELETE TO authenticated USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON audio_content FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users only" ON audio_content FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Enable delete for authenticated users only" ON audio_content FOR DELETE TO authenticated USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON videos FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users only" ON videos FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Enable delete for authenticated users only" ON videos FOR DELETE TO authenticated USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON schedules FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users only" ON schedules FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Enable delete for authenticated users only" ON schedules FOR DELETE TO authenticated USING (true);