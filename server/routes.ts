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

  const httpServer = createServer(app);
  return httpServer;
}
