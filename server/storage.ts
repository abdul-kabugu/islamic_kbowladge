import { 
  users, 
  articles, 
  audioContent, 
  videos, 
  schedules,
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
import { SupabaseStorage } from './supabaseStorage';

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Article methods
  getArticles(): Promise<Article[]>;
  getArticle(id: number): Promise<Article | undefined>;
  createArticle(article: InsertArticle): Promise<Article>;
  
  // Audio content methods
  getAudioContent(): Promise<AudioContent[]>;
  getCurrentAudio(): Promise<AudioContent | undefined>;
  createAudioContent(audio: InsertAudioContent): Promise<AudioContent>;
  
  // Video methods
  getVideos(): Promise<Video[]>;
  getVideo(id: number): Promise<Video | undefined>;
  createVideo(video: InsertVideo): Promise<Video>;
  
  // Schedule methods
  getSchedules(): Promise<Schedule[]>;
  getSchedulesByMosque(mosqueName: string): Promise<Schedule[]>;
  createSchedule(schedule: InsertSchedule): Promise<Schedule>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private articles: Map<number, Article>;
  private audioContent: Map<number, AudioContent>;
  private videos: Map<number, Video>;
  private schedules: Map<number, Schedule>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.articles = new Map();
    this.audioContent = new Map();
    this.videos = new Map();
    this.schedules = new Map();
    this.currentId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Sample articles
    const sampleArticles: Article[] = [
      {
        id: 1,
        title: "Maana ya Shahada katika Maisha ya Mwislamu",
        content: "Shahada ni rukuni ya kwanza ya Uislamu, na ni muhimu kuifahamu vizuri maana yake na matokeo yake katika maisha ya mwislamu...",
        excerpt: "Shahada ni rukuni ya kwanza ya Uislamu, na ni muhimu kuifahamu vizuri maana yake na matokeo yake...",
        coverImage: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        category: "Akidah",
        author: "Sheikh Shahid",
        publishedAt: new Date("2024-11-15"),
        readingTime: 5
      },
      {
        id: 2,
        title: "Jinsi ya Kusali Salah Kwa Mujibu wa Sunnah",
        content: "Salah ni ibada ya pili muhimu katika Uislamu, na ni lazima tuijue jinsi ya kuisali kwa mujibu wa Sunnah...",
        excerpt: "Salah ni ibada ya pili muhimu katika Uislamu, na ni lazima tuijue jinsi ya kuisali kwa mujibu wa...",
        coverImage: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        category: "Fiqh",
        author: "Sheikh Shahid",
        publishedAt: new Date("2024-11-12"),
        readingTime: 8
      },
      {
        id: 3,
        title: "Maadili ya Mwislamu katika Jamii",
        content: "Mwislamu anatakiwa kuwa na maadili mazuri katika jamii yake, na kuwa mwongozi wa maadili...",
        excerpt: "Mwislamu anatakiwa kuwa na maadili mazuri katika jamii yake, na kuwa mwongozi wa maadili...",
        coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        category: "Maadili",
        author: "Sheikh Shahid",
        publishedAt: new Date("2024-11-08"),
        readingTime: 6
      }
    ];

    // Sample audio content
    const sampleAudio: AudioContent[] = [
      {
        id: 1,
        title: "Hukumu za Maarufa na Miongozi",
        description: "Mafunzo kuhusu jinsi ya kuishi maisha ya kiislamu kwa mujibu wa Qur'an na Sunnah",
        audioUrl: "/audio/hukumu-za-maarufa.mp3",
        coverImage: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
        duration: "15:42",
        publishedAt: new Date("2024-11-20"),
        isCurrentlyPlaying: true
      },
      {
        id: 2,
        title: "Darsa za Mnaasaha wa Hajj",
        description: "Mafunzo kuhusu ibada ya Hajj na maandalizi yake",
        audioUrl: "/audio/darsa-za-hajj.mp3",
        coverImage: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        duration: "12:35",
        publishedAt: new Date("2024-11-15"),
        isCurrentlyPlaying: false
      },
      {
        id: 3,
        title: "Maadili ya Mwislamu",
        description: "Jinsi mwislamu anavyopaswa kuishi katika jamii",
        audioUrl: "/audio/maadili-ya-mwislamu.mp3",
        coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        duration: "18:22",
        publishedAt: new Date("2024-11-10"),
        isCurrentlyPlaying: false
      }
    ];

    // Sample videos
    const sampleVideos: Video[] = [
      {
        id: 1,
        title: "Hukumu za Maarufa na Miongozi",
        description: "Mafunzo kuhusu jinsi ya kuamrisha maarufa na kukataza maovu kwa mujibu wa mfumo wa Kiislamu.",
        youtubeId: "dQw4w9WgXcQ",
        thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        duration: "45:22",
        publishedAt: new Date("2024-10-25")
      },
      {
        id: 2,
        title: "Maadili ya Mwislamu",
        description: "Jinsi mwislamu anavyopaswa kuishi",
        youtubeId: "dQw4w9WgXcQ",
        thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        duration: "30:15",
        publishedAt: new Date("2024-10-20")
      },
      {
        id: 3,
        title: "Salah za Sunnah",
        description: "Umuhimu wa salah za ziada",
        youtubeId: "dQw4w9WgXcQ",
        thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        duration: "22:45",
        publishedAt: new Date("2024-10-15")
      },
      {
        id: 4,
        title: "Tafsiri ya Qur'an",
        description: "Kuelewa ujumbe wa Qur'an",
        youtubeId: "dQw4w9WgXcQ",
        thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        duration: "1:15:30",
        publishedAt: new Date("2024-10-10")
      }
    ];

    // Sample schedules
    const sampleSchedules: Schedule[] = [
      // Masjid Aisha Mombasa
      {
        id: 1,
        mosqueName: "Masjid Aisha Mombasa",
        mosqueLocation: "Mombasa",
        dayOfWeek: "Jumamosi",
        timeSlot: "Baada Ya Alfajri",
        subject: "Al-Khabir wal-majrizi",
        teacher: "Abuu Khatlaab",
        additionalInfo: "Assaalllin",
        isActive: true
      },
      {
        id: 2,
        mosqueName: "Masjid Aisha Mombasa",
        mosqueLocation: "Mombasa",
        dayOfWeek: "Jumapili",
        timeSlot: "Baada Ya Magharibi",
        subject: "Ahyaa Assaallib",
        teacher: "Abuu Haashim",
        additionalInfo: "Assaalllin",
        isActive: true
      },
      {
        id: 3,
        mosqueName: "Masjid Aisha Mombasa",
        mosqueLocation: "Mombasa",
        dayOfWeek: "Jumatatu",
        timeSlot: "Baada Ya Magharibi",
        subject: "Al-Khabir wal-majrizi",
        teacher: "Abuu Abdirahim",
        additionalInfo: "Assaalllin",
        isActive: true
      },
      {
        id: 4,
        mosqueName: "Masjid Aisha Mombasa",
        mosqueLocation: "Mombasa",
        dayOfWeek: "Jumanne",
        timeSlot: "Baada Ya Magharibi",
        subject: "Almuhaasawaqul-fiql",
        teacher: "Abuu Haashim",
        additionalInfo: "Assaalllin",
        isActive: true
      },
      // Masjid An-Nuur Nairobi
      {
        id: 5,
        mosqueName: "Masjid An-Nuur Nairobi",
        mosqueLocation: "Nairobi",
        dayOfWeek: "Alhamisi",
        timeSlot: "Baada Ya Magharibi",
        subject: "Taalimi Sunnah",
        teacher: "Abuu Khatlaab",
        additionalInfo: "Sheikh Shahid",
        isActive: true
      },
      {
        id: 6,
        mosqueName: "Masjid An-Nuur Nairobi",
        mosqueLocation: "Nairobi",
        dayOfWeek: "Ijumaa",
        timeSlot: "Baada Ya Magharibi",
        subject: "Meeshadhaatuuq-sahwa",
        teacher: "Abuu Yasser Mahmud",
        additionalInfo: "Sheikh Shahid",
        isActive: true
      },
      {
        id: 7,
        mosqueName: "Masjid An-Nuur Nairobi",
        mosqueLocation: "Nairobi",
        dayOfWeek: "Jumamosi",
        timeSlot: "Baada Ya Magharibi",
        subject: "Aruumuudhaaq Maqj'ill",
        teacher: "Abuu Khatlaab",
        additionalInfo: "Sheikh Shahid",
        isActive: true
      },
      {
        id: 8,
        mosqueName: "Masjid An-Nuur Nairobi",
        mosqueLocation: "Nairobi",
        dayOfWeek: "Jumapili",
        timeSlot: "Baada Ya Magharibi",
        subject: "Meeshakawuud Al-arqaqm",
        teacher: "Abuu Swaahib Swaleh",
        additionalInfo: "Sheikh Shahid",
        isActive: true
      },
      // Masjid At-Taqwa Kisumu
      {
        id: 9,
        mosqueName: "Masjid At-Taqwa Kisumu",
        mosqueLocation: "Kisumu",
        dayOfWeek: "Jumatatu",
        timeSlot: "Baada Ya Alfajri",
        subject: "Kitab At-Tawheed",
        teacher: "Ustadh Omar",
        additionalInfo: "Darsa la Kijana",
        isActive: true
      },
      {
        id: 10,
        mosqueName: "Masjid At-Taqwa Kisumu",
        mosqueLocation: "Kisumu",
        dayOfWeek: "Jumatano",
        timeSlot: "Baada Ya Magharibi",
        subject: "Tafseer Al-Qurtubi",
        teacher: "Sheikh Ibrahim",
        additionalInfo: "Darsa la Wazee",
        isActive: true
      },
      {
        id: 11,
        mosqueName: "Masjid At-Taqwa Kisumu",
        mosqueLocation: "Kisumu",
        dayOfWeek: "Ijumaa",
        timeSlot: "Kabla ya Jumaa",
        subject: "Sirah Nabawiyya",
        teacher: "Ustadh Hassan",
        additionalInfo: "Darsa la Familia",
        isActive: true
      },
      // Masjid Ar-Rahman Eldoret
      {
        id: 12,
        mosqueName: "Masjid Ar-Rahman Eldoret",
        mosqueLocation: "Eldoret",
        dayOfWeek: "Jumanne",
        timeSlot: "Baada Ya Dhuhr",
        subject: "Fiqh Al-Ibadat",
        teacher: "Sheikh Abdullahi",
        additionalInfo: "Darsa la Kufunza",
        isActive: true
      },
      {
        id: 13,
        mosqueName: "Masjid Ar-Rahman Eldoret",
        mosqueLocation: "Eldoret",
        dayOfWeek: "Alhamisi",
        timeSlot: "Baada Ya Asr",
        subject: "Hadith Arba'een",
        teacher: "Ustadh Musa",
        additionalInfo: "Darsa la Vijana",
        isActive: true
      },
      {
        id: 14,
        mosqueName: "Masjid Ar-Rahman Eldoret",
        mosqueLocation: "Eldoret",
        dayOfWeek: "Jumamosi",
        timeSlot: "Baada Ya Alfajri",
        subject: "Akhlaq wal-Adab",
        teacher: "Sheikh Yusuf",
        additionalInfo: "Darsa la Adabu",
        isActive: true
      }
    ];

    // Initialize data
    sampleArticles.forEach(article => {
      this.articles.set(article.id, article);
    });

    sampleAudio.forEach(audio => {
      this.audioContent.set(audio.id, audio);
    });

    sampleVideos.forEach(video => {
      this.videos.set(video.id, video);
    });

    sampleSchedules.forEach(schedule => {
      this.schedules.set(schedule.id, schedule);
    });

    this.currentId = 100; // Start from 100 for new entries
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getArticles(): Promise<Article[]> {
    return Array.from(this.articles.values()).sort(
      (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()
    );
  }

  async getArticle(id: number): Promise<Article | undefined> {
    return this.articles.get(id);
  }

  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const id = this.currentId++;
    const article: Article = { 
      ...insertArticle, 
      id, 
      publishedAt: new Date() 
    };
    this.articles.set(id, article);
    return article;
  }

  async getAudioContent(): Promise<AudioContent[]> {
    return Array.from(this.audioContent.values()).sort(
      (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()
    );
  }

  async getCurrentAudio(): Promise<AudioContent | undefined> {
    return Array.from(this.audioContent.values()).find(
      audio => audio.isCurrentlyPlaying
    );
  }

  async createAudioContent(insertAudio: InsertAudioContent): Promise<AudioContent> {
    const id = this.currentId++;
    const audio: AudioContent = { 
      ...insertAudio, 
      id, 
      publishedAt: new Date() 
    };
    this.audioContent.set(id, audio);
    return audio;
  }

  async getVideos(): Promise<Video[]> {
    return Array.from(this.videos.values()).sort(
      (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()
    );
  }

  async getVideo(id: number): Promise<Video | undefined> {
    return this.videos.get(id);
  }

  async createVideo(insertVideo: InsertVideo): Promise<Video> {
    const id = this.currentId++;
    const video: Video = { 
      ...insertVideo, 
      id, 
      publishedAt: new Date() 
    };
    this.videos.set(id, video);
    return video;
  }

  async getSchedules(): Promise<Schedule[]> {
    return Array.from(this.schedules.values()).filter(
      schedule => schedule.isActive
    );
  }

  async getSchedulesByMosque(mosqueName: string): Promise<Schedule[]> {
    return Array.from(this.schedules.values()).filter(
      schedule => schedule.mosqueName === mosqueName && schedule.isActive
    );
  }

  async createSchedule(insertSchedule: InsertSchedule): Promise<Schedule> {
    const id = this.currentId++;
    const schedule: Schedule = { ...insertSchedule, id };
    this.schedules.set(id, schedule);
    return schedule;
  }
}

// Use Supabase storage if environment variables are available, otherwise fallback to MemStorage
export const storage = process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY 
  ? new SupabaseStorage() 
  : new MemStorage();
