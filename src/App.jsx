"use client"

import { useState } from "react"
import { ModelSelector } from "./components/ModelSelector"
import { ChatInput } from "./components/ChatInput"
import { SuggestionChips } from "./components/SuggestionChips"
import "./App.css"

function App() {
  const [selectedModel, setSelectedModel] = useState("deepseek")
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async (message) => {
    setIsLoading(true)
    // Add user message
    const newMessages = [...messages, { role: "user", content: message }]
    setMessages(newMessages)

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "مرحباً! أنا Dr.X، مساعدك الذكي. كيف يمكنني مساعدتك اليوم؟",
        },
      ])
      setIsLoading(false)
    }, 1000)
  }

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion)
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
      dir="rtl"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img src="/drx-logo.png" alt="Dr.X Logo" className="h-16 w-auto" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dr.X AI Assistant</h1>
          <p className="text-gray-600 dark:text-gray-300">مساعدك الذكي المتقدم</p>
        </div>

        {/* Model Selector */}
        <div className="mb-6">
          <ModelSelector selectedModel={selectedModel} onModelChange={setSelectedModel} />
        </div>

        {/* Chat Messages */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-6 min-h-[400px] p-6">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 mt-20">
              <p className="text-lg mb-4">ابدأ محادثة جديدة</p>
              <SuggestionChips onSuggestionClick={handleSuggestionClick} />
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.role === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-lg px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Chat Input */}
        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  )
}

export default App
