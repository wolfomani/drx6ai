"use client"

import { useEffect, useRef } from "react"
import { MessageCircle, User } from "lucide-react"
import { MessageReasoning } from "./MessageReasoning"

interface ChatMessage {
  id: string
  sender: "user" | "ai"
  text: string
  timestamp: string
  reasoning?: string
  isLoading?: boolean
}

interface ChatMessagesProps {
  messages: ChatMessage[]
  isLoading: boolean
}

const ChatMessages = ({ messages, isLoading }: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  if (messages.length === 0) {
    return null
  }

  return (
    <div className="chat-messages-container">
      <div className="messages-list">
        {messages.map((message, index) => (
          <div
            key={message.id || index}
            className={`message-item ${message.sender === "user" ? "user-message" : "ai-message"} animate-fade-in-up`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="message-avatar">
              {message.sender === "user" ? (
                <User size={20} className="avatar-icon" />
              ) : (
                <MessageCircle size={20} className="avatar-icon" />
              )}
            </div>
            <div className="message-content">
              <div className="message-header">
                <span className="message-sender">{message.sender === "user" ? "أنت" : "Dr.X"}</span>
                <span className="message-time">{message.timestamp}</span>
              </div>

              {/* عرض التفكير المنطقي للرسائل من DeepSeek */}
              {message.reasoning && (
                <MessageReasoning isLoading={message.isLoading || false} reasoning={message.reasoning} />
              )}

              <div className="message-text">{message.text}</div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="message-item ai-message loading-message animate-fade-in">
            <div className="message-avatar">
              <MessageCircle size={20} className="avatar-icon" />
            </div>
            <div className="message-content">
              <div className="message-header">
                <span className="message-sender">Dr.X</span>
                <span className="message-time">الآن</span>
              </div>
              <div className="typing-indicator">
                <div className="typing-dots">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
                <span className="typing-text">يكتب...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}

export default ChatMessages
