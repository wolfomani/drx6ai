"use client"

import { useRef, useEffect } from "react"
import { Copy, ThumbsUp, ThumbsDown, RotateCcw } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  provider?: string
  model?: string
}

interface ChatMessagesProps {
  messages: Message[]
  isLoading: boolean
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light mb-8">
            Welcome to <span className="text-blue-400">Dr.X AI Studio</span>
          </h1>
        </div>

        {/* What's new section */}
        <div className="w-full max-w-2xl mb-8">
          <h2 className="text-lg font-medium text-gray-400 mb-4">What's new</h2>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Multiple AI Providers</h3>
                <p className="text-gray-400 text-sm">DeepSeek, Groq, Together, and Gemini models</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="23" />
                  <line x1="8" y1="23" x2="16" y2="23" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Advanced Reasoning</h3>
                <p className="text-gray-400 text-sm">DeepSeek Reasoner and QwQ models for complex problem solving</p>
              </div>
            </div>
          </div>
        </div>

        {/* Suggestion chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-full text-sm">Compare AI models</button>
          <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-full text-sm">
            Solve complex problems
          </button>
          <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-full text-sm">Generate code</button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {messages.map((message) => (
        <div key={message.id} className={`flex gap-4 ${message.role === "user" ? "justify-end" : ""}`}>
          {message.role === "assistant" && (
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/drx-logo-kfscZZ9PK5UQMaN90Sc9XRMUpXXJuj.png"
                alt="Dr.X"
                className="w-6 h-6"
              />
            </div>
          )}

          <div className={`max-w-3xl ${message.role === "user" ? "order-first" : ""}`}>
            <div
              className={`p-4 rounded-lg ${
                message.role === "user" ? "bg-blue-600 text-white ml-auto" : "bg-gray-800 text-gray-100"
              }`}
            >
              <div className="whitespace-pre-wrap">{message.content}</div>

              {message.provider && message.model && (
                <div className="text-xs text-gray-400 mt-2">
                  {message.provider} • {message.model}
                </div>
              )}
            </div>

            {message.role === "assistant" && (
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => copyToClipboard(message.content)}
                  className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white"
                  title="Copy"
                >
                  <Copy size={16} />
                </button>
                <button className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white" title="Good response">
                  <ThumbsUp size={16} />
                </button>
                <button className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white" title="Bad response">
                  <ThumbsDown size={16} />
                </button>
                <button className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white" title="Regenerate">
                  <RotateCcw size={16} />
                </button>
              </div>
            )}
          </div>

          {message.role === "user" && (
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          )}
        </div>
      ))}

      {isLoading && (
        <div className="flex gap-4">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/drx-logo-kfscZZ9PK5UQMaN90Sc9XRMUpXXJuj.png"
              alt="Dr.X"
              className="w-6 h-6"
            />
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  )
}
