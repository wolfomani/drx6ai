"use client"
import { MessageReasoning } from "./MessageReasoning"

interface MessageProps {
  role: "user" | "assistant"
  content: string
  reasoning_content?: string
}

export function Message({ role, content, reasoning_content }: MessageProps) {
  return (
    <div className={`flex gap-3 ${role === "user" ? "justify-end" : "justify-start"}`}>
      {role === "assistant" && (
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shrink-0">
          <span className="text-primary-foreground text-sm">AI</span>
        </div>
      )}

      <div className={`max-w-[80%] ${role === "user" ? "order-first" : ""}`}>
        {reasoning_content && <MessageReasoning isLoading={false} reasoning={reasoning_content} />}

        <div className={`p-3 rounded-lg ${role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
          <div className="whitespace-pre-wrap">{content}</div>
        </div>
      </div>

      {role === "user" && (
        <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center shrink-0">
          <span className="text-sm font-medium">أنت</span>
        </div>
      )}
    </div>
  )
}
