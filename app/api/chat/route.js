import { NextResponse } from "next/server"
import { getPromptForMode, getModelForMode } from "../../src/lib/advanced-prompts"

export async function POST(request) {
  try {
    const body = await request.text()
    console.log("Raw request body:", body)

    let parsedBody
    try {
      parsedBody = JSON.parse(body)
    } catch (parseError) {
      console.error("JSON parse error:", parseError)
      return NextResponse.json({ error: "Invalid JSON in request body" }, { status: 400 })
    }

    const { message, model, mode = "default" } = parsedBody

    let finalModel = model
    let finalPrompt = message

    if (mode !== "default") {
      finalModel = getModelForMode(mode)
      finalPrompt = getPromptForMode(mode, message)
      console.log(`🎯 استخدام وضع ${mode} مع النموذج ${finalModel}`)
    }

    if (!finalPrompt) {
      return NextResponse.json({ error: "الرسالة مطلوبة" }, { status: 400 })
    }

    console.log(`🚀 استدعاء ${finalModel} API`)

    let apiUrl
    let headers
    let requestBody

    switch (finalModel) {
      case "deepseek":
      case "deepseek-reasoner":
        if (!process.env.DEEPSEEK_API_KEY) {
          return NextResponse.json({ error: "DEEPSEEK_API_KEY غير متوفر" }, { status: 500 })
        }

        apiUrl = "https://api.deepseek.com/chat/completions"
        headers = {
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          "Content-Type": "application/json",
        }
        requestBody = {
          model: "deepseek-reasoner",
          messages: [
            {
              role: "system",
              content:
                "أنت Dr.X، مساعد ذكي يتحدث العربية بطلاقة ويساعد المستخدمين. استخدم التفكير المنطقي لتقديم إجابات دقيقة ومفيدة.",
            },
            { role: "user", content: finalPrompt },
          ],
          max_tokens: 4096,
          temperature: mode === "expert" ? 0.3 : 0.7, // درجة حرارة أقل للوضع الخبير
        }
        break

      case "groq":
        if (!process.env.GROQ_API_KEY) {
          return NextResponse.json({ error: "GROQ_API_KEY غير متوفر" }, { status: 500 })
        }

        apiUrl = "https://api.groq.com/openai/v1/chat/completions"
        headers = {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        }
        requestBody = {
          model: "llama-3.1-70b-versatile",
          messages: [
            { role: "system", content: "أنت Dr.X، مساعد ذكي يتحدث العربية بطلاقة ويساعد المستخدمين." },
            { role: "user", content: finalPrompt },
          ],
          max_tokens: 3000,
          temperature: mode === "expert" ? 0.3 : 0.7,
        }
        break

      case "together":
        if (!process.env.TOGETHER_API_KEY) {
          return NextResponse.json({ error: "TOGETHER_API_KEY غير متوفر" }, { status: 500 })
        }

        apiUrl = "https://api.together.xyz/v1/chat/completions"
        headers = {
          Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
          "Content-Type": "application/json",
        }
        requestBody = {
          model: "meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo",
          messages: [
            { role: "system", content: "أنت Dr.X، مساعد ذكي يتحدث العربية بطلاقة ويساعد المستخدمين." },
            { role: "user", content: finalPrompt },
          ],
          max_tokens: 3000,
          temperature: mode === "expert" ? 0.3 : 0.7,
        }
        break

      case "gemini":
        if (!process.env.GEMINI_API_KEY) {
          return NextResponse.json({ error: "GEMINI_API_KEY غير متوفر" }, { status: 500 })
        }

        apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`
        headers = {
          "Content-Type": "application/json",
        }
        requestBody = {
          contents: [
            {
              parts: [
                {
                  text: `أنت Dr.X، مساعد ذكي يتحدث العربية بطلاقة. المستخدم يسأل: ${finalPrompt}`,
                },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: 3000,
            temperature: mode === "expert" ? 0.3 : 0.7,
          },
        }
        break

      default:
        return NextResponse.json({ error: "نموذج غير مدعوم" }, { status: 400 })
    }

    console.log("Request URL:", apiUrl)

    const response = await fetch(apiUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(requestBody),
    })

    console.log("Response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`❌ خطأ في ${finalModel} API:`, response.status, errorText)

      let errorMessage = errorText
      try {
        const errorJson = JSON.parse(errorText)
        errorMessage = errorJson.error?.message || errorJson.message || errorText
      } catch (e) {
        // استخدم النص كما هو
      }

      return NextResponse.json(
        {
          error: `خطأ في الاتصال بـ ${finalModel}: ${response.status} - ${errorMessage}`,
        },
        { status: response.status },
      )
    }

    const responseText = await response.text()
    console.log("Raw response:", responseText.substring(0, 500))

    let data
    try {
      data = JSON.parse(responseText)
    } catch (parseError) {
      console.error("Failed to parse API response as JSON:", parseError)
      return NextResponse.json(
        {
          error: "خطأ في تحليل استجابة API",
        },
        { status: 500 },
      )
    }

    let aiResponse = ""
    let reasoning = ""

    if (finalModel === "gemini") {
      aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "لم أتمكن من الحصول على رد من Gemini"
    } else if (finalModel === "deepseek" || finalModel === "deepseek-reasoner") {
      const choice = data.choices?.[0]
      aiResponse = choice?.message?.content || "لم أتمكن من الحصول على رد"

      if (choice?.message?.reasoning) {
        reasoning = choice.message.reasoning
      }
    } else {
      aiResponse = data.choices?.[0]?.message?.content || "لم أتمكن من الحصول على رد"
    }

    return NextResponse.json({
      response: aiResponse,
      reasoning: reasoning || null,
      model: finalModel,
      mode: mode,
      success: true,
    })
  } catch (error) {
    console.error("💥 خطأ في API:", error)
    console.error("Error stack:", error.stack)

    return NextResponse.json(
      {
        error: "حدث خطأ في الخادم: " + error.message,
        success: false,
      },
      { status: 500 },
    )
  }
}
