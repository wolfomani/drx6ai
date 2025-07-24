import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    console.log("🚀 بدء معالجة الطلب...")

    const body = await request.text()
    console.log("📥 Raw request body:", body)

    let parsedBody
    try {
      parsedBody = JSON.parse(body)
    } catch (parseError) {
      console.error("❌ JSON parse error:", parseError)
      return NextResponse.json({ error: "Invalid JSON in request body" }, { status: 400 })
    }

    const { message, model, mode = "default" } = parsedBody
    console.log("📋 Parsed data:", { message: message?.substring(0, 50), model, mode })

    if (!message) {
      return NextResponse.json({ error: "الرسالة مطلوبة" }, { status: 400 })
    }

    // تحديد النموذج والرسالة النهائية
    let finalModel = model
    let finalPrompt = message

    // تطبيق الأوضاع المختلفة
    if (mode === "reasoning") {
      finalModel = "deepseek"
      finalPrompt = `🧠 استخدم التفكير العميق والمنطقي لحل هذا السؤال خطوة بخطوة:\n\n${message}`
    } else if (mode === "expert") {
      finalPrompt = `👨‍💻 أنت خبير متقدم، قدم حلولاً احترافية ومفصلة:\n\n${message}`
    } else if (mode === "planets") {
      finalPrompt = `🔭 كخبير فلكي، قدم معلومات دقيقة ومحدثة عن:\n\n${message}`
    }

    console.log(`🚀 استدعاء ${finalModel} API`)

    let apiUrl, headers, requestBody

    switch (finalModel) {
      case "deepseek":
        if (!process.env.DEEPSEEK_API_KEY) {
          return NextResponse.json({ error: "DEEPSEEK_API_KEY غير متوفر" }, { status: 500 })
        }

        apiUrl = "https://api.deepseek.com/chat/completions"
        headers = {
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          "Content-Type": "application/json",
        }
        requestBody = {
          model: "deepseek-chat",
          messages: [
            {
              role: "system",
              content: "أنت Dr.X، مساعد ذكي يتحدث العربية بطلاقة ويساعد المستخدمين بإجابات مفيدة ودقيقة.",
            },
            { role: "user", content: finalPrompt },
          ],
          max_tokens: 2000,
          temperature: 0.7,
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
            { role: "system", content: "أنت Dr.X، مساعد ذكي يتحدث العربية بطلاقة." },
            { role: "user", content: finalPrompt },
          ],
          max_tokens: 2000,
          temperature: 0.7,
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
            { role: "system", content: "أنت Dr.X، مساعد ذكي يتحدث العربية بطلاقة." },
            { role: "user", content: finalPrompt },
          ],
          max_tokens: 2000,
          temperature: 0.7,
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
            maxOutputTokens: 2000,
            temperature: 0.7,
          },
        }
        break

      default:
        return NextResponse.json({ error: "نموذج غير مدعوم" }, { status: 400 })
    }

    console.log("🌐 إرسال الطلب إلى:", apiUrl)

    // إضافة timeout للطلب
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 45000) // 45 ثانية

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      console.log("📨 Response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`❌ خطأ في ${finalModel} API:`, response.status, errorText)

        return NextResponse.json(
          {
            error: `خطأ في الاتصال بـ ${finalModel}: ${response.status}`,
          },
          { status: response.status },
        )
      }

      const responseText = await response.text()
      console.log("📥 Response length:", responseText.length)

      // التحقق من أخطاء Vercel timeout
      if (responseText.includes("FUNCTION_INVOCATION_TIMEOUT")) {
        console.error("⏰ Vercel timeout detected")
        return NextResponse.json(
          {
            error: "انتهت مهلة الاستجابة. يرجى المحاولة مرة أخرى بسؤال أقصر.",
          },
          { status: 408 },
        )
      }

      let data
      try {
        data = JSON.parse(responseText)
      } catch (parseError) {
        console.error("❌ Failed to parse response:", parseError)
        console.error("❌ Response preview:", responseText.substring(0, 200))

        return NextResponse.json(
          {
            error: "خطأ في تحليل استجابة API",
          },
          { status: 500 },
        )
      }

      let aiResponse = ""

      if (finalModel === "gemini") {
        aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "لم أتمكن من الحصول على رد من Gemini"
      } else {
        aiResponse = data.choices?.[0]?.message?.content || "لم أتمكن من الحصول على رد"
      }

      console.log("✅ تم الحصول على الرد بنجاح")

      return NextResponse.json({
        response: aiResponse,
        model: finalModel,
        mode: mode,
        success: true,
      })
    } catch (fetchError) {
      clearTimeout(timeoutId)

      if (fetchError.name === "AbortError") {
        console.error("⏰ Request timeout")
        return NextResponse.json(
          {
            error: "انتهت مهلة الاستجابة. يرجى المحاولة مرة أخرى.",
          },
          { status: 408 },
        )
      }

      throw fetchError
    }
  } catch (error) {
    console.error("💥 خطأ عام في API:", error)

    return NextResponse.json(
      {
        error: "حدث خطأ في الخادم. يرجى المحاولة مرة أخرى.",
        success: false,
      },
      { status: 500 },
    )
  }
}
