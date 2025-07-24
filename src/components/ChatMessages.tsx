"use client"
import { motion, AnimatePresence } from "framer-motion"
import { MessageReasoning } from "./MessageReasoning"
import { MessageActions } from "./MessageActions"
import { Greeting } from "./Greeting"
import { SparklesIcon } from "./icons"
import { Markdown } from "./markdown"

interface ChatMessagesProps {
  messages: any[]
  isLoading: boolean
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  if (messages.length === 0) {
    return <Greeting />
  }

  return (
    <div className="flex flex-col gap-6 p-4 max-w-4xl mx-auto w-full">
      <AnimatePresence>
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {message.role === "assistant" && (
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shrink-0">
                <SparklesIcon size={16} className="text-primary-foreground" />
              </div>
            )}

            <div className={`flex flex-col gap-2 max-w-[80%] ${message.role === "user" ? "items-end" : "items-start"}`}>
              {message.reasoning_content && (
                <MessageReasoning isLoading={false} reasoning={message.reasoning_content} />
              )}

              <div
                className={`p-4 rounded-lg ${
                  message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                <Markdown>{message.content}</Markdown>
              </div>

              {message.role === "assistant" && (
                <MessageActions
                  chatId="main-chat"
                  message={message}
                  isLoading={isLoading && index === messages.length - 1}
                />
              )}
            </div>

            {message.role === "user" && (
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center shrink-0">
                <span className="text-sm font-medium">أنت</span>
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {isLoading && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4 justify-start">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shrink-0">
            <SparklesIcon size={16} className="text-primary-foreground" />
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="animate-pulse">جاري الكتابة...</div>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
