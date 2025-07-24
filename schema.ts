import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  model: text("model").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id").notNull(),
  role: text("role").notNull(), // 'user' | 'assistant'
  content: text("content").notNull(),
  attachments: jsonb("attachments").$type<Array<{
    type: string;
    name: string;
    url: string;
    size: number;
  }>>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const aiModels = pgTable("ai_models", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  provider: text("provider").notNull(),
  available: boolean("available").default(true).notNull(),
  features: jsonb("features").$type<string[]>(),
  icon: text("icon"),
  color: text("color"),
});

export const insertConversationSchema = createInsertSchema(conversations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  createdAt: true,
});

export const insertAiModelSchema = createInsertSchema(aiModels);

export type InsertConversation = z.infer<typeof insertConversationSchema>;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type InsertAiModel = z.infer<typeof insertAiModelSchema>;

export type Conversation = typeof conversations.$inferSelect;
export type Message = typeof messages.$inferSelect;
export type AiModel = typeof aiModels.$inferSelect;

// Chat request/response types
export const chatRequestSchema = z.object({
  message: z.string().min(1).max(4000),
  conversationId: z.number().optional(),
  model: z.string(),
  attachments: z.array(z.object({
    type: z.string(),
    name: z.string(),
    url: z.string(),
    size: z.number(),
  })).optional(),
});

export const chatResponseSchema = z.object({
  message: z.string(),
  conversationId: z.number(),
  messageId: z.number(),
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type ChatResponse = z.infer<typeof chatResponseSchema>;
