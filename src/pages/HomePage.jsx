"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Brain,
  Settings,
  Bell,
  User,
  Menu,
  AlertCircle,
  Database,
  Home,
  MessageSquare,
  Briefcase,
  BarChart3,
  Phone,
  Info,
} from "lucide-react"
import { EnhancedChatInterface } from "@/components/enhanced-chat-interface"
import { ConversationSidebar } from "@/components/conversation-sidebar"
import { ModelSelector } from "@/components/model-selector"
import { ModelTestPanel } from "@/components/model-test-panel"

export default function HomePage({ onNavigate, currentView }) {
  const [selectedModel, setSelectedModel] = useState("Groq Llama 3.3")
  const [isModelSelectorOpen, setIsModelSelectorOpen] = useState(false)
  const [isTestPanelOpen, setIsTestPanelOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [currentConversationId, setCurrentConversationId] = useState()
  const [systemReady, setSystemReady] = useState(false)

  // فحص النماذج المتاحة عند التحميل
  useEffect(() => {
    const checkAvailableModels = async () => {
      try {
        const response = await fetch("/api/models")
        const data = await response.json()

        if (data.status.hasAny && data.models.length > 0) {
          // اختيار أول نموذج متاح
          setSelectedModel(data.models[0].name)
          setSystemReady(true)
        } else {
          // فتح منتقي النماذج إذا لم تكن هناك نماذج متاحة
          setIsModelSelectorOpen(true)
          setSystemReady(false)
        }
      } catch (error) {
        console.error("خطأ في فحص النماذج:", error)
        setIsModelSelectorOpen(true)
        setSystemReady(false)
      }
    }

    checkAvailableModels()
  }, [])

  // إنشاء محادثة جديدة
  const createNewConversation = () => {
    const newId = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    setCurrentConversationId(newId)
  }

  // تحديث المحادثة
  const handleConversationUpdate = (id, title, messages) => {
    // يمكن إضافة منطق إضافي هنا إذا لزم الأمر
  }

  // تغيير النموذج
  const handleModelChange = (model) => {
    setSelectedModel(model)
    setSystemReady(true)
  }

  // عرض لوحة الاختبار
  if (isTestPanelOpen) {
    return (
      <div className="min-h-screen bg-[#0d1117] text-[#f0f6fc] font-arabic" dir="rtl">
        <header className="bg-[#161b22] border-b border-[#30363d] px-6 py-4 flex items-center justify-between sticky top-0 z-30">
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
              <span className="text-sm text-[#8b949e]">اختبار النماذج</span>
            </div>
          </div>
          <Button onClick={() => setIsTestPanelOpen(false)} variant="outline">
            العودة للدردشة
          </Button>
        </header>
        <ModelTestPanel />
      </div>
    )
  }

  // عرض الدردشة
  if (currentView === "chat") {
    return (
      <div className="min-h-screen bg-[#0d1117] text-[#f0f6fc] font-arabic" dir="rtl">
        {/* Header */}
        <header className="bg-[#161b22] border-b border-[#30363d] px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center space-x-4 space-x-reverse">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hover:bg-[#30363d] lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </Button>

            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-800 via-purple-700 to-pink-600 p-0.5">
              <div className="w-full h-full bg-[#21262d] rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-800 via-purple-700 to-pink-600 bg-clip-text text-transparent">
                DRX AI
              </h1>
              <span className="text-sm text-[#8b949e]">نظام ذكي متقدم</span>
            </div>

            {/* مؤشرات الحالة */}
            <div className="flex items-center space-x-3 space-x-reverse">
              {/* مؤشر قاعدة البيانات */}
              <div className="flex items-center space-x-1 space-x-reverse text-green-400 text-sm">
                <Database className="w-4 h-4" />
                <span>قاعدة البيانات متصلة</span>
              </div>

              {/* مؤشر حالة النظام */}
              {!systemReady && (
                <div className="flex items-center space-x-2 space-x-reverse text-yellow-400">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">يتطلب إعداد</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3 space-x-reverse">
            <Button variant="ghost" size="sm" onClick={() => onNavigate("home")} className="hover:bg-[#30363d]">
              <Home className="w-4 h-4 ml-2" />
              الرئيسية
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-[#30363d]">
              <Settings className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-[#30363d]">
              <Bell className="w-5 h-5" />
            </Button>
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </header>

        <div className="flex h-[calc(100vh-89px)] relative">
          {/* Overlay للموبايل */}
          {!sidebarCollapsed && (
            <div className="fixed inset-0 bg-black/50 z-10 lg:hidden" onClick={() => setSidebarCollapsed(true)} />
          )}

          <ConversationSidebar
            collapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            currentConversationId={currentConversationId}
            onConversationSelect={setCurrentConversationId}
            onNewConversation={createNewConversation}
          />

          <EnhancedChatInterface
            selectedModel={selectedModel}
            onModelSelectorToggle={() => setIsModelSelectorOpen(!isModelSelectorOpen)}
            conversationId={currentConversationId}
            onConversationUpdate={handleConversationUpdate}
            onModelChange={handleModelChange}
            onTestPanelToggle={() => setIsTestPanelOpen(true)}
          />
        </div>

        <ModelSelector
          isOpen={isModelSelectorOpen}
          onClose={() => setIsModelSelectorOpen(false)}
          selectedModel={selectedModel}
          onModelSelect={handleModelChange}
        />
      </div>
    )
  }

  // الصفحة الرئيسية
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
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate("home")}
              className={`hover:bg-[#30363d] ${currentView === "home" ? "bg-[#30363d]" : ""}`}
            >
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
