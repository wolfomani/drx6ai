export async function GET() {
  console.log("[DEBUG] 🔍 فحص متغيرات البيئة")

  const envVars = {
    // DeepSeek
    DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY ? "✅ موجود" : "❌ غير موجود",
    DEEPSEEK_API_URL: process.env.DEEPSEEK_API_URL || "غير محدد",
    DEEPSEEK_AP_MODEL: process.env.DEEPSEEK_AP_MODEL || "غير محدد",

    // Groq
    GROQ_API_KEY: process.env.GROQ_API_KEY ? "✅ موجود" : "❌ غير موجود",
    GROQ_API_URL: process.env.GROQ_API_URL || "غير محدد",
    GROQ_API_MODEL: process.env.GROQ_API_MODEL || "غير محدد",

    // Together
    TOGETHER_API_KEY: process.env.TOGETHER_API_KEY ? "✅ موجود" : "❌ غير موجود",
    TOGETHER_API_URL: process.env.TOGETHER_API_URL || "غير محدد",
    TOGETHER_API_MODEL: process.env.TOGETHER_API_MODEL || "غير محدد",

    // Gemini
    GEMINI_API_KEY: process.env.GEMINI_API_KEY ? "✅ موجود" : "❌ غير موجود",
    MODEL_ID: process.env.MODEL_ID || "غير محدد",
    GENERATE_CONTENT_API: process.env.GENERATE_CONTENT_API || "غير محدد",

    // معلومات النظام
    NODE_ENV: process.env.NODE_ENV || "غير محدد",
    VERCEL: process.env.VERCEL ? "✅ Vercel" : "❌ ليس Vercel",
    VERCEL_URL: process.env.VERCEL_URL || "غير محدد",
  }

  console.log("[DEBUG] 📊 نتائج الفحص:", envVars)

  return new Response(
    JSON.stringify(
      {
        message: "فحص متغيرات البيئة",
        timestamp: new Date().toISOString(),
        environment: envVars,
        status: "success",
      },
      null,
      2,
    ),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    },
  )
}
