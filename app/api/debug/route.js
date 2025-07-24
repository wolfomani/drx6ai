import { NextResponse } from "next/server"

export async function GET() {
  try {
    const envCheck = {
      DEEPSEEK_API_KEY: !!process.env.DEEPSEEK_API_KEY,
      GROQ_API_KEY: !!process.env.GROQ_API_KEY,
      TOGETHER_API_KEY: !!process.env.TOGETHER_API_KEY,
      GEMINI_API_KEY: !!process.env.GEMINI_API_KEY,
      NODE_ENV: process.env.NODE_ENV,
    }

    console.log("🔍 Environment check:", envCheck)

    return NextResponse.json({
      message: "Debug info",
      environment: envCheck,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Debug error:", error)
    return NextResponse.json(
      {
        error: "Debug failed: " + error.message,
      },
      { status: 500 },
    )
  }
}
