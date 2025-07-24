"use client"

import { useState, useRef, useEffect } from "react"
import { Search } from "lucide-react"
import ModelSelector from "./components/ModelSelector"
import ChatInput from "./components/ChatInput"
import { ChatMessages } from "./components/ChatMessages"
import SuggestionChips from "./components/SuggestionChips"
import { useMessages } from "./hooks/use-messages"
import { chatModels } from "./lib/models"
import "./App.css"

async function App() {
  const [messages, setMessages] = useState([])
  const [selectedModel, setSelectedModel] = useState("together")
  const [isLoading, setIsLoading] = useState(false)
  const abortControllerRef = useRef(null)

  const { containerRef, scrollToBottom } = useMessages({
    chatId: "main-chat",
    status: isLoading ? "streaming" : "idle",
  })

  const getModeDisplayText = (mode) => {
    switch (mode) {
      case "reasoning":
        return "🧠 [تفكير عميق R1]"
      case "expert":
        return "👨‍💻 [وضع الخبير المطلق]"
      case "planets":
        return "🔭 [بحث الكواكب]"
      default:
        return ""
    }
  }

  const handleSendMessage = async (message, mode = "default") => {
    if (!message.trim() || isLoading) return

    // أضف معلومات الوضع للرسالة
    let displayMessage = message
    const modeText = getModeDisplayText(mode)
    if (modeText) {
      displayMessage = `${modeText} ${message}`
    }

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: displayMessage,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    abortControllerRef.current = new AbortController()

    try {
      console.log("إرسال رسالة إلى:", selectedModel)
      console.log("محتوى الرسالة:", message)
      console.log("الوضع:", mode)

      const requestBody = {
        message: message,
        model: selectedModel,
        mode: mode,
      }

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
        signal: abortControllerRef.current.signal,
      })

      console.log("حالة الاستجابة:", response.status)

      const responseText = await response.text()
      console.log("Raw response:", responseText)

      if (!response.ok) {
        let errorData
        try {
          errorData = JSON.parse(responseText)
        } catch (e) {
          errorData = { error: responseText }
        }
        console.error("خطأ من الخادم:", errorData)
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      let data
      try {
        data = JSON.parse(responseText)
      } catch (parseError) {
        console.error("Failed to parse response JSON:", parseError)
        throw new Error("Invalid JSON response from server")
      }

      console.log("تم استلام الرد:", data)

      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        reasoning_content: data.reasoning || null,
        timestamp: new Date().toISOString(),
        mode: data.mode || mode,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("تم إلغاء الطلب")
        return
      }

      console.error("خطأ في إرسال الرسالة:", error)

      let errorMessage = "حدث خطأ غير متوقع"

      if (error.message.includes("timeout") || error.message.includes("408")) {
        errorMessage = "انتهت مهلة الاستجابة ⏰\nيرجى المحاولة مرة أخرى بسؤال أقصر أو تبسيط الطلب."
      } else if (error.message.includes("500")) {
        errorMessage = "خطأ في الخادم 🔧\nيرجى المحاولة مرة أخرى بعد قليل."
      } else if (error.message.includes("API")) {
        errorMessage = "مشكلة في الاتصال بالذكاء الاصطناعي 🤖\nيرجى تجربة نموذج آخر."
      } else {
        errorMessage = `حدث خطأ: ${error.message}`
      }

      const errorMessageObj = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: errorMessage,
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, errorMessageObj])
    } finally {
      setIsLoading(false)
      abortControllerRef.current = null
    }
  }

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion)
  }

  const handleModelChange = (modelId) => {
    setSelectedModel(modelId)
    console.log("تم تغيير النموذج إلى:", modelId)
  }

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  const hasMessages = messages.length > 0

  return (
    <div className="app-container">
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

      <main className={`main-container ${hasMessages ? "with-messages" : ""}`}>
        {!hasMessages && (
          <>
            <div className="main-logo animate-fade-in">
              <img src="/drx-logo.png" alt="Dr.X" className="main-logo-img" />
            </div>

            <ModelSelector selectedModel={selectedModel} onModelChange={handleModelChange} models={chatModels} />

            <SuggestionChips onSuggestionClick={handleSuggestionClick} />
          </>
        )}

        {hasMessages && (
          <>
            <div style={{ alignSelf: "flex-start", marginBottom: "1rem" }}>
              <ModelSelector selectedModel={selectedModel} onModelChange={handleModelChange} models={chatModels} />
            </div>

            <div ref={containerRef} className="messages-container flex-1 overflow-y-auto">
              <ChatMessages messages={messages} isLoading={isLoading} />
            </div>
          </>
        )}

        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />

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

export default App
