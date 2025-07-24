import { openai } from "@ai-sdk/openai"
import { xai } from "@ai-sdk/xai"
import { groq } from "@ai-sdk/groq"
import { fal } from "@fal-ai/serverless"
import { deepinfra } from "@deepinfra/ai"

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
      return fal("fal-ai/stable-diffusion-v1-5") // Example for Fal, adjust as needed
    case "deepinfra-llama-2-7b":
      return deepinfra("meta-llama/llama-2-7b-chat") // Example for DeepInfra
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
  { id: "deepinfra-llama-2-7b", name: "Llama 2 7B", provider: "DeepInfra" },
]
