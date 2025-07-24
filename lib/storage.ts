import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import { conversations, messages } from "./schema"
import { eq } from "drizzle-orm"

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

export async function getConversations() {
  return db.select().from(conversations).orderBy(conversations.updatedAt).execute()
}

export async function getConversation(id: string) {
  return db.select().from(conversations).where(eq(conversations.id, id)).limit(1).execute()
}

export async function createConversation(title: string) {
  const [newConversation] = await db.insert(conversations).values({ title }).returning().execute()
  return newConversation
}

export async function updateConversation(id: string, title: string) {
  const [updatedConversation] = await db
    .update(conversations)
    .set({ title, updatedAt: new Date() })
    .where(eq(conversations.id, id))
    .returning()
    .execute()
  return updatedConversation
}

export async function deleteConversation(id: string) {
  await db.delete(conversations).where(eq(conversations.id, id)).execute()
}

export async function getMessages(conversationId: string) {
  return db
    .select()
    .from(messages)
    .where(eq(messages.conversationId, conversationId))
    .orderBy(messages.createdAt)
    .execute()
}

export async function addMessage(
  conversationId: string,
  role: "user" | "assistant",
  content: string,
  thinkingProcess?: string,
  model?: string,
) {
  const [newMessage] = await db
    .insert(messages)
    .values({
      conversationId,
      role,
      content,
      thinkingProcess,
      model,
    })
    .returning()
    .execute()
  return newMessage
}
