import { openai } from "@ai-sdk/openai"
import { xai } from "@ai-sdk/xai"
import { groq } from "@ai-sdk/groq"
import { fal } from "@fal-ai/serverless"

export const getModel = (modelId: string) => {
  switch (modelId) {
    case "grok-1":
      return xai("grok-1")
    case "grok-1.5":
      return xai("grok-1.5")
    case "grok-3":
      return xai("grok-3")
    case "llama3-8b-8192":
      return groq("llama3-8b-8192")
    case "llama3-70b-8192":
      return groq("llama3-70b-8192")
    case "mixtral-8x7b-32768":
      return groq("mixtral-8x7b-32768")
    case "gemma-7b-it":
      return groq("gemma-7b-it")
    case "gpt-4o":
      return openai("gpt-4o")
    case "gpt-3.5-turbo":
      return openai("gpt-3.5-turbo")
    case "fal-image-gen":
      return fal("fal-ai/stable-diffusion-v1-5")
    default:
      return xai("grok-1") // Default to grok-1 if no match
  }
}

export const getAvailableModels = () => [
  { id: "grok-1", name: "Grok-1", provider: "xAI" },
  { id: "grok-1.5", name: "Grok-1.5", provider: "xAI" },
  { id: "grok-3", name: "Grok-3", provider: "xAI" },
  { id: "llama3-8b-8192", name: "Llama 3 8B", provider: "Groq" },
  { id: "llama3-70b-8192", name: "Llama 3 70B", provider: "Groq" },
  { id: "mixtral-8x7b-32768", name: "Mixtral 8x7B", provider: "Groq" },
  { id: "gemma-7b-it", name: "Gemma 7B", provider: "Groq" },
  { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI" },
  { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", provider: "OpenAI" },
  { id: "fal-image-gen", name: "Fal Image Gen", provider: "Fal AI" },
]

// AI Provider interfaces and classes
export interface AIProvider {
  getName(): string
  isAvailable(): boolean
  generateResponse(message: string): Promise<string>
}

export class XAIProvider implements AIProvider {
  getName(): string {
    return "xAI"
  }

  isAvailable(): boolean {
    return !!process.env.XAI_API_KEY
  }

  async generateResponse(message: string): Promise<string> {
    try {
      const { generateText } = await import("ai")
      const model = xai("grok-3")

      const { text } = await generateText({
        model,
        prompt: message,
      })

      return text
    } catch (error) {
      console.error("XAI Provider Error:", error)
      throw new Error("فشل في الحصول على استجابة من xAI")
    }
  }
}

export class GroqProvider implements AIProvider {
  private modelId: string

  constructor(modelId = "llama3-70b-8192") {
    this.modelId = modelId
  }

  getName(): string {
    return "Groq"
  }

  isAvailable(): boolean {
    return !!process.env.GROQ_API_KEY
  }

  async generateResponse(message: string): Promise<string> {
    try {
      const { generateText } = await import("ai")
      const model = groq(this.modelId)

      const { text } = await generateText({
        model,
        prompt: message,
      })

      return text
    } catch (error) {
      console.error("Groq Provider Error:", error)
      throw new Error("فشل في الحصول على استجابة من Groq")
    }
  }
}

export class OpenAIProvider implements AIProvider {
  private modelId: string

  constructor(modelId = "gpt-4o") {
    this.modelId = modelId
  }

  getName(): string {
    return "OpenAI"
  }

  isAvailable(): boolean {
    return !!process.env.OPENAI_API_KEY
  }

  async generateResponse(message: string): Promise<string> {
    try {
      const { generateText } = await import("ai")
      const model = openai(this.modelId)

      const { text } = await generateText({
        model,
        prompt: message,
      })

      return text
    } catch (error) {
      console.error("OpenAI Provider Error:", error)
      throw new Error("فشل في الحصول على استجابة من OpenAI")
    }
  }
}

export class FalProvider implements AIProvider {
  getName(): string {
    return "Fal AI"
  }

  isAvailable(): boolean {
    return !!process.env.FAL_KEY
  }

  async generateResponse(message: string): Promise<string> {
    try {
      // For image generation, this would be different
      // This is a placeholder implementation
      return `تم إنشاء صورة بناءً على: ${message}`
    } catch (error) {
      console.error("Fal Provider Error:", error)
      throw new Error("فشل في الحصول على استجابة من Fal AI")
    }
  }
}

export class AIProviderFactory {
  static getProvider(modelId: string): AIProvider | null {
    if (modelId.startsWith("grok")) {
      return new XAIProvider()
    } else if (modelId.includes("llama") || modelId.includes("mixtral") || modelId.includes("gemma")) {
      return new GroqProvider(modelId)
    } else if (modelId.startsWith("gpt")) {
      return new OpenAIProvider(modelId)
    } else if (modelId.includes("fal")) {
      return new FalProvider()
    }

    return null
  }

  static getAvailableProviders(): AIProvider[] {
    const providers: AIProvider[] = []

    if (process.env.XAI_API_KEY) {
      providers.push(new XAIProvider())
    }

    if (process.env.GROQ_API_KEY) {
      providers.push(new GroqProvider())
    }

    if (process.env.OPENAI_API_KEY) {
      providers.push(new OpenAIProvider())
    }

    if (process.env.FAL_KEY) {
      providers.push(new FalProvider())
    }

    return providers
  }
}
