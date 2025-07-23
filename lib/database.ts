// Database configuration and utilities

import { neon } from "@neondatabase/serverless"

// Primary database connection
export const sql = neon(process.env.DATABASE_URL!)

// Dr.X specific database connection (Nile)
export const drxSql = neon(process.env.drx_POSTGRES_URL!)

// Database schema for chat history
export async function initializeDatabase() {
  try {
    // Create chat_sessions table
    await sql`
      CREATE TABLE IF NOT EXISTS chat_sessions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        user_id TEXT,
        model_provider TEXT,
        model_name TEXT
      )
    `

    // Create chat_messages table
    await sql`
      CREATE TABLE IF NOT EXISTS chat_messages (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
        role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
        content TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        provider TEXT,
        model TEXT,
        tokens_used INTEGER,
        response_time_ms INTEGER
      )
    `

    // Create indexes for better performance
    await sql`
      CREATE INDEX IF NOT EXISTS idx_chat_sessions_user_id ON chat_sessions(user_id);
      CREATE INDEX IF NOT EXISTS idx_chat_sessions_created_at ON chat_sessions(created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON chat_messages(session_id);
      CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at DESC);
    `

    console.log("Database initialized successfully")
  } catch (error) {
    console.error("Error initializing database:", error)
  }
}

// Chat session functions
export async function createChatSession(title: string, userId?: string, provider?: string, model?: string) {
  const result = await sql`
    INSERT INTO chat_sessions (title, user_id, model_provider, model_name)
    VALUES (${title}, ${userId || null}, ${provider || null}, ${model || null})
    RETURNING *
  `
  return result[0]
}

export async function getChatSessions(userId?: string, limit = 50) {
  if (userId) {
    return await sql`
      SELECT * FROM chat_sessions 
      WHERE user_id = ${userId}
      ORDER BY updated_at DESC 
      LIMIT ${limit}
    `
  } else {
    return await sql`
      SELECT * FROM chat_sessions 
      ORDER BY updated_at DESC 
      LIMIT ${limit}
    `
  }
}

export async function getChatSession(sessionId: string) {
  const result = await sql`
    SELECT * FROM chat_sessions 
    WHERE id = ${sessionId}
  `
  return result[0]
}

export async function updateChatSession(sessionId: string, updates: { title?: string; updated_at?: Date }) {
  const setClause = Object.entries(updates)
    .map(([key, value]) => `${key} = ${value}`)
    .join(", ")

  return await sql`
    UPDATE chat_sessions 
    SET ${sql.unsafe(setClause)}, updated_at = NOW()
    WHERE id = ${sessionId}
    RETURNING *
  `
}

// Chat message functions
export async function saveChatMessage(
  sessionId: string,
  role: "user" | "assistant" | "system",
  content: string,
  provider?: string,
  model?: string,
  tokensUsed?: number,
  responseTimeMs?: number,
) {
  const result = await sql`
    INSERT INTO chat_messages (session_id, role, content, provider, model, tokens_used, response_time_ms)
    VALUES (${sessionId}, ${role}, ${content}, ${provider || null}, ${model || null}, ${tokensUsed || null}, ${responseTimeMs || null})
    RETURNING *
  `
  return result[0]
}

export async function getChatMessages(sessionId: string) {
  return await sql`
    SELECT * FROM chat_messages 
    WHERE session_id = ${sessionId}
    ORDER BY created_at ASC
  `
}

export async function deleteChatSession(sessionId: string) {
  await sql`DELETE FROM chat_sessions WHERE id = ${sessionId}`
}
