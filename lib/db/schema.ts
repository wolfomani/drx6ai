export interface Vote {
  chatId: string
  messageId: string
  isUpvoted: boolean
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  reasoning_content?: string
  timestamp: string
  mode?: string
}
