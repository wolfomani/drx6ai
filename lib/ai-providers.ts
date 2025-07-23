// AI Provider configurations and API calls

export interface AIProvider {
  name: string
  models: string[]
  apiKey: string
  baseUrl: string
}

export const AI_PROVIDERS: Record<string, AIProvider> = {
  deepseek: {
    name: "DeepSeek",
    models: ["deepseek-reasoner", "deepseek-chat"],
    apiKey: process.env.DEEPSEEK_API_KEY || "",
    baseUrl: process.env.DEEPSEEK_API_URL || "https://api.deepseek.com",
  },
  groq: {
    name: "Groq",
    models: ["llama-3.3-70b-versatile", "qwen-qwq-32b", "mixtral-8x7b-32768", "llama-3.1-70b-versatile"],
    apiKey: process.env.GROQ_API_KEY || "",
    baseUrl: process.env.GROQ_API_URL || "https://api.groq.com/openai/v1",
  },
  together: {
    name: "Together",
    models: [
      "deepseek-ai/DeepSeek-V3",
      "meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo",
      "meta-llama/Llama-3.1-405B-Instruct-Turbo",
    ],
    apiKey: process.env.TOGETHER_API_KEY || "",
    baseUrl: process.env.TOGETHER_API_URL || "https://api.together.xyz/v1",
  },
  gemini: {
    name: "Gemini",
    models: ["gemini-2.5-flash", "gemini-2.5-pro", "gemma-3n-e2b-it", "gemini-1.5-pro"],
    apiKey: process.env.GEMINI_API_KEY || "",
    baseUrl: "https://generativelanguage.googleapis.com/v1beta",
  },
}

export interface ChatMessage {
  role: "system" | "user" | "assistant"
  content: string
}

export async function sendMessage(
  provider: string,
  model: string,
  messages: ChatMessage[],
  stream = false,
): Promise<Response> {
  const providerConfig = AI_PROVIDERS[provider]

  if (!providerConfig) {
    throw new Error(`Provider ${provider} not found`)
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${providerConfig.apiKey}`,
  }

  let url = ""
  let body: any = {}

  switch (provider) {
    case "deepseek":
      url = `${providerConfig.baseUrl}/chat/completions`
      body = {
        model,
        messages,
        stream,
        temperature: 1,
        max_tokens: 4096,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }
      break

    case "groq":
      url = `${providerConfig.baseUrl}/chat/completions`
      body = {
        model,
        messages,
        stream,
        temperature: 0.7,
        max_tokens: 4096,
        top_p: 1,
      }
      break

    case "together":
      url = `${providerConfig.baseUrl}/chat/completions`
      body = {
        model,
        messages,
        stream,
        temperature: 0.8,
        max_tokens: 4096,
        top_p: 0.9,
      }
      break

    case "gemini":
      // Gemini has a different API structure
      url = `${providerConfig.baseUrl}/models/${model}:${stream ? "streamGenerateContent" : "generateContent"}?key=${providerConfig.apiKey}`
      body = {
        contents: messages
          .filter((msg) => msg.role !== "system")
          .map((msg) => ({
            role: msg.role === "assistant" ? "model" : msg.role,
            parts: [{ text: msg.content }],
          })),
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 4096,
          topP: 0.8,
        },
      }

      // Add system instruction if present
      const systemMessage = messages.find((msg) => msg.role === "system")
      if (systemMessage) {
        body.systemInstruction = {
          parts: [{ text: systemMessage.content }],
        }
      }

      // Remove Authorization header for Gemini as it uses API key in URL
      delete headers.Authorization
      break

    default:
      throw new Error(`Unsupported provider: ${provider}`)
  }

  return fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  })
}
