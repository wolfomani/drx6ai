export async function POST(request) {
  console.log("[SERVER]🚀 API Chat Route - بدء معالجة الطلب")

  try {
    const body = await request.json()
    const { message, model, mode } = body

    console.log("[SERVER]📝 تفاصيل الطلب:", message)
    console.log("[SERVER]🤖 النموذج المحدد:", model)
    console.log("[SERVER]🎯 الوضع:", mode)

    // فحص مفاتيح API المتاحة
    const apiKeys = {
      deepseek: process.env.DEEPSEEK_API_KEY ? "موجود" : "غير موجود",
      groq: process.env.GROQ_API_KEY ? "موجود" : "غير موجود",
      together: process.env.TOGETHER_API_KEY ? "موجود" : "غير موجود",
      gemini: process.env.GEMINI_API_KEY ? "موجود" : "غير موجود",
    }

    console.log(
      "[SERVER]🔑 فحص مفاتيح API:",
      JSON.stringify(Object.entries(apiKeys).map(([key, value]) => ({ [key]: value }))),
    )

    if (!message || message.trim() === "") {
      return new Response(JSON.stringify({ error: "الرسالة مطلوبة" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // إنشاء AbortController للتحكم في timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 45000) // 45 ثانية

    let response
    const reasoning = null

    try {
      // تحديد النموذج والـ API المناسب
      switch (model) {
        case "deepseek":
          if (!process.env.DEEPSEEK_API_KEY) {
            throw new Error("مفتاح DeepSeek API غير متوفر")
          }
          response = await callDeepSeekAPI(message, mode, controller.signal)
          break

        case "groq":
          if (!process.env.GROQ_API_KEY) {
            throw new Error("مفتاح Groq API غير متوفر")
          }
          response = await callGroqAPI(message, mode, controller.signal)
          break

        case "together":
          if (!process.env.TOGETHER_API_KEY) {
            throw new Error("مفتاح Together API غير متوفر")
          }
          response = await callTogetherAPI(message, mode, controller.signal)
          break

        case "gemini":
          if (!process.env.GEMINI_API_KEY) {
            throw new Error("مفتاح Gemini API غير متوفر")
          }
          response = await callGeminiAPI(message, mode, controller.signal)
          break

        default:
          throw new Error(`نموذج غير مدعوم: ${model}`)
      }

      clearTimeout(timeoutId)
      console.log("[SERVER]✅ تم الحصول على الرد بنجاح")

      return new Response(
        JSON.stringify({
          response: response.content,
          reasoning: response.reasoning || null,
          mode: mode,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      )
    } catch (apiError) {
      clearTimeout(timeoutId)

      if (apiError.name === "AbortError") {
        console.log("[SERVER]⏰ انتهت مهلة الطلب")
        return new Response(
          JSON.stringify({
            error: "انتهت مهلة الاستجابة. يرجى المحاولة مرة أخرى بسؤال أقصر.",
          }),
          {
            status: 408,
            headers: { "Content-Type": "application/json" },
          },
        )
      }

      console.error("[SERVER]❌ خطأ في API:", apiError.message)
      return new Response(
        JSON.stringify({
          error: `خطأ في ${model}: ${apiError.message}`,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      )
    }
  } catch (error) {
    console.error("[SERVER]💥 خطأ عام:", error)
    return new Response(
      JSON.stringify({
        error: "حدث خطأ في الخادم",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}

// دالة استدعاء DeepSeek API
async function callDeepSeekAPI(message, mode, signal) {
  const apiUrl = process.env.DEEPSEEK_API_URL || "https://api.deepseek.com/v1/chat/completions"
  const modelName = process.env.DEEPSEEK_AP_MODEL || "deepseek-chat"

  let systemPrompt =
    "أنت Dr.X، مساعد ذكي يتحدث العربية بطلاقة ويساعد المستخدمين في جميع المجالات. كن مفيداً ومختصراً ومفهوماً."

  if (mode === "reasoning") {
    systemPrompt += "\n\nاستخدم التفكير العميق والتحليل المنطقي في إجاباتك. فكر خطوة بخطوة واشرح منطقك."
  } else if (mode === "expert") {
    systemPrompt += "\n\nأنت في وضع الخبير المطلق. قدم إجابات تقنية متقدمة ومفصلة مع أمثلة عملية."
  } else if (mode === "planets") {
    systemPrompt += "\n\nأنت متخصص في علم الفلك والكواكب. قدم معلومات دقيقة ومفصلة عن الكواكب والنجوم والفضاء."
  }

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: modelName,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    }),
    signal,
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`DeepSeek API Error: ${response.status} - ${errorText}`)
  }

  const data = await response.json()
  return {
    content: data.choices[0].message.content,
    reasoning: null,
  }
}

// دالة استدعاء Groq API
async function callGroqAPI(message, mode, signal) {
  const apiUrl = process.env.GROQ_API_URL || "https://api.groq.com/openai/v1/chat/completions"
  const modelName = process.env.GROQ_API_MODEL || "llama-3.1-70b-versatile"

  let systemPrompt =
    "أنت Dr.X، مساعد ذكي يتحدث العربية بطلاقة ويساعد المستخدمين في جميع المجالات. كن مفيداً ومختصراً ومفهوماً."

  if (mode === "reasoning") {
    systemPrompt += "\n\nاستخدم التفكير العميق والتحليل المنطقي في إجاباتك. فكر خطوة بخطوة واشرح منطقك."
  } else if (mode === "expert") {
    systemPrompt += "\n\nأنت في وضع الخبير المطلق. قدم إجابات تقنية متقدمة ومفصلة مع أمثلة عملية."
  } else if (mode === "planets") {
    systemPrompt += "\n\nأنت متخصص في علم الفلك والكواكب. قدم معلومات دقيقة ومفصلة عن الكواكب والنجوم والفضاء."
  }

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: modelName,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    }),
    signal,
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Groq API Error: ${response.status} - ${errorText}`)
  }

  const data = await response.json()
  return {
    content: data.choices[0].message.content,
    reasoning: null,
  }
}

// دالة استدعاء Together API
async function callTogetherAPI(message, mode, signal) {
  const apiUrl = process.env.TOGETHER_API_URL || "https://api.together.xyz/v1/chat/completions"
  const modelName = process.env.TOGETHER_API_MODEL || "meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo"

  let systemPrompt =
    "أنت Dr.X، مساعد ذكي يتحدث العربية بطلاقة ويساعد المستخدمين في جميع المجالات. كن مفيداً ومختصراً ومفهوماً."

  if (mode === "reasoning") {
    systemPrompt += "\n\nاستخدم التفكير العميق والتحليل المنطقي في إجاباتك. فكر خطوة بخطوة واشرح منطقك."
  } else if (mode === "expert") {
    systemPrompt += "\n\nأنت في وضع الخبير المطلق. قدم إجابات تقنية متقدمة ومفصلة مع أمثلة عملية."
  } else if (mode === "planets") {
    systemPrompt += "\n\nأنت متخصص في علم الفلك والكواكب. قدم معلومات دقيقة ومفصلة عن الكواكب والنجوم والفضاء."
  }

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: modelName,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    }),
    signal,
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Together API Error: ${response.status} - ${errorText}`)
  }

  const data = await response.json()
  return {
    content: data.choices[0].message.content,
    reasoning: null,
  }
}

// دالة استدعاء Gemini API
async function callGeminiAPI(message, mode, signal) {
  const apiUrl = `${process.env.GENERATE_CONTENT_API}?key=${process.env.GEMINI_API_KEY}`
  const modelName = process.env.MODEL_ID || "gemini-1.5-flash"

  let systemPrompt =
    "أنت Dr.X، مساعد ذكي يتحدث العربية بطلاقة ويساعد المستخدمين في جميع المجالات. كن مفيداً ومختصراً ومفهوماً."

  if (mode === "reasoning") {
    systemPrompt += "\n\nاستخدم التفكير العميق والتحليل المنطقي في إجاباتك. فكر خطوة بخطوة واشرح منطقك."
  } else if (mode === "expert") {
    systemPrompt += "\n\nأنت في وضع الخبير المطلق. قدم إجابات تقنية متقدمة ومفصلة مع أمثلة عملية."
  } else if (mode === "planets") {
    systemPrompt += "\n\nأنت متخصص في علم الفلك والكواكب. قدم معلومات دقيقة ومفصلة عن الكواكب والنجوم والفضاء."
  }

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: `${systemPrompt}\n\nالمستخدم: ${message}`,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2000,
      },
    }),
    signal,
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Gemini API Error: ${response.status} - ${errorText}`)
  }

  const data = await response.json()
  return {
    content: data.candidates[0].content.parts[0].text,
    reasoning: null,
  }
}
