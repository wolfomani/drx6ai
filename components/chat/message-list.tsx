import type { Message } from "ai"
import ReactMarkdown from "react-markdown"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { User, Bot } from "lucide-react"

interface MessageListProps {
  messages: Message[]
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="space-y-6">
      {messages.map((message, index) => (
        <div
          key={index}
          className={cn("flex items-start gap-4", message.role === "user" ? "justify-end" : "justify-start")}
        >
          {message.role === "assistant" && (
            <Avatar className="h-8 w-8 border border-border-dark">
              <AvatarImage src="/drx-logo_1753309522116.png" alt="AI Avatar" />
              <AvatarFallback className="bg-dr-blue text-white">
                <Bot className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
          )}
          <div
            className={cn(
              "max-w-[70%] p-3 rounded-lg shadow-md",
              message.role === "user"
                ? "bg-dr-blue text-white rounded-br-none"
                : "bg-dark-surface text-text-primary rounded-bl-none",
            )}
          >
            <ReactMarkdown className="prose prose-invert max-w-none">{message.content}</ReactMarkdown>
          </div>
          {message.role === "user" && (
            <Avatar className="h-8 w-8 border border-border-dark">
              <AvatarImage src="/public/placeholder-user.jpg" alt="User Avatar" />
              <AvatarFallback className="bg-gray-600 text-white">
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      ))}
    </div>
  )
}
