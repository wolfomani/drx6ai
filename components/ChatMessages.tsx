"use client"

import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageReasoning } from "./MessageReasoning"
import { MessageActions } from "./MessageActions"
import { Markdown } from "./markdown"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Card } from "./ui/card"
import { Separator } from "./ui/separator"
import { LoaderIcon, UserIcon, BotIcon } from "./icons"
import type { ChatMessage } from "@/lib/types"

interface ChatMessagesProps {
  messages: ChatMessage[]
  isLoading?: boolean
  error?: Error | null
}

export function ChatMessages({ messages, isLoading, error }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="container mx-auto px-4 py-6 space-y-6">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex gap-4">
                  {/* Avatar */}
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback>
                      {message.role === "user" ? <UserIcon className="h-4 w-4" /> : <BotIcon className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>

                  {/* Content */}
                  <div className="flex-1 space-y-3">
                    {/* Role Label */}
                    <div className="text-sm font-medium text-muted-foreground">
                      {message.role === "user" ? "أنت" : "المساعد الذكي"}
                    </div>

                    {/* Message Content */}
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      {message.parts ? (
                        // Handle message parts (for AI SDK format)
                        message.parts.map((part, partIndex) => {
                          if (part.type === "text") {
                            return (
                              <div key={partIndex}>
                                <Markdown content={part.text || ""} />
                              </div>
                            )
                          }
                          if (part.type === "reasoning") {
                            return (
                              <MessageReasoning
                                key={partIndex}
                                isLoading={false}
                                reasoning={part.details?.map((d) => d.text).join("") || ""}
                              />
                            )
                          }
                          return null
                        })
                      ) : (
                        // Handle simple content
                        <Markdown content={message.content} />
                      )}
                    </div>

                    {/* Reasoning (if available) */}
                    {message.reasoning && <MessageReasoning isLoading={false} reasoning={message.reasoning} />}

                    {/* Message Actions */}
                    {message.role === "assistant" && (
                      <>
                        <Separator className="my-4" />
                        <MessageActions message={message} />
                      </>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading Indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center py-8"
          >
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <LoaderIcon className="h-5 w-5 animate-spin" />
                <span className="text-muted-foreground">المساعد يفكر...</span>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg"
          >
            <p className="text-destructive">❌ خطأ: {error.message}</p>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}
