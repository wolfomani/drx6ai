import { z } from "zod";

// Database schema types
export interface Conversation {
  id: number;
  title: string;
  model: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: number;
  conversationId: number;
  role: 'user' | 'assistant';
  content: string;
  attachments?: Array<{
    type: string;
    name: string;
    url: string;
    size: number;
  }> | null;
  createdAt: Date;
}

export interface AiModel {
  id: string;
  name: string;
  description: string;
  provider: string;
  available: boolean;
  features?: string[] | null;
  icon?: string | null;
  color?: string | null;
}

// Insert schemas
export const insertConversationSchema = z.object({
  title: z.string(),
  model: z.string(),
});

export const insertMessageSchema = z.object({
  conversationId: z.number(),
  role: z.enum(['user', 'assistant']),
  content: z.string(),
  attachments: z.array(z.object({
    type: z.string(),
    name: z.string(),
    url: z.string(),
    size: z.number(),
  })).optional(),
});

export const insertAiModelSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  provider: z.string(),
  available: z.boolean().default(true),
  features: z.array(z.string()).optional(),
  icon: z.string().optional(),
  color: z.string().optional(),
});

export type InsertConversation = z.infer<typeof insertConversationSchema>;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type InsertAiModel = z.infer<typeof insertAiModelSchema>;

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
