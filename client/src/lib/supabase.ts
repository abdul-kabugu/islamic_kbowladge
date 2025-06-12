import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bmykpetfwyfmcqbtibzu.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJteWtwZXRmd3lmbWNxYnRpYnp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3MzI3NDUsImV4cCI6MjA2NTMwODc0NX0.Su8bdZdO3yHAbaU8JuJXd5MW35oUPowuQtN4Rsi3WGk';

// Create Supabase client with provided credentials
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database table interfaces based on our schema
export interface SupabaseArticle {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  cover_image: string;
  category: string;
  author: string;
  published_at: string;
  reading_time: number;
  created_at?: string;
  updated_at?: string;
}

export interface SupabaseAudioContent {
  id: number;
  title: string;
  description: string;
  audio_url: string;
  cover_image: string;
  duration: string;
  published_at: string;
  is_currently_playing: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface SupabaseVideo {
  id: number;
  title: string;
  description: string;
  youtube_id: string;
  thumbnail_url: string;
  duration: string;
  published_at: string;
  created_at?: string;
  updated_at?: string;
}

export interface SupabaseSchedule {
  id: number;
  mosque_name: string;
  mosque_location: string;
  day_of_week: string;
  time_slot: string;
  subject: string;
  teacher: string;
  additional_info?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

// API functions for content management
export const supabaseApi = {
  // Articles
  async getArticles() {
    if (!supabase) throw new Error('Supabase not configured');
    
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('published_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createArticle(article: Omit<SupabaseArticle, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('articles')
      .insert([article])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateArticle(id: number, updates: Partial<SupabaseArticle>) {
    const { data, error } = await supabase
      .from('articles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteArticle(id: number) {
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Audio Content
  async getAudioContent() {
    const { data, error } = await supabase
      .from('audio_content')
      .select('*')
      .order('published_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createAudioContent(audio: Omit<SupabaseAudioContent, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('audio_content')
      .insert([audio])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateAudioContent(id: number, updates: Partial<SupabaseAudioContent>) {
    const { data, error } = await supabase
      .from('audio_content')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteAudioContent(id: number) {
    const { error } = await supabase
      .from('audio_content')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Videos
  async getVideos() {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .order('published_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createVideo(video: Omit<SupabaseVideo, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('videos')
      .insert([video])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateVideo(id: number, updates: Partial<SupabaseVideo>) {
    const { data, error } = await supabase
      .from('videos')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteVideo(id: number) {
    const { error } = await supabase
      .from('videos')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Schedules
  async getSchedules() {
    const { data, error } = await supabase
      .from('schedules')
      .select('*')
      .eq('is_active', true)
      .order('mosque_name');
    
    if (error) throw error;
    return data;
  },

  async createSchedule(schedule: Omit<SupabaseSchedule, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('schedules')
      .insert([schedule])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateSchedule(id: number, updates: Partial<SupabaseSchedule>) {
    const { data, error } = await supabase
      .from('schedules')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteSchedule(id: number) {
    const { error } = await supabase
      .from('schedules')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // File Upload
  async uploadFile(bucket: string, file: File, path: string) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file);
    
    if (error) throw error;
    return data;
  },

  async getFileUrl(bucket: string, path: string) {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);
    
    return data.publicUrl;
  }
};