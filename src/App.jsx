"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import ModelSelector from "./components/ModelSelector"
import ChatInput from "./components/ChatInput"
import SuggestionChips from "./components/SuggestionChips"
import ChatMessages from "./components/ChatMessages"
import "./App.css"

const DrXChatApp = () => {
  const [selectedModel, setSelectedModel] = useState("deepseek")
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState([])

  // النماذج المتاحة مع معلومات إضافية
  const models = [
    {
      id: "deepseek",
      name: "DeepSeek",
      description: "نموذج متقدم للمحادثة والتفكير العميق",
      features: ["تفكير عميق", "تحليل متقدم", "إبداعي"],
    },
    {
      id: "groq",
      name: "Groq",
      description: "نموذج سريع ودقيق للاستجابة الفورية",
      features: ["سرعة عالية", "دقة ممتازة", "كفاءة"],
    },
    {
      id: "together",
      name: "Together",
      description: "نموذج تعاوني للمهام المعقدة",
      features: ["تعاون", "مهام معقدة", "شامل"],
    },
    {
      id: "gemini",
      name: "Gemini",
      description: "نموذج Google المتقدم متعدد الوسائط",
      features: ["متعدد الوسائط", "ذكي", "متطور"],
    },
  ]

  const handleSuggestionClick = (prompt) => {
    handleSendMessage(prompt)
  }

  const handleSendMessage = async (message) => {
    // إضافة رسالة المستخدم
    const userMessage = {
      sender: "user",
      text: message,
      timestamp: new Date().toLocaleTimeString("ar-SA", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      console.log("إرسال رسالة إلى:", selectedModel)

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          model: selectedModel,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "خطأ في الخادم")
      }

      console.log("تم استلام الرد:", data)

      const aiMessage = {
        sender: "ai",
        text: data.response,
        timestamp: new Date().toLocaleTimeString("ar-SA", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("خطأ في إرسال الرسالة:", error)
      const errorMessage = {
        sender: "ai",
        text: `حدث خطأ: ${error.message}`,
        timestamp: new Date().toLocaleTimeString("ar-SA", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleModelChange = (modelId) => {
    setSelectedModel(modelId)
    console.log("تم تغيير النموذج إلى:", modelId)
  }

  const hasMessages = messages.length > 0

  return (
    <div className="app-container">
      {/* شريط التنقل العلوي */}
      <nav className="top-nav">
        <div className="nav-logo">
          <img src="/drx-logo.png" alt="Dr.X" className="logo-img" />
        </div>
        <div className="nav-actions">
          <button className="nav-button" aria-label="السجل">
            <Search size={20} />
          </button>
          <button className="login-button">تسجيل الدخول</button>
        </div>
      </nav>

      {/* المحتوى الرئيسي */}
      <main className={`main-container ${hasMessages ? "with-messages" : ""}`}>
        {!hasMessages && (
          <>
            <div className="main-logo animate-fade-in">
              <img src="/drx-logo.png" alt="Dr.X" className="main-logo-img" />
            </div>

            {/* منتقي النموذج */}
            <ModelSelector selectedModel={selectedModel} onModelChange={handleModelChange} models={models} />

            {/* شرائح الاقتراحات */}
            <SuggestionChips onSuggestionClick={handleSuggestionClick} />
          </>
        )}

        {hasMessages && (
          <>
            {/* منتقي النموذج المصغر */}
            <div style={{ alignSelf: "flex-start", marginBottom: "1rem" }}>
              <ModelSelector selectedModel={selectedModel} onModelChange={handleModelChange} models={models} />
            </div>

            {/* رسائل المحادثة */}
            <ChatMessages messages={messages} isLoading={isLoading} />
          </>
        )}

        {/* منطقة الإدخال */}
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />

        {/* النص التذييلي */}
        <p className="footer-text">
          بإرسالك رسالة إلى Dr.X، فإنك توافق على{" "}
          <a href="https://x.ai/legal/terms-of-service" target="_blank" rel="noopener noreferrer">
            الشروط
          </a>{" "}
          و{" "}
          <a href="https://x.ai/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
            سياسة الخصوصية
          </a>
          .
        </p>
      </main>
    </div>
  )
}

export default DrXChatApp
