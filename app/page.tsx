"use client"

import { useState, useEffect } from "react"
import { ModelSelector } from "../components/ModelSelector"
import { ChatInput } from "../components/ChatInput"
import { ChatMessages } from "../components/ChatMessages"
import { useMessages } from "../hooks/use-messages"
import { useIsMobile } from "../hooks/use-mobile"
import Image from "next/image"

export default function HomePage() {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedModel, setSelectedModel] = useState("grok-3")
  const isMobile = useIsMobile()

  const { containerRef, endRef, isAtBottom, scrollToBottom, onViewportEnter, onViewportLeave, hasSentMessage } =
    useMessages({
      chatId: "main-chat",
      status: isLoading ? "loading" : "idle",
    })

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: message,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          model: selectedModel,
        }),
      })

      if (!response.ok) {
        throw new Error("فشل في إرسال الرسالة")
      }

      const data = await response.json()

      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message || "عذراً، حدث خطأ في الاستجابة",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "عذراً، حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom("smooth")
    }
  }, [messages, scrollToBottom])

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header with model selector - only show when there are messages */}
      {messages.length > 0 && (
        <div className="border-b border-border p-4">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex items-center gap-3">
              <Image src="/drx-logo.png" alt="Dr.X Logo" width={32} height={32} className="logo-nav" />
              <h1 className="text-lg font-semibold">Dr.X AI</h1>
            </div>
            <ModelSelector selectedModel={selectedModel} onModelChange={setSelectedModel} />
          </div>
        </div>
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {messages.length === 0 ? (
          /* Welcome screen */
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <div className="text-center space-y-6 max-w-2xl">
              <div className="logo-container fade-in">
                <Image src="/drx-logo.png" alt="Dr.X Logo" width={80} height={80} className="logo-main" />
              </div>
              <div className="space-y-2 fade-in">
                <h1 className="text-4xl font-bold text-foreground">مرحباً بك في Dr.X AI</h1>
                <p className="text-xl text-muted-foreground">مساعدك الذكي المتقدم يدعم اللغة العربية</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground fade-in">
                <div className="p-4 rounded-lg bg-muted/50">
                  <h3 className="font-semibold mb-2">🤖 نماذج متعددة</h3>
                  <p>دعم لأحدث نماذج الذكاء الاصطناعي</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <h3 className="font-semibold mb-2">🧠 التفكير المنطقي</h3>
                  <p>قدرات تحليل وتفكير متقدمة</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <h3 className="font-semibold mb-2">🔍 البحث الذكي</h3>
                  <p>إمكانيات بحث وتحليل شاملة</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <h3 className="font-semibold mb-2">🌙 واجهة متكيفة</h3>
                  <p>دعم الوضع المظلم والفاتح</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Chat messages */
          <div ref={containerRef} className="flex-1 overflow-y-auto p-4">
            <div className="max-w-4xl mx-auto">
              <ChatMessages messages={messages} isLoading={isLoading} />
              <div ref={endRef} />
            </div>
          </div>
        )}

        {/* Chat input */}
        <div className="border-t border-border p-4">
          <div className="max-w-4xl mx-auto">
            <ChatInput
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              placeholder={messages.length === 0 ? "اكتب رسالتك هنا لبدء المحادثة مع Dr.X AI..." : "اكتب رسالتك هنا..."}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
