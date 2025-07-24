import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const { message, model } = await request.json()

    let apiResponse
    let apiUrl
    let headers
    let body

    switch (model) {
      case "deepseek":
        apiUrl = "https://api.deepseek.com/chat/completions"
        headers = {
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        }
        body = JSON.stringify({
          model: "deepseek-reasoner",
          messages: [
            {
              role: "system",
              content:
                "أنت Dr.X، مساعد ذكي يتحدث العربية بطلاقة ويساعد المستخدمين. استخدم التفكير المنطقي لتقديم إجابات دقيقة ومفيدة.",
            },
            { role: "user", content: message },
          ],
          max_tokens: 2048,
          temperature: 0.7,
          stream: false,
        })
        break

      case "groq":
        apiUrl = "https://api.groq.com/openai/v1/chat/completions"
        headers = {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        }
        body = JSON.stringify({
          model: "qwen-qwq-32b",
          messages: [
            { role: "system", content: "أنت Dr.X، مساعد ذكي يتحدث العربية بطلاقة ويساعد المستخدمين." },
            { role: "user", content: message },
          ],
          max_tokens: 2000,
          temperature: 0.7,
        })
        break

      case "together":
        apiUrl = "https://api.together.xyz/v1/chat/completions"
        headers = {
          Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
          "Content-Type": "application/json",
        }
        body = JSON.stringify({
          model: "deepseek-ai/DeepSeek-V3",
          messages: [
            { role: "system", content: "أنت Dr.X، مساعد ذكي يتحدث العربية بطلاقة ويساعد المستخدمين." },
            { role: "user", content: message },
          ],
          max_tokens: 2000,
          temperature: 0.7,
          stream: false,
        })
        break

      case "gemini":
        apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`
        headers = {
          "Content-Type": "application/json",
        }
        body = JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `أنت Dr.X، مساعد ذكي يتحدث العربية بطلاقة. المستخدم يسأل: ${message}`,
                },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: 2000,
            temperature: 0.7,
          },
        })
        break

      default:
        return NextResponse.json({ error: "نموذج غير مدعوم" }, { status: 400 })
    }

    console.log(`🚀 استدعاء ${model} API:`, apiUrl)

    const response = await fetch(apiUrl, {
      method: "POST",
      headers,
      body,
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`❌ خطأ في ${model} API:`, response.status, errorText)
      return NextResponse.json(
        {
          error: `خطأ في الاتصال بـ ${model}: ${response.status} - ${errorText}`,
        },
        { status: response.status },
      )
    }

    const data = await response.json()
    console.log(`✅ رد ${model}:`, data)

    let aiResponse = ""
    let reasoning = ""

    // استخراج الرد والتفكير المنطقي حسب نوع النموذج
    if (model === "gemini") {
      aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "لم أتمكن من الحصول على رد من Gemini"
    } else if (model === "deepseek") {
      // DeepSeek Reasoner يدعم التفكير المنطقي
      const choice = data.choices?.[0]
      aiResponse = choice?.message?.content || "لم أتمكن من الحصول على رد"

      // استخراج التفكير المنطقي إذا كان متوفراً
      if (choice?.message?.reasoning) {
        reasoning = choice.message.reasoning
      }
    } else {
      // Groq, Together
      aiResponse = data.choices?.[0]?.message?.content || "لم أتمكن من الحصول على رد"
    }

    return NextResponse.json({
      response: aiResponse,
      reasoning: reasoning || null,
      model: model,
      success: true,
    })
  } catch (error) {
    console.error("💥 خطأ في API:", error)
    return NextResponse.json(
      {
        error: "حدث خطأ في الخادم: " + error.message,
        success: false,
      },
      { status: 500 },
    )
  }
}
