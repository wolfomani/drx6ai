export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  reasoning_content?: string
  timestamp: string
  mode?: string
  parts?: MessagePart[]
}

export interface MessagePart {
  type: "text" | "reasoning" | "file" | "tool-call"
  text?: string
  filename?: string
  mediaType?: string
  url?: string
}

export interface Vote {
  chatId: string
  messageId: string
  isUpvoted: boolean
}
