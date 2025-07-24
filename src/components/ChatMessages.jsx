"use client"

import { useEffect, useRef } from "react"
import { MessageCircle, User } from "lucide-react"

const ChatMessages = ({ messages, isLoading }) => {
  const messagesEndRef = useRef(null)

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
            key={index}
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
