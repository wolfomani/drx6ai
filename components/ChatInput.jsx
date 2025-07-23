"use client"

import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"

const ChatInput = ({ onSendMessage, isLoading, isInitialScreen }) => {
  const [message, setMessage] = useState("")
  const textareaRef = useRef(null)

  // تأثير جانبي لضبط ارتفاع مربع النص
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"
    }
  }, [message])

  // التعامل مع النقر على أزرار الوضع
  const handleModeClick = (mode) => {
    if (message.trim()) {
      onSendMessage(message.trim(), mode)
      setMessage("")
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }
    }
  }

  // التعامل مع إرسال النموذج
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

  // التعامل مع ضغطات المفاتيح (خاصة Enter للإرسال)
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  // التحقق مما إذا كانت الرسالة صالحة للإرسال
  const isMessageValid = message.trim().length > 0

  return (
    <div className="chat-input-container">
      <form onSubmit={handleSubmit} className="chat-form">
        <div className={`input-wrapper ${isLoading ? "loading" : ""}`}>
          {isLoading && <div className="loading-bar"></div>}

          {/* النص "أرسل رسالة إلى dr.x" فوق حقل الإدخال */}
          {isInitialScreen && ( // يظهر فقط في الشاشة الابتدائية
            <div className="input-label-container">
              <span className="input-label-text">أرسل رسالة إلى dr.x</span>
            </div>
          )}

          {/* مربع إدخال الرسالة */}
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="" // لا يوجد placeholder مرئي في الصورة
            className="message-input"
            disabled={isLoading}
            rows={1}
          />

          {/* عناصر التحكم في الإدخال */}
          <div className="input-controls">
            {/* زر الإرسال على اليسار */}
            <button
              type="submit"
              className={`send-button ${isMessageValid ? "active" : ""} ${isLoading ? "loading" : ""}`}
              disabled={!isMessageValid || isLoading}
              aria-label="إرسال الرسالة"
            >
              {isLoading ? <div className="loading-spinner"></div> : <Send size={18} />}
            </button>

            {/* أزرار الأوضاع على اليمين */}
            <div className="mode-buttons">
              <button
                type="button"
                className="mode-button reasoning-mode"
                onClick={() => handleModeClick("reasoning")}
                disabled={!isMessageValid || isLoading}
                title="تفكير عميق مع DeepSeek R1"
              >
                🧠 تفكير عميق (R1) {/* تم تغيير النص ليتطابق تماماً مع الصورة */}
              </button>
              <button
                type="button"
                className="mode-button search-mode" // إضافة فئة جديدة للبحث إذا لزم الأمر
                onClick={() => handleModeClick("planets")} // استخدام وضع الكواكب كـ "بحث"
                disabled={!isMessageValid || isLoading}
                title="بحث متقدم"
              >
                🌐 بحث {/* تم تغيير النص ليتطابق تماماً مع الصورة */}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* عداد الأحرف - يبقى كما هو */}
      {message.length > 0 && (
        <div className="character-counter">
          <span className={message.length > 2000 ? "warning" : ""}>{message.length} / 2000</span>
        </div>
      )}
    </div>
  )
}

export default ChatInput
