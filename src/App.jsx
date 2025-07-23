"use client"

import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Search, Brain, Settings, User, Home, MessageSquare, Briefcase, BarChart3, Phone, Info } from "lucide-react"
import { Button } from "./components/ui/button"
import ModelSelector from "./components/ModelSelector"
import ChatInput from "./components/ChatInput"
import { ChatMessages } from "./components/ChatMessages"
import { useMessages } from "./hooks/use-messages"
import { chatModels } from "./lib/models"

// Import pages
import ServicesPage from "./pages/ServicesPage"
import PortfolioPage from "./pages/PortfolioPage"
import AnalyticsPage from "./pages/AnalyticsPage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"

import "./App.css"

// Chat Component
function ChatApp() {
  const [messages, setMessages] = useState([])
  const [selectedModel, setSelectedModel] = useState("together")
  const [isLoading, setIsLoading] = useState(false)
  const abortControllerRef = useRef(null)
  const navigate = useNavigate()

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
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `حدث خطأ: ${error.message}`,
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, errorMessage])
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
      {/* شريط التنقل العلوي */}
      <nav className="top-nav">
        <div className="nav-logo">
          <img src="/drx-logo.png" alt="Dr.X" className="logo-img" />
        </div>
        <div className="nav-actions">
          <button className="nav-button" aria-label="السجل">
            <Search size={20} />
          </button>
          <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="hover:bg-[#30363d]">
            <Home className="w-4 h-4 ml-2" />
            الرئيسية
          </Button>
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
            <h1 className="text-2xl font-bold text-center mb-2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              مرحباً. أنا dr.x.
            </h1>
            <p className="text-muted-foreground text-center mb-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              كيف يمكنني مساعدتك اليوم؟
            </p>
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

        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} isInitialScreen={!hasMessages} />

        <p className="footer-text">
          بإرسالك رسالة إلى dr.x، فإنك توافق على{" "}
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

// Home Page Component
function HomePage({ onNavigate, currentView }) {
  const navigate = useNavigate()

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#21262d] text-[#f0f6fc] font-arabic"
      dir="rtl"
    >
      {/* Header */}
      <header className="bg-[#161b22]/80 backdrop-blur-sm border-b border-[#30363d] px-6 py-4 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-800 via-purple-700 to-pink-600 p-0.5">
              <div className="w-full h-full bg-[#21262d] rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-800 via-purple-700 to-pink-600 bg-clip-text text-transparent">
                DRX AI
              </h1>
              <span className="text-sm text-[#8b949e]">منصة الذكاء الاصطناعي الموحدة</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6 space-x-reverse">
            <Button variant="ghost" size="sm" onClick={() => onNavigate("home")} className="hover:bg-[#30363d]">
              <Home className="w-4 h-4 ml-2" />
              الرئيسية
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onNavigate("chat")} className="hover:bg-[#30363d]">
              <MessageSquare className="w-4 h-4 ml-2" />
              الدردشة الذكية
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onNavigate("services")} className="hover:bg-[#30363d]">
              <Briefcase className="w-4 h-4 ml-2" />
              الخدمات
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onNavigate("portfolio")} className="hover:bg-[#30363d]">
              <BarChart3 className="w-4 h-4 ml-2" />
              معرض الأعمال
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onNavigate("analytics")} className="hover:bg-[#30363d]">
              <BarChart3 className="w-4 h-4 ml-2" />
              التحليلات
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onNavigate("about")} className="hover:bg-[#30363d]">
              <Info className="w-4 h-4 ml-2" />
              من نحن
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onNavigate("contact")} className="hover:bg-[#30363d]">
              <Phone className="w-4 h-4 ml-2" />
              اتصل بنا
            </Button>
          </nav>

          <div className="flex items-center space-x-3 space-x-reverse">
            <Button variant="ghost" size="icon" className="hover:bg-[#30363d]">
              <Settings className="w-5 h-5" />
            </Button>
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            مرحباً بك في DRX AI
          </h2>
          <p className="text-xl md:text-2xl text-[#8b949e] mb-8 max-w-3xl mx-auto">
            منصة الذكاء الاصطناعي الموحدة التي تجمع أفضل التقنيات والخدمات في مكان واحد
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => onNavigate("chat")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
            >
              <MessageSquare className="w-5 h-5 ml-2" />
              ابدأ الدردشة الآن
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate("services")}
              className="border-purple-500 text-purple-400 hover:bg-purple-500/10 px-8 py-3 text-lg"
            >
              <Briefcase className="w-5 h-5 ml-2" />
              استكشف الخدمات
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-[#161b22]/50">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-[#f0f6fc]">ميزات المنصة</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#21262d] p-6 rounded-lg border border-[#30363d] hover:border-purple-500/50 transition-colors">
              <MessageSquare className="w-12 h-12 text-purple-400 mb-4" />
              <h4 className="text-xl font-semibold mb-3">دردشة ذكية متطورة</h4>
              <p className="text-[#8b949e]">تفاعل مع نماذج الذكاء الاصطناعي المتقدمة مثل Groq و DeepSeek و Gemini</p>
            </div>
            <div className="bg-[#21262d] p-6 rounded-lg border border-[#30363d] hover:border-purple-500/50 transition-colors">
              <Briefcase className="w-12 h-12 text-blue-400 mb-4" />
              <h4 className="text-xl font-semibold mb-3">خدمات شاملة</h4>
              <p className="text-[#8b949e]">تطوير الويب، تطبيقات الجوال، وحلول الذكاء الاصطناعي المخصصة</p>
            </div>
            <div className="bg-[#21262d] p-6 rounded-lg border border-[#30363d] hover:border-purple-500/50 transition-colors">
              <BarChart3 className="w-12 h-12 text-green-400 mb-4" />
              <h4 className="text-xl font-semibold mb-3">تحليلات متقدمة</h4>
              <p className="text-[#8b949e]">مراقبة الأداء وإحصائيات مفصلة لجميع العمليات والمحادثات</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0d1117] border-t border-[#30363d] py-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#8b949e]">© 2025 DRX AI. جميع الحقوق محفوظة | صُنع بـ ❤️ في سلطنة عُمان</p>
        </div>
      </footer>
    </div>
  )
}

// Main App with Router
function MainApp() {
  const [currentView, setCurrentView] = useState("home")

  const handleNavigate = (view) => {
    setCurrentView(view)
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case "home":
        return <HomePage onNavigate={handleNavigate} currentView={currentView} />
      case "chat":
        return <ChatApp onNavigate={handleNavigate} />
      case "services":
        return <ServicesPage onNavigate={handleNavigate} />
      case "portfolio":
        return <PortfolioPage onNavigate={handleNavigate} />
      case "analytics":
        return <AnalyticsPage onNavigate={handleNavigate} />
      case "about":
        return <AboutPage onNavigate={handleNavigate} />
      case "contact":
        return <ContactPage onNavigate={handleNavigate} />
      default:
        return <HomePage onNavigate={handleNavigate} currentView={currentView} />
    }
  }

  return <div className="App">{renderCurrentView()}</div>
}

export default MainApp
