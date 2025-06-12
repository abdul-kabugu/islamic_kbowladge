import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt").notNull(),
  coverImage: text("cover_image").notNull(),
  category: text("category").notNull(),
  author: text("author").notNull().default("Sheikh Shahid"),
  publishedAt: timestamp("published_at").notNull().defaultNow(),
  readingTime: integer("reading_time").notNull().default(5),
});

export const audioContent = pgTable("audio_content", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  audioUrl: text("audio_url").notNull(),
  coverImage: text("cover_image").notNull(),
  duration: text("duration").notNull(),
  publishedAt: timestamp("published_at").notNull().defaultNow(),
  isCurrentlyPlaying: boolean("is_currently_playing").default(false),
});

export const videos = pgTable("videos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  youtubeId: text("youtube_id").notNull(),
  thumbnailUrl: text("thumbnail_url").notNull(),
  duration: text("duration").notNull(),
  publishedAt: timestamp("published_at").notNull().defaultNow(),
});

export const schedules = pgTable("schedules", {
  id: serial("id").primaryKey(),
  mosqueName: text("mosque_name").notNull(),
  mosqueLocation: text("mosque_location").notNull(),
  dayOfWeek: text("day_of_week").notNull(),
  timeSlot: text("time_slot").notNull(),
  subject: text("subject").notNull(),
  teacher: text("teacher").notNull(),
  additionalInfo: text("additional_info"),
  isActive: boolean("is_active").default(true),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertArticleSchema = createInsertSchema(articles).omit({
  id: true,
  publishedAt: true,
});

export const insertAudioContentSchema = createInsertSchema(audioContent).omit({
  id: true,
  publishedAt: true,
});

export const insertVideoSchema = createInsertSchema(videos).omit({
  id: true,
  publishedAt: true,
});

export const insertScheduleSchema = createInsertSchema(schedules).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type Article = typeof articles.$inferSelect;

export type InsertAudioContent = z.infer<typeof insertAudioContentSchema>;
export type AudioContent = typeof audioContent.$inferSelect;

export type InsertVideo = z.infer<typeof insertVideoSchema>;
export type Video = typeof videos.$inferSelect;

export type InsertSchedule = z.infer<typeof insertScheduleSchema>;
export type Schedule = typeof schedules.$inferSelect;
