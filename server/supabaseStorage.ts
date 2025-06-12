import { createClient } from '@supabase/supabase-js';
import type { IStorage } from './storage';
import { 
  type User, 
  type InsertUser,
  type Article,
  type InsertArticle,
  type AudioContent,
  type InsertAudioContent,
  type Video,
  type InsertVideo,
  type Schedule,
  type InsertSchedule
} from "@shared/schema";

// Set Supabase environment variables directly
if (!process.env.SUPABASE_URL) {
  process.env.SUPABASE_URL = 'https://bmykpetfwyfmcqbtibzu.supabase.co';
  process.env.SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJteWtwZXRmd3lmbWNxYnRpYnp1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTczMjc0NSwiZXhwIjoyMDY1MzA4NzQ1fQ.Jgo4rE4WsJvuyNvHbRg6wclIr1jrqNW21emHx47Kw6I';
}

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('Checking Supabase env vars:', {
  url: supabaseUrl ? 'SET' : 'NOT SET',
  key: supabaseServiceKey ? 'SET' : 'NOT SET'
});

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('Supabase environment variables not found. Using in-memory storage.');
}

const supabase = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

// Initialize database tables and storage buckets
async function initializeDatabase() {
  if (!supabase) return;
  
  try {
    // Check if tables exist by trying to select from them
    const { data: articles } = await supabase.from('articles').select('id').limit(1);
    
    if (!articles) {
      console.log('Database tables not found. Please run the SQL setup script in your Supabase SQL editor.');
      console.log('The script is available in supabase_setup.sql file in the project root.');
    } else {
      console.log('Successfully connected to Supabase database with existing tables.');
    }

    // Initialize storage buckets
    await initializeStorageBuckets();
  } catch (error) {
    console.log('Database initialization needed. Please run the SQL setup script in your Supabase SQL editor.');
  }
}

// Create storage buckets for file uploads
async function initializeStorageBuckets() {
  if (!supabase) return;

  try {
    // Check if buckets exist
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.log('Storage access error:', listError.message);
      return;
    }

    const existingBuckets = buckets?.map(b => b.name) || [];
    
    // Create audio-files bucket if it doesn't exist
    if (!existingBuckets.includes('audio-files')) {
      const { error: audioError } = await supabase.storage.createBucket('audio-files', {
        public: true,
        allowedMimeTypes: ['audio/mpeg', 'audio/wav', 'audio/mp3'],
        fileSizeLimit: 50 * 1024 * 1024 // 50MB
      });
      
      if (audioError) {
        console.log('Error creating audio-files bucket:', audioError.message);
      } else {
        console.log('Created audio-files storage bucket');
      }
    }

    // Create images bucket if it doesn't exist
    if (!existingBuckets.includes('images')) {
      const { error: imageError } = await supabase.storage.createBucket('images', {
        public: true,
        allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
        fileSizeLimit: 10 * 1024 * 1024 // 10MB
      });
      
      if (imageError) {
        console.log('Error creating images bucket:', imageError.message);
      } else {
        console.log('Created images storage bucket');
      }
    }

    console.log('Storage buckets initialized successfully');
  } catch (error) {
    console.log('Storage bucket initialization error:', error);
  }
}

// Initialize on module load
initializeDatabase();

export class SupabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    if (!supabase) return undefined;
    
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching user:', error);
      return undefined;
    }
    
    return data;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    if (!supabase) return undefined;
    
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();
    
    if (error) {
      console.error('Error fetching user by username:', error);
      return undefined;
    }
    
    return data;
  }

  async createUser(user: InsertUser): Promise<User> {
    if (!supabase) throw new Error('Supabase not configured');
    
    const { data, error } = await supabase
      .from('users')
      .insert([user])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // Article operations
  async getArticles(): Promise<Article[]> {
    if (!supabase) return [];
    
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('published_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching articles:', error);
      return [];
    }
    
    // Transform Supabase snake_case to camelCase
    return data.map(article => ({
      id: article.id,
      title: article.title,
      content: article.content,
      excerpt: article.excerpt,
      coverImage: article.cover_image,
      category: article.category,
      author: article.author,
      publishedAt: new Date(article.published_at),
      readingTime: article.reading_time
    }));
  }

  async getArticle(id: number): Promise<Article | undefined> {
    if (!supabase) return undefined;
    
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching article:', error);
      return undefined;
    }
    
    return {
      id: data.id,
      title: data.title,
      content: data.content,
      excerpt: data.excerpt,
      coverImage: data.cover_image,
      category: data.category,
      author: data.author,
      publishedAt: new Date(data.published_at),
      readingTime: data.reading_time
    };
  }

  async createArticle(article: InsertArticle): Promise<Article> {
    if (!supabase) throw new Error('Supabase not configured');
    
    const { data, error } = await supabase
      .from('articles')
      .insert([{
        title: article.title,
        content: article.content,
        excerpt: article.excerpt,
        cover_image: article.coverImage,
        category: article.category,
        author: article.author,
        reading_time: article.readingTime
      }])
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      title: data.title,
      content: data.content,
      excerpt: data.excerpt,
      coverImage: data.cover_image,
      category: data.category,
      author: data.author,
      publishedAt: new Date(data.published_at),
      readingTime: data.reading_time
    };
  }

  // Audio content operations
  async getAudioContent(): Promise<AudioContent[]> {
    if (!supabase) return [];
    
    const { data, error } = await supabase
      .from('audio_content')
      .select('*')
      .order('published_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching audio content:', error);
      return [];
    }
    
    return data.map(audio => ({
      id: audio.id,
      title: audio.title,
      description: audio.description,
      audioUrl: audio.audio_url,
      coverImage: audio.cover_image,
      duration: audio.duration,
      publishedAt: new Date(audio.published_at),
      isCurrentlyPlaying: audio.is_currently_playing
    }));
  }

  async getCurrentAudio(): Promise<AudioContent | undefined> {
    if (!supabase) return undefined;
    
    const { data, error } = await supabase
      .from('audio_content')
      .select('*')
      .eq('is_currently_playing', true)
      .single();
    
    if (error) {
      console.error('Error fetching current audio:', error);
      return undefined;
    }
    
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      audioUrl: data.audio_url,
      coverImage: data.cover_image,
      duration: data.duration,
      publishedAt: new Date(data.published_at),
      isCurrentlyPlaying: data.is_currently_playing
    };
  }

  async createAudioContent(audio: InsertAudioContent): Promise<AudioContent> {
    if (!supabase) throw new Error('Supabase not configured');
    
    const { data, error } = await supabase
      .from('audio_content')
      .insert([{
        title: audio.title,
        description: audio.description,
        audio_url: audio.audioUrl,
        cover_image: audio.coverImage,
        duration: audio.duration,
        is_currently_playing: audio.isCurrentlyPlaying || false
      }])
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      audioUrl: data.audio_url,
      coverImage: data.cover_image,
      duration: data.duration,
      publishedAt: new Date(data.published_at),
      isCurrentlyPlaying: data.is_currently_playing
    };
  }

  // Video operations
  async getVideos(): Promise<Video[]> {
    if (!supabase) return [];
    
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .order('published_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching videos:', error);
      return [];
    }
    
    return data.map(video => ({
      id: video.id,
      title: video.title,
      description: video.description,
      youtubeId: video.youtube_id,
      thumbnailUrl: video.thumbnail_url,
      duration: video.duration,
      publishedAt: new Date(video.published_at)
    }));
  }

  async getVideo(id: number): Promise<Video | undefined> {
    if (!supabase) return undefined;
    
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching video:', error);
      return undefined;
    }
    
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      youtubeId: data.youtube_id,
      thumbnailUrl: data.thumbnail_url,
      duration: data.duration,
      publishedAt: new Date(data.published_at)
    };
  }

  async createVideo(video: InsertVideo): Promise<Video> {
    if (!supabase) throw new Error('Supabase not configured');
    
    const { data, error } = await supabase
      .from('videos')
      .insert([{
        title: video.title,
        description: video.description,
        youtube_id: video.youtubeId,
        thumbnail_url: video.thumbnailUrl,
        duration: video.duration
      }])
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      youtubeId: data.youtube_id,
      thumbnailUrl: data.thumbnail_url,
      duration: data.duration,
      publishedAt: new Date(data.published_at)
    };
  }

  // Schedule operations
  async getSchedules(): Promise<Schedule[]> {
    if (!supabase) return [];
    
    const { data, error } = await supabase
      .from('schedules')
      .select('*')
      .eq('is_active', true)
      .order('mosque_name');
    
    if (error) {
      console.error('Error fetching schedules:', error);
      return [];
    }
    
    return data.map(schedule => ({
      id: schedule.id,
      mosqueName: schedule.mosque_name,
      mosqueLocation: schedule.mosque_location,
      dayOfWeek: schedule.day_of_week,
      timeSlot: schedule.time_slot,
      subject: schedule.subject,
      teacher: schedule.teacher,
      additionalInfo: schedule.additional_info,
      isActive: schedule.is_active
    }));
  }

  async getSchedulesByMosque(mosqueName: string): Promise<Schedule[]> {
    if (!supabase) return [];
    
    const { data, error } = await supabase
      .from('schedules')
      .select('*')
      .eq('mosque_name', mosqueName)
      .eq('is_active', true);
    
    if (error) {
      console.error('Error fetching schedules by mosque:', error);
      return [];
    }
    
    return data.map(schedule => ({
      id: schedule.id,
      mosqueName: schedule.mosque_name,
      mosqueLocation: schedule.mosque_location,
      dayOfWeek: schedule.day_of_week,
      timeSlot: schedule.time_slot,
      subject: schedule.subject,
      teacher: schedule.teacher,
      additionalInfo: schedule.additional_info,
      isActive: schedule.is_active
    }));
  }

  async createSchedule(schedule: InsertSchedule): Promise<Schedule> {
    if (!supabase) throw new Error('Supabase not configured');
    
    const { data, error } = await supabase
      .from('schedules')
      .insert([{
        mosque_name: schedule.mosqueName,
        mosque_location: schedule.mosqueLocation,
        day_of_week: schedule.dayOfWeek,
        time_slot: schedule.timeSlot,
        subject: schedule.subject,
        teacher: schedule.teacher,
        additional_info: schedule.additionalInfo,
        is_active: schedule.isActive !== false
      }])
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      mosqueName: data.mosque_name,
      mosqueLocation: data.mosque_location,
      dayOfWeek: data.day_of_week,
      timeSlot: data.time_slot,
      subject: data.subject,
      teacher: data.teacher,
      additionalInfo: data.additional_info,
      isActive: data.is_active
    };
  }
}