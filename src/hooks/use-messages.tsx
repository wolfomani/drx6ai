"use client"

import { useState, useEffect } from "react"
import { useScrollToBottom } from "./use-scroll-to-bottom"

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
  reasoning?: string
  isLoading?: boolean
}

export interface UseChatHelpers {
  status: "idle" | "loading" | "submitted" | "error"
}

export function useMessages({
  chatId,
  status,
}: {
  chatId: string
  status: UseChatHelpers["status"]
}) {
  const { containerRef, endRef, isAtBottom, scrollToBottom, onViewportEnter, onViewportLeave } = useScrollToBottom()

  const [hasSentMessage, setHasSentMessage] = useState(false)

  useEffect(() => {
    if (chatId) {
      scrollToBottom("instant")
      setHasSentMessage(false)
    }
  }, [chatId, scrollToBottom])

  useEffect(() => {
    if (status === "submitted") {
      setHasSentMessage(true)
    }
  }, [status])

  return {
    containerRef,
    endRef,
    isAtBottom,
    scrollToBottom,
    onViewportEnter,
    onViewportLeave,
    hasSentMessage,
  }
}
