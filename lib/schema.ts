import { z } from "zod"
import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core"

// Database schema types
export const conversations = pgTable("conversations", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const messages = pgTable("messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  conversationId: uuid("conversation_id")
    .references(() => conversations.id)
    .notNull(),
  role: text("role").notNull(), // 'user' or 'assistant'
  content: text("content").notNull(),
  thinkingProcess: text("thinking_process"), // Stores the AI's thinking process
  model: text("model"), // Stores the model used for this message
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export type Conversation = typeof conversations.$inferSelect
export type NewConversation = typeof conversations.$inferInsert
export type Message = typeof messages.$inferSelect
export type NewMessage = typeof messages.$inferInsert

export interface AiModel {
  id: string
  name: string
  description: string
  provider: string
  available: boolean
  features?: string[] | null
  icon?: string | null
  color?: string | null
}

// Insert schemas
export const insertConversationSchema = z.object({
  title: z.string(),
  model: z.string(),
})

export const insertMessageSchema = z.object({
  conversationId: z.string(),
  role: z.enum(["user", "assistant"]),
  content: z.string(),
  attachments: z
    .array(
      z.object({
        type: z.string(),
        name: z.string(),
        url: z.string(),
        size: z.number(),
      }),
    )
    .optional(),
  thinkingProcess: z.string().optional(),
})

export const insertAiModelSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  provider: z.string(),
  available: z.boolean().default(true),
  features: z.array(z.string()).optional(),
  icon: z.string().optional(),
  color: z.string().optional(),
})

export type InsertConversation = z.infer<typeof insertConversationSchema>
export type InsertMessage = z.infer<typeof insertMessageSchema>
export type InsertAiModel = z.infer<typeof insertAiModelSchema>

// Chat request/response types
export const chatRequestSchema = z.object({
  message: z.string().min(1).max(4000),
  conversationId: z.string().optional(),
  model: z.string(),
  attachments: z
    .array(
      z.object({
        type: z.string(),
        name: z.string(),
        url: z.string(),
        size: z.number(),
      }),
    )
    .optional(),
})

export const chatResponseSchema = z.object({
  message: z.string(),
  conversationId: z.string(),
  messageId: z.string(),
})

export type ChatRequest = z.infer<typeof chatRequestSchema>
export type ChatResponse = z.infer<typeof chatResponseSchema>
