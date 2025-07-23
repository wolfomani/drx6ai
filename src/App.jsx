"use client"

import { useState } from "react"
import ModelSelector from "./components/ModelSelector"
import ChatInput from "./components/ChatInput"
import SuggestionChips from "./components/SuggestionChips"
import { Skeleton } from "./components/ui/skeleton"
import { Separator } from "./components/ui/separator"
import "./App.css"

function App() {
  const [selectedModel, setSelectedModel] = useState("deepseek")
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async (message) => {
    const newMessage = {
      id: Date.now(),
      text: message,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: `مرحباً! تلقيت رسالتك: "${message}". هذا رد تجريبي من نموذج ${selectedModel}.`,
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion)
  }

  return (
    <div className="flex flex-col h-screen bg-background" dir="rtl">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <img src="/drx-logo.png" alt="Dr.X Logo" className="h-8 w-auto" />
          <h1 className="text-xl font-bold">Dr.X AI Assistant</h1>
        </div>
        <ModelSelector selectedModel={selectedModel} onModelChange={setSelectedModel} />
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <img src="/drx-logo.png" alt="Dr.X Logo" className="h-16 w-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-bold mb-2">مرحباً بك في Dr.X</h2>
            <p className="text-muted-foreground text-center mb-8">
              مساعدك الذكي للإجابة على أسئلتك ومساعدتك في مختلف المهام
            </p>
            <SuggestionChips onSuggestionClick={handleSuggestionClick} disabled={isLoading} />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">{message.timestamp.toLocaleTimeString("ar-SA")}</span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-end">
                <div className="max-w-[70%] p-3 rounded-lg bg-muted">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <Separator />

      {/* Input Area */}
      <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
    </div>
  )
}

export default App
