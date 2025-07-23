"use client"

import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"

const ChatInput = ({ onSendMessage, isLoading, isInitialScreen }) => {
  const [message, setMessage] = useState("")
  const textareaRef = useRef(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"
    }
  }, [message])

  const handleModeClick = (mode) => {
    if (message.trim()) {
      onSendMessage(message.trim(), mode)
      setMessage("")
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim(), "default")
      setMessage("")
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const isMessageValid = message.trim().length > 0

  return (
    <div className="chat-input-container">
      <form onSubmit={handleSubmit} className="chat-form">
        <div className={`input-wrapper ${isLoading ? "loading" : ""}`}>
          {isLoading && <div className="loading-bar"></div>}

          {isInitialScreen && (
            <div className="input-label-container">
              <span className="input-label-text">أرسل رسالة إلى dr.x</span>
            </div>
          )}

          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder=""
            className="message-input"
            disabled={isLoading}
            rows={1}
          />

          <div className="input-controls">
            <button
              type="submit"
              className={`send-button ${isMessageValid ? "active" : ""} ${isLoading ? "loading" : ""}`}
              disabled={!isMessageValid || isLoading}
              aria-label="إرسال الرسالة"
            >
              {isLoading ? <div className="loading-spinner"></div> : <Send size={18} />}
            </button>

            <div className="mode-buttons">
              <button
                type="button"
                className="mode-button reasoning-mode"
                onClick={() => handleModeClick("reasoning")}
                disabled={!isMessageValid || isLoading}
                title="تفكير عميق مع DeepSeek R1"
              >
                🧠 تفكير عميق (R1)
              </button>
              <button
                type="button"
                className="mode-button search-mode"
                onClick={() => handleModeClick("planets")}
                disabled={!isMessageValid || isLoading}
                title="بحث متقدم"
              >
                🌐 بحث
              </button>
            </div>
          </div>
        </div>
      </form>

      {message.length > 0 && (
        <div className="character-counter">
          <span className={message.length > 2000 ? "warning" : ""}>{message.length} / 2000</span>
        </div>
      )}
    </div>
  )
}

export default ChatInput
