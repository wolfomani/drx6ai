"use client"

import { useChat } from "ai/react"
import { useState } from "react"
import { ChatMessages } from "@/components/ChatMessages"
import { ChatInput } from "@/components/ChatInput"
import { ModelSelector } from "@/components/ModelSelector"
import { SuggestionChips } from "@/components/SuggestionChips"
import { Greeting } from "@/components/Greeting"
import { models } from "@/lib/models"
import { motion, AnimatePresence } from "framer-motion"

export default function ChatPage() {
  const [selectedModel, setSelectedModel] = useState("chat-model")
  const [showWelcome, setShowWelcome] = useState(true)

  const { messages, input, handleInputChange, handleSubmit, isLoading, error, setMessages } = useChat({
    api: "/api/chat",
    body: {
      model: selectedModel,
    },
    onFinish: () => {
      if (showWelcome) {
        setShowWelcome(false)
      }
    },
  })

  const hasMessages = messages.length > 0

  const handleSuggestionClick = (suggestion: string) => {
    handleSubmit(new Event("submit") as any, {
      data: { message: suggestion },
    })
  }

  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId)
  }

  const selectedModelConfig = models.find((m) => m.id === selectedModel)

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header with Model Selector */}
      <AnimatePresence>
        {hasMessages && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          >
            <div className="container mx-auto px-4 py-3">
              <ModelSelector models={models} selectedModel={selectedModel} onModelChange={handleModelChange} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {!hasMessages ? (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col items-center justify-center p-4"
            >
              <Greeting />

              <div className="w-full max-w-2xl mt-8 space-y-6">
                <ModelSelector models={models} selectedModel={selectedModel} onModelChange={handleModelChange} />

                <SuggestionChips onSuggestionClick={handleSuggestionClick} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full"
            >
              <ChatMessages messages={messages} isLoading={isLoading} error={error} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <ChatInput
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            showWelcome={!hasMessages}
            supportsReasoning={selectedModelConfig?.supportsReasoning || false}
          />

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg"
            >
              <p className="text-sm text-destructive">❌ حدث خطأ: {error.message}</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
