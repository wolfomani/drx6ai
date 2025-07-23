import { NextResponse } from "next/server"

// تكوين timeout للطلبات
const REQUEST_TIMEOUT = 45000 // 45 ثانية

// دالة مساعدة لإنشاء timeout
function createTimeout(ms) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Request timeout")), ms)
  })
}

// دالة مساعدة لإرسال طلب مع timeout
async function fetchWithTimeout(url, options, timeoutMs = REQUEST_TIMEOUT) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    if (error.name === "AbortError") {
      throw new Error("Request timeout - الطلب استغرق وقتاً أطول من المتوقع")
    }
    throw error
  }
}

export async function POST(request) {
  console.log("🚀 بدء معالجة طلب الدردشة")

  try {
    // التحقق من وجود البيانات
    const body = await request.json()
    const { message, model, mode } = body

    console.log("📝 بيانات الطلب:", { message: message?.substring(0, 100), model, mode })

    if (!message || !message.trim()) {
      console.log("❌ رسالة فارغة")
      return NextResponse.json({ error: "الرسالة مطلوبة" }, { status: 400 })
    }

    // اختيار النموذج والإعدادات
    let apiUrl, apiKey, modelName, headers

    switch (model) {
      case "deepseek":
        apiUrl = process.env.DEEPSEEK_API_URL || "https://api.deepseek.com/v1/chat/completions"
        apiKey = process.env.DEEPSEEK_API_KEY
        modelName = process.env.DEEPSEEK_AP_MODEL || "deepseek-chat"
        break

      case "groq":
        apiUrl = process.env.GROQ_API_URL || "https://api.groq.com/openai/v1/chat/completions"
        apiKey = process.env.GROQ_API_KEY
        modelName = process.env.GROQ_API_MODEL || "qwen/qwen3-32b"
        break

      case "together":
        apiUrl = process.env.TOGETHER_API_URL || "https://api.together.xyz/v1/chat/completions"
        apiKey = process.env.TOGETHER_API_KEY
        modelName = process.env.TOGETHER_API_MODEL || "deepseek-ai/DeepSeek-R1-Distill-Llama-70B-free"
        break

      case "gemini":
        apiUrl =
          process.env.GENERATE_CONTENT_API ||
          "https://generativelanguage.googleapis.com"
        apiKey = process.env.GEMINI_API_KEY
        modelName = process.env.MODEL_ID || "gemini-2.5-pro"
        break

      default:
        console.log("❌ نموذج غير مدعوم:", model)
        return NextResponse.json({ error: "نموذج غير مدعوم" }, { status: 400 })
    }

    // التحقق من وجود API Key
    if (!apiKey) {
      console.log("❌ مفتاح API مفقود للنموذج:", model)
      return NextResponse.json({ error: `مفتاح API مفقود للنموذج ${model}` }, { status: 500 })
    }

    console.log("🔑 استخدام النموذج:", modelName)

    // إعداد الرسائل حسب الوضع
    let systemPrompt = "أنت مساعد ذكي مفيد. أجب باللغة العربية."

    if (mode === "reasoning") {
      systemPrompt =
        "أنت مساعد ذكي متخصص في التفكير العميق والتحليل المنطقي. فكر خطوة بخطوة وقدم تحليلاً مفصلاً. أجب باللغة العربية."
    } else if (mode === "expert") {
      systemPrompt = "أنت خبير متخصص في جميع المجالات. قدم إجابات متقدمة ومفصلة مع أمثلة عملية. أجب باللغة العربية."
    } else if (mode === "planets") {
      systemPrompt =
        "أنت خبير في علم الفلك والكواكب. قدم معلومات دقيقة ومفصلة عن الكواكب والنجوم والفضاء. أجب باللغة العربية."
    }

    // إعداد الطلب حسب النموذج
    let requestBody, requestHeaders

    if (model === "gemini") {
      // تنسيق خاص بـ Gemini
      requestBody = {
        contents: [
          {
            parts: [
              {
                text: `${systemPrompt}\n\nالسؤال: ${message}`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 4800,
        },
      }
      requestHeaders = {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      }
      apiUrl = `${apiUrl}?key=${apiKey}`
    } else {
      // تنسيق OpenAI المعياري
      requestBody = {
        model: modelName,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        temperature: 0.7,
        max_tokens: 4800,
      }
      requestHeaders = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      }
    }

    console.log("📤 إرسال الطلب إلى:", apiUrl.split("?")[0])

    // إرسال الطلب مع timeout
    const response = await fetchWithTimeout(apiUrl, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(requestBody),
    })

    console.log("📥 حالة الاستجابة:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("❌ خطأ من API:", errorText)

      let errorMessage = "حدث خطأ في الخادم"
      if (response.status === 401) {
        errorMessage = "خطأ في المصادقة - تحقق من مفتاح API"
      } else if (response.status === 429) {
        errorMessage = "تم تجاوز الحد المسموح - يرجى المحاولة لاحقاً"
      } else if (response.status === 500) {
        errorMessage = "خطأ في الخادم - يرجى المحاولة لاحقاً"
      }

      return NextResponse.json({ error: errorMessage }, { status: response.status })
    }

    const data = await response.json()
    console.log("✅ تم استلام الرد بنجاح")

    // استخراج النص حسب النموذج
    let responseText = ""
    let reasoning = null

    if (model === "gemini") {
      responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "لم يتم العثور على رد"
    } else {
      responseText = data.choices?.[0]?.message?.content || "لم يتم العثور على رد"

      // استخراج التفكير إذا كان متاحاً (للنماذج التي تدعم ذلك)
      if (mode === "reasoning" && data.choices?.[0]?.message?.reasoning) {
        reasoning = data.choices[0].message.reasoning
      }
    }

    console.log("📝 طول الرد:", responseText.length)

    return NextResponse.json({
      response: responseText,
      reasoning: reasoning,
      mode: mode,
      model: model,
    })
  } catch (error) {
    console.error("💥 خطأ في معالجة الطلب:", error)

    let errorMessage = "حدث خطأ غير متوقع"
    let statusCode = 500

    if (error.message.includes("timeout")) {
      errorMessage = "انتهت مهلة الاستجابة - يرجى المحاولة مرة أخرى"
      statusCode = 408
    } else if (error.message.includes("fetch")) {
      errorMessage = "خطأ في الاتصال بالخادم"
      statusCode = 503
    }

    return NextResponse.json({ error: errorMessage }, { status: statusCode })
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Chat API is working",
    timestamp: new Date().toISOString(),
    models: ["deepseek", "groq", "together", "gemini"],
  })
}
