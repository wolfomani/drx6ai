"use client"

import { useRef, useEffect } from "react"

interface UseMessagesProps {
  chatId: string
  status: "streaming" | "idle"
}

export function useMessages({ chatId, status }: UseMessagesProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }

  useEffect(() => {
    if (status === "streaming") {
      scrollToBottom()
    }
  }, [status])

  return {
    containerRef,
    scrollToBottom,
  }
}
