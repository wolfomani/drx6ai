"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Paperclip, Mic, ImageIcon, FileText } from "lucide-react"

const ChatInput = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const [showAttachments, setShowAttachments] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const textareaRef = useRef(null)

  const placeholderSuggestions = ["اسأل عن أي شيء...", "كيف يمكنني مساعدتك؟", "ما الذي تريد معرفته؟"]

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

  const handleAttachmentClick = (type) => {
    console.log("Attachment type:", type)
    setShowAttachments(false)
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // هنا يمكن إضافة منطق التسجيل الصوتي
  }

  const isMessageValid = message.trim().length > 0

  return (
    <div className="chat-input-container">
      <form onSubmit={handleSubmit} className="chat-form">
        <div className={`input-wrapper ${isFocused ? "focused" : ""} ${isLoading ? "loading" : ""}`}>
          {isLoading && <div className="loading-bar"></div>}

          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder=""
            className="message-input"
            disabled={isLoading}
            rows={1}
          />

          {!message && !isFocused && (
            <div className="input-placeholder">
              <span className="placeholder-text">اسأل Dr.X عن أي شيء...</span>
              <div className="placeholder-suggestions">
                {placeholderSuggestions.map((suggestion, index) => (
                  <span key={index} className="suggestion-bubble">
                    {suggestion}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="input-controls">
            <div className="controls-left">
              <div className="mode-buttons">
                <button
                  type="button"
                  className="mode-button reasoning-mode"
                  onClick={() => handleModeClick("reasoning")}
                  disabled={!isMessageValid || isLoading}
                  title="تفكير عميق مع DeepSeek R1"
                >
                  🧠 R1
                </button>
                <button
                  type="button"
                  className="mode-button expert-mode"
                  onClick={() => handleModeClick("expert")}
                  disabled={!isMessageValid || isLoading}
                  title="وضع الخبير المطلق - حلول متقدمة"
                >
                  👨‍💻 خبير
                </button>
                <button
                  type="button"
                  className="mode-button planets-mode"
                  onClick={() => handleModeClick("planets")}
                  disabled={!isMessageValid || isLoading}
                  title="بحث متقدم في الكواكب"
                >
                  🔭 كواكب
                </button>
              </div>

              <div className="attachment-container">
                <button
                  type="button"
                  className={`control-button attachment-button ${showAttachments ? "active" : ""}`}
                  onClick={() => setShowAttachments(!showAttachments)}
                  disabled={isLoading}
                  aria-label="إرفاق ملف"
                >
                  <Paperclip size={18} />
                </button>

                {showAttachments && (
                  <div className="attachment-dropdown">
                    <button
                      type="button"
                      className="attachment-option"
                      onClick={() => handleAttachmentClick("image")}
                      style={{ animationDelay: "0s" }}
                    >
                      <ImageIcon size={16} />
                      صورة
                    </button>
                    <button
                      type="button"
                      className="attachment-option"
                      onClick={() => handleAttachmentClick("file")}
                      style={{ animationDelay: "0.1s" }}
                    >
                      <FileText size={16} />
                      ملف
                    </button>
                  </div>
                )}
              </div>

              <button
                type="button"
                className={`control-button mic-button ${isRecording ? "recording" : ""}`}
                onClick={toggleRecording}
                disabled={isLoading}
                aria-label={isRecording ? "إيقاف التسجيل" : "بدء التسجيل"}
              >
                <Mic size={18} />
                {isRecording && <div className="recording-pulse"></div>}
              </button>
            </div>

            <button
              type="submit"
              className={`send-button ${isMessageValid ? "active" : ""} ${isLoading ? "loading" : ""}`}
              disabled={!isMessageValid || isLoading}
              aria-label="إرسال الرسالة"
            >
              {isLoading ? <div className="loading-spinner"></div> : <Send size={18} />}
            </button>
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
