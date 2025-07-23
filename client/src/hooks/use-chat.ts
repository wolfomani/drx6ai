"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { apiRequest } from "@/lib/queryClient" // Assuming apiRequest is in queryClient.ts

interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
}

interface UseChatOptions {
  initialMessages?: Message[]
  apiEndpoint?: string
}

export function useChat({ initialMessages = [], apiEndpoint = "/api/chat" }: UseChatOptions = {}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!input.trim()) return

      const newMessage: Message = { id: Date.now().toString(), role: "user", content: input }
      setMessages((prev) => [...prev, newMessage])
      setInput("")
      setIsLoading(true)
      setError(null)

      try {
        const response = await apiRequest<{ response: string }>(apiEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ messages: [...messages, newMessage] }),
        })

        const aiResponse: Message = { id: Date.now().toString(), role: "assistant", content: response.response }
        setMessages((prev) => [...prev, aiResponse])
      } catch (err) {
        setError(err as Error)
        console.error("Chat API error:", err)
      } finally {
        setIsLoading(false)
      }
    },
    [input, messages, apiEndpoint],
  )

  return {
    messages,
    setMessages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
  }
}
