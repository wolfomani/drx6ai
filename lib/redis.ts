// Redis/KV configuration for caching and session management

import { Redis } from "@upstash/redis"

// Initialize Redis client
export const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

// Cache keys
export const CACHE_KEYS = {
  USER_SESSION: (userId: string) => `user:${userId}:session`,
  CHAT_HISTORY: (sessionId: string) => `chat:${sessionId}:history`,
  MODEL_USAGE: (userId: string) => `user:${userId}:model_usage`,
  RATE_LIMIT: (userId: string) => `rate_limit:${userId}`,
} as const

// Session management
export async function setUserSession(userId: string, sessionData: any, ttl = 3600) {
  await redis.setex(CACHE_KEYS.USER_SESSION(userId), ttl, JSON.stringify(sessionData))
}

export async function getUserSession(userId: string) {
  const data = await redis.get(CACHE_KEYS.USER_SESSION(userId))
  return data ? JSON.parse(data as string) : null
}

export async function deleteUserSession(userId: string) {
  await redis.del(CACHE_KEYS.USER_SESSION(userId))
}

// Chat history caching
export async function cacheChatHistory(sessionId: string, messages: any[], ttl = 1800) {
  await redis.setex(CACHE_KEYS.CHAT_HISTORY(sessionId), ttl, JSON.stringify(messages))
}

export async function getCachedChatHistory(sessionId: string) {
  const data = await redis.get(CACHE_KEYS.CHAT_HISTORY(sessionId))
  return data ? JSON.parse(data as string) : null
}

// Rate limiting
export async function checkRateLimit(userId: string, limit = 100, window = 3600) {
  const key = CACHE_KEYS.RATE_LIMIT(userId)
  const current = await redis.incr(key)

  if (current === 1) {
    await redis.expire(key, window)
  }

  return {
    count: current,
    remaining: Math.max(0, limit - current),
    resetTime: Date.now() + window * 1000,
  }
}

// Model usage tracking
export async function trackModelUsage(userId: string, provider: string, model: string, tokensUsed: number) {
  const key = CACHE_KEYS.MODEL_USAGE(userId)
  const today = new Date().toISOString().split("T")[0]

  await redis.hincrby(key, `${today}:${provider}:${model}:requests`, 1)
  await redis.hincrby(key, `${today}:${provider}:${model}:tokens`, tokensUsed)
  await redis.expire(key, 30 * 24 * 3600) // 30 days
}

export async function getModelUsage(userId: string) {
  const key = CACHE_KEYS.MODEL_USAGE(userId)
  return await redis.hgetall(key)
}
