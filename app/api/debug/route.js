import { NextResponse } from "next/server"

export async function GET() {
  const envVars = {
    // DeepSeek
    DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY ? "✅ موجود" : "❌ مفقود",
    DEEPSEEK_API_URL: process.env.DEEPSEEK_API_URL || "غير محدد",
    DEEPSEEK_AP_MODEL: process.env.DEEPSEEK_AP_MODEL || "غير محدد",

    // Groq
    GROQ_API_KEY: process.env.GROQ_API_KEY ? "✅ موجود" : "❌ مفقود",
    GROQ_API_URL: process.env.GROQ_API_URL || "غير محدد",
    GROQ_API_MODEL: process.env.GROQ_API_MODEL || "غير محدد",

    // Together
    TOGETHER_API_KEY: process.env.TOGETHER_API_KEY ? "✅ موجود" : "❌ مفقود",
    TOGETHER_API_URL: process.env.TOGETHER_API_URL || "غير محدد",
    TOGETHER_API_MODEL: process.env.TOGETHER_API_MODEL || "غير محدد",

    // Gemini
    GEMINI_API_KEY: process.env.GEMINI_API_KEY ? "✅ موجود" : "❌ مفقود",
    GENERATE_CONTENT_API: process.env.GENERATE_CONTENT_API || "غير محدد",
    MODEL_ID: process.env.MODEL_ID || "غير محدد",
  }

  return NextResponse.json({
    message: "Debug info",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    envVars,
  })
}
