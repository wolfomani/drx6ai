"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { MessageList } from "./message-list"
import { MessageInput } from "./message-input"
import { AiThinkingIndicator } from "./ai-thinking-indicator"
import { ReasoningDisplay } from "./reasoning-display"
import { SuggestionChips } from "./suggestion-chips"
import { useChat } from "@/hooks/use-chat"
import { useAudioRecording } from "@/hooks/use-audio-recording"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useIsMobile } from "@/hooks/use-mobile"

export default function CognitiveChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error, setMessages } = useChat()
  const { isRecording, startRecording, stopRecording, audioBlob } = useAudioRecording()
  const [showReasoning, setShowReasoning] = useState(false)
  const [reasoning, setReasoning] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (audioBlob) {
      // Handle audio transcription and sending to AI
      console.log("Audio recorded:", audioBlob)
      // You would typically send this blob to a transcription service
      // and then send the transcribed text to your AI model.
    }
  }, [audioBlob])

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(e)
    // Simulate AI thinking and reasoning
    if (!isLoading) {
      setShowReasoning(true)
      setReasoning("AI is processing your request and formulating a response...")
      setTimeout(() => {
        setReasoning("AI has analyzed the query and is generating the answer.")
      }, 2000)
      setTimeout(() => {
        setShowReasoning(false)
        setReasoning("")
      }, 5000)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setMessages((prevMessages) => [...prevMessages, { id: Date.now().toString(), role: "user", content: suggestion }])
    // Simulate sending the suggestion as input
    // This would typically trigger a new AI response
    console.log("Suggestion clicked:", suggestion)
  }

  return (
    <div className="flex flex-1 flex-col h-full">
      <ScrollArea className="flex-1 p-4">
        <MessageList messages={messages} />
        <div ref={messagesEndRef} />
        {isLoading && (
          <div className="mt-4">
            <AiThinkingIndicator />
            <ReasoningDisplay reasoning={reasoning} />
          </div>
        )}
        {error && <div className="text-red-500 mt-4">Error: {error.message}</div>}
      </ScrollArea>
      <Separator />
      <div className="p-4 bg-background">
        <SuggestionChips onSelect={handleSuggestionClick} />
        <MessageInput
          input={input}
          handleInputChange={handleInputChange}
          handleSend={handleSend}
          isRecording={isRecording}
          startRecording={startRecording}
          stopRecording={stopRecording}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
