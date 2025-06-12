import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertArticleSchema, insertAudioContentSchema, insertVideoSchema, insertScheduleSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Articles routes
  app.get("/api/articles", async (req, res) => {
    try {
      const articles = await storage.getArticles();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch articles" });
    }
  });

  app.get("/api/articles/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const article = await storage.getArticle(id);
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      res.json(article);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch article" });
    }
  });

  app.post("/api/articles", async (req, res) => {
    try {
      const validatedData = insertArticleSchema.parse(req.body);
      const article = await storage.createArticle(validatedData);
      res.status(201).json(article);
    } catch (error) {
      res.status(400).json({ message: "Invalid article data" });
    }
  });

  // Audio content routes
  app.get("/api/audio", async (req, res) => {
    try {
      const audioContent = await storage.getAudioContent();
      res.json(audioContent);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch audio content" });
    }
  });

  app.get("/api/audio/current", async (req, res) => {
    try {
      const currentAudio = await storage.getCurrentAudio();
      if (!currentAudio) {
        return res.status(404).json({ message: "No current audio found" });
      }
      res.json(currentAudio);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch current audio" });
    }
  });

  app.post("/api/audio", async (req, res) => {
    try {
      const validatedData = insertAudioContentSchema.parse(req.body);
      const audio = await storage.createAudioContent(validatedData);
      res.status(201).json(audio);
    } catch (error) {
      res.status(400).json({ message: "Invalid audio data" });
    }
  });

  // Video routes
  app.get("/api/videos", async (req, res) => {
    try {
      const videos = await storage.getVideos();
      res.json(videos);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch videos" });
    }
  });

  app.get("/api/videos/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const video = await storage.getVideo(id);
      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }
      res.json(video);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch video" });
    }
  });

  app.post("/api/videos", async (req, res) => {
    try {
      const validatedData = insertVideoSchema.parse(req.body);
      const video = await storage.createVideo(validatedData);
      res.status(201).json(video);
    } catch (error) {
      res.status(400).json({ message: "Invalid video data" });
    }
  });

  // Schedule routes
  app.get("/api/schedules", async (req, res) => {
    try {
      const schedules = await storage.getSchedules();
      res.json(schedules);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch schedules" });
    }
  });

  app.get("/api/schedules/:mosque", async (req, res) => {
    try {
      const mosqueName = decodeURIComponent(req.params.mosque);
      const schedules = await storage.getSchedulesByMosque(mosqueName);
      res.json(schedules);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch mosque schedules" });
    }
  });

  app.post("/api/schedules", async (req, res) => {
    try {
      const validatedData = insertScheduleSchema.parse(req.body);
      const schedule = await storage.createSchedule(validatedData);
      res.status(201).json(schedule);
    } catch (error) {
      res.status(400).json({ message: "Invalid schedule data" });
    }
  });

  // Test upload endpoint to bypass client-side issues
  app.post('/api/test-upload', async (req, res) => {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );

      // Test creating a simple text file to verify upload permissions
      const testContent = 'Test upload file created at ' + new Date().toISOString();
      const fileName = `test-${Date.now()}.txt`;
      
      const { data, error } = await supabase.storage
        .from('images')
        .upload(fileName, new Blob([testContent], { type: 'text/plain' }));

      if (error) {
        return res.status(500).json({ 
          success: false, 
          error: error.message,
          details: error 
        });
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(fileName);

      res.json({ 
        success: true, 
        message: 'Upload test successful',
        fileName,
        publicUrl,
        uploadData: data
      });

    } catch (error) {
      console.error('Test upload error:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Server upload test failed',
        details: error 
      });
    }
  });

  // Fix storage permissions endpoint
  app.post('/api/fix-storage', async (req, res) => {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );

      // Disable RLS on storage.objects
      const { error: disableRLSError } = await supabase.rpc('exec_sql', {
        sql: 'ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;'
      });

      if (disableRLSError) {
        console.log('RLS disable error (this might be expected):', disableRLSError);
      }

      // Ensure buckets exist and are public
      const buckets = [
        { id: 'images', name: 'images', public: true },
        { id: 'audio-files', name: 'audio-files', public: true }
      ];

      const results = [];
      for (const bucket of buckets) {
        const { error: bucketError } = await supabase.storage.createBucket(bucket.id, {
          public: bucket.public,
          allowedMimeTypes: bucket.id === 'images' 
            ? ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
            : ['audio/mpeg', 'audio/wav', 'audio/mp3']
        });

        if (bucketError && !bucketError.message.includes('already exists')) {
          results.push({ bucket: bucket.id, status: 'error', error: bucketError });
        } else {
          results.push({ bucket: bucket.id, status: 'ready' });
        }
      }

      res.json({
        success: true,
        message: 'Storage permissions fixed',
        rlsDisabled: !disableRLSError,
        buckets: results
      });

    } catch (error) {
      console.error('Storage fix error:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to fix storage permissions',
        details: error 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
