"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { ChatInterface } from "@/components/chat-interface"
import { SettingsModal } from "@/components/settings-modal"
import { RunSettingsModal } from "@/components/run-settings-modal"
import { CodeModal } from "@/components/code-modal"

export default function Home() {
  const [currentView, setCurrentView] = useState<"landing" | "chat">("landing")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [runSettingsOpen, setRunSettingsOpen] = useState(false)
  const [codeModalOpen, setCodeModalOpen] = useState(false)
  const [selectedModel, setSelectedModel] = useState("Gemini 2.5 Flash")
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      setCurrentView("chat")
    }
  }

  const LandingPage = () => (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Top Navigation */}
      <div className="top-nav">
        <a href="#" className="nav-logo">
          <img 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/drx-logo-kfscZZ9PK5UQMaN90Sc9XRMUpXXJuj.png" 
            alt="Dr.X"
          />
        </a>
        <div className="nav-actions">
          <button 
            className="nav-button" 
            aria-label="السجل"
            onClick={() => setSidebarOpen(true)}
          >
            <svg viewBox="2 2 21 21" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 5L19 5"></path>
              <path d="M3 12H7"></path>
              <circle cx="16" cy="15" r="4"></circle>
              <path d="M19 18L21 20"></path>
              <path d="M3 19H7"></path>
            </svg>
          </button>
          <button className="login-button">تسجيل الدخول</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-container">
        <div className="main-logo">
          <img 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/drx-logo-kfscZZ9PK5UQMaN90Sc9XRMUpXXJuj.png" 
            alt="Dr.X"
          />
        </div>
        
        <div className="suggestion-chips">
          <button className="chip">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10.75 9.375C10.75 10.1344 10.1344 10.75 9.375 10.75C8.61561 10.75 8 10.1344 8 9.375C8 8.61561 8.61561 8 9.375 8C10.1344 8 10.75 8.61561 10.75 9.375Z" fill="currentColor"></path>
              <path d="M7.15104 15.1655L9.67016 12.3665C9.85307 12.1633 10.1653 12.1446 10.3711 12.3247L12 13.75L13.4519 11.5918C13.6454 11.3041 14.0661 11.296 14.2706 11.5761L16.9198 15.2052C17.161 15.5356 16.925 16 16.516 16L7.52269 16C7.0898 16 6.86145 15.4873 7.15104 15.1655Z" fill="currentColor"></path>
              <path d="M9 4V4C8.07069 4 7.60603 4 7.21964 4.07686C5.63288 4.39249 4.39249 5.63288 4.07686 7.21964C4 7.60603 4 8.07069 4 9V9M15 4V4C15.9293 4 16.394 4 16.7804 4.07686C18.3671 4.39249 19.6075 5.63288 19.9231 7.21964C20 7.60603 20 8.07069 20 9V9M9 20V20C8.07069 20 7.60603 20 7.21964 19.9231C5.63288 19.6075 4.39249 18.3671 4.07686 16.7804C4 16.394 4 15.9293 4 15V15M15 20V20C15.9293 20 16.394 20 16.7804 19.9231C18.3671 19.6075 19.6075 18.3671 19.9231 16.7804C20 16.394 20 15.9293 20 15V15" stroke="currentColor"></path>
            </svg>
            <span>تعديل الصورة</span>
          </button>
          <button className="chip">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
              <path d="M18 14h-8"></path>
              <path d="M15 18h-5"></path>
              <path d="M10 6h8v4h-8V6Z"></path>
            </svg>
            <span>آخر الأخبار</span>
          </button>
          <button className="chip">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 8v4l3 3"></path>
              <circle cx="12" cy="12" r="10"></circle>
            </svg>
            <span>التقارير الفنية</span>
          </button>
          <button className="chip">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
            </svg>
            <span>البرمجة</span>
          </button>
        </div>
        
        <div className="search-area">
          <form onSubmit={handleSubmit}>
            <div className="query-bar">
              <textarea 
                placeholder=" " 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <span className="placeholder">ماذا تريد أن تعرف؟</span>
              <div className="form-controls">
                <div className="controls-left">
                  <button className="nav-button" type="button" aria-label="إرفاق ملف">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10 9V15C10 16.1046 10.8954 17 12 17V17C13.1046 17 14 16.1046 14 15V7C14 4.79086 12.2091 3 10 3V3C7.79086 3 6 4.79086 6 7V15C6 18.3137 8.68629 21 12 21V21C15.3137 21 18 18.3137 18 15V8"></path>
                    </svg>
                  </button>
                </div>
                <button className="submit-button" type="submit" aria-label="إرسال">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 11L12 4M12 4L19 11M12 4V21"></path>
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
        
        <p className="footer-text">
          بإرسالك رسالة إلى Dr.X، فإنك توافق على <a href="https://x.ai/legal/terms-of-service" target="_blank" rel="noopener noreferrer">الشروط</a> و <a href="https://x.ai/legal/privacy-policy" target="_blank" rel="noopener noreferrer">سياسة الخصوصية</a>.
        </p>
      </div>
    </div>
  )

  if (currentView === "landing") {
    return <LandingPage />
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <ChatInterface
          onMenuClick={() => setSidebarOpen(true)}
          onSettingsClick={() => setSettingsOpen(true)}
          onRunSettingsClick={() => setRunSettingsOpen(true)}
          onCodeClick={() => setCodeModalOpen(true)}
          selectedModel={selectedModel}
          onBackToLanding={() => setCurrentView("landing")}
        />
      </div>

      {/* Modals */}
      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />

      <RunSettingsModal
        isOpen={runSettingsOpen}
        onClose={() => setRunSettingsOpen(false)}
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
      />

      <CodeModal isOpen={codeModalOpen} onClose={() => setCodeModalOpen(false)} />
    </div>
  )
}
