"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Menu, Edit, Settings, MoreVertical, Copy, Trash2, ChevronDown, Paperclip, Plus, ArrowUp } from "lucide-react"
import { ChatMessages } from "@/components/chat-messages"

interface ChatInterfaceProps {
  onMenuClick: () => void
  onSettingsClick: () => void
  onRunSettingsClick: () => void
  onCodeClick: () => void
  selectedModel: string
  onBackToLanding?: () => void
  initialMessage?: string
  onMessageSent?: () => void
}

export function ChatInterface({
  onMenuClick,
  onSettingsClick,
  onRunSettingsClick,
  onCodeClick,
  selectedModel,
  onBackToLanding,
  initialMessage,
  onMessageSent,
}: ChatInterfaceProps) {
  const [showDropdown, setShowDropdown] = useState(false)
  const [showInstructions, setShowInstructions] = useState(true)
  const [prompt, setPrompt] = useState("")
  const [messages, setMessages] = useState<
    Array<{
      id: string
      role: "user" | "assistant"
      content: string
      timestamp: Date
      provider?: string
      model?: string
    }>
  >([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState("deepseek")

  const getModelInfo = (modelName: string) => {
    const modelMap: Record<string, { provider: string; id: string }> = {
      "DeepSeek Reasoner": { provider: "deepseek", id: "deepseek-reasoner" },
      "DeepSeek Chat": { provider: "deepseek", id: "deepseek-chat" },
      "Qwen QwQ 32B": { provider: "groq", id: "qwen-qwq-32b" },
      "Llama 3.3 70B": { provider: "groq", id: "llama-3.3-70b-versatile" },
      "Mixtral 8x7B": { provider: "groq", id: "mixtral-8x7b-32768" },
      "DeepSeek V3": { provider: "together", id: "deepseek-ai/DeepSeek-V3" },
      "Llama 3.2 90B Vision": { provider: "together", id: "meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo" },
      "Gemini 2.5 Pro": { provider: "gemini", id: "gemini-2.5-pro" },
      "Gemini 2.5 Flash": { provider: "gemini", id: "gemini-2.5-flash" },
      "Gemma 3n E2B": { provider: "gemini", id: "gemma-3n-e2b-it" },
    }
    return modelMap[modelName] || { provider: "deepseek", id: "deepseek-reasoner" }
  }

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return

    const userMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      content: content.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setPrompt("")
    setIsLoading(true)

    try {
      const modelInfo = getModelInfo(selectedModel)

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          provider: modelInfo.provider,
          model: modelInfo.id,
          messages: [
            {
              role: "system",
              content: "أنت Dr.X، مساعد ذكاء اصطناعي متقدم. أجب باللغة العربية عندما يكون ذلك مناسباً.",
            },
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            { role: "user", content: content.trim() },
          ],
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant" as const,
        content: data.content || "عذراً، حدث خطأ في الاستجابة.",
        timestamp: new Date(),
        provider: modelInfo.provider,
        model: selectedModel,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant" as const,
        content: "عذراً، حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage(prompt)
  }

  useEffect(() => {
    if (initialMessage && initialMessage.trim()) {
      handleSendMessage(initialMessage)
      onMessageSent?.()
    }
  }, [initialMessage])

  return (
    <div className="flex flex-col h-full">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-4">
          {onBackToLanding && (
            <button onClick={onBackToLanding} className="p-2 hover:bg-gray-700 rounded">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <button onClick={onMenuClick} className="p-2 hover:bg-gray-700 rounded">
            <Menu size={20} />
          </button>

          {/* Model Selector */}
          <div className="relative">
            <button
              className="flex items-center gap-2 bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 hover:bg-gray-700"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span>{selectedModel}</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={onCodeClick} className="p-2 hover:bg-gray-700 rounded">
            <Edit size={20} />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
          <button onClick={onSettingsClick} className="p-2 hover:bg-gray-700 rounded">
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 className="text-lg font-medium">Chat Prompt</h2>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-700 rounded">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14,2 14,8 20,8" />
            </svg>
          </button>
          <button className="p-2 hover:bg-gray-700 rounded">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </button>
          <button className="p-2 hover:bg-gray-700 rounded">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </button>
          <button className="p-2 hover:bg-gray-700 rounded">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          </button>
          <button className="p-2 hover:bg-gray-700 rounded">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23 4 23 10 17 10" />
              <polyline points="1 20 1 14 7 14" />
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
            </svg>
          </button>
          <div className="relative">
            <button className="p-2 hover:bg-gray-700 rounded" onClick={() => setShowDropdown(!showDropdown)}>
              <MoreVertical size={20} />
            </button>
            {showDropdown && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-10">
                <button className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-700">
                  <Copy size={16} />
                  Make a copy
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-700">
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Instructions Section */}
      {showInstructions && (
        <div className="p-4 border-b border-gray-700">
          <button
            className="w-full flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700"
            onClick={() => setShowInstructions(!showInstructions)}
          >
            <span className="text-gray-300">Optional tone and style instructions for the model</span>
            <ChevronDown size={16} />
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <ChatMessages messages={messages} isLoading={isLoading} />

      {/* Input Area */}
      <div className="p-4 border-t border-gray-700">
        <form onSubmit={handleSubmit}>
          <div className="relative bg-gray-800 rounded-2xl border border-gray-600">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Start typing a prompt"
              className="w-full bg-transparent p-4 pr-16 pb-16 resize-none outline-none text-white placeholder-gray-400"
              rows={3}
            />

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <button className="p-2 hover:bg-gray-700 rounded-full">
                <Paperclip size={20} />
              </button>

              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-700 rounded-full">
                  <Plus size={20} />
                </button>
                <button className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full">
                  <ArrowUp size={20} />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
