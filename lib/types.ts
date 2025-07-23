export interface ChatMessage {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
  reasoning?: string
  parts?: MessagePart[]
}

export interface MessagePart {
  type: "text" | "reasoning"
  text?: string
  details?: ReasoningDetail[]
}

export interface ReasoningDetail {
  type: "text" | "redacted"
  text?: string
}

export interface CustomUIDataTypes {
  message: ChatMessage
  reasoning: string
  search: {
    query: string
    results: any[]
  }
}

export interface User {
  id: string
  name?: string
  email?: string
  image?: string
}

export interface ModelConfig {
  id: string
  name: string
  description: string
  provider: string
  maxTokens: number
  supportsReasoning: boolean
}
