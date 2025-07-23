"use client"

import type React from "react"

import { useState } from "react"
import { Search, Paperclip, ArrowUp, ImageIcon, Newspaper, Clock, Code } from "lucide-react"

interface LandingPageProps {
  onStartChat: () => void
  onHistoryClick: () => void
}

export function LandingPage({ onStartChat, onHistoryClick }: LandingPageProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onStartChat()
    }
  }

  const handleChipClick = (chipText: string) => {
    setQuery(chipText)
  }

  return (
    <div className="min-h-screen bg-[#1e1f22] text-[#e7e7e7] font-sans" dir="rtl">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-6 bg-[#1e1f22] z-50 border-b border-[#3a3b3e]">
        <a href="#" className="nav-logo">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/drx-logo-kfscZZ9PK5UQMaN90Sc9XRMUpXXJuj.png"
            alt="Dr.X"
            className="w-[88px] h-auto"
          />
        </a>
        <div className="flex items-center gap-3">
          <button
            onClick={onHistoryClick}
            className="p-2 hover:bg-[rgba(239,243,244,0.1)] rounded-full transition-all duration-300 ease-out"
            aria-label="السجل"
          >
            <Search size={20} />
          </button>
          <button className="bg-[#eff3f4] text-[#0f1419] px-5 py-2 rounded-full font-semibold text-sm hover:bg-[#e1e6e9] transition-all duration-300 ease-out">
            تسجيل الدخول
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-24 pb-8 max-w-4xl mx-auto">
        {/* Logo */}
        <div className="mb-10">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/drx-logo-kfscZZ9PK5UQMaN90Sc9XRMUpXXJuj.png"
            alt="Dr.X"
            className="w-[200px] md:w-[280px] h-auto"
          />
        </div>

        {/* Suggestion Chips */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 w-full">
          <button onClick={() => handleChipClick("تعديل الصورة")} className="chip-button group">
            <ImageIcon size={18} className="text-[#8a8a8a] group-hover:text-[#e7e7e7] transition-colors" />
            <span>تعديل الصورة</span>
          </button>
          <button onClick={() => handleChipClick("آخر الأخبار")} className="chip-button group">
            <Newspaper size={18} className="text-[#8a8a8a] group-hover:text-[#e7e7e7] transition-colors" />
            <span>آخر الأخبار</span>
          </button>
          <button onClick={() => handleChipClick("التقارير الفنية")} className="chip-button group">
            <Clock size={18} className="text-[#8a8a8a] group-hover:text-[#e7e7e7] transition-colors" />
            <span>التقارير الفنية</span>
          </button>
          <button onClick={() => handleChipClick("البرمجة")} className="chip-button group">
            <Code size={18} className="text-[#8a8a8a] group-hover:text-[#e7e7e7] transition-colors" />
            <span>البرمجة</span>
          </button>
        </div>

        {/* Search Area */}
        <div className="w-full mb-8">
          <form onSubmit={handleSubmit}>
            <div className="relative bg-[#2a2b2e] border border-[#3a3b3e] rounded-3xl p-3 pb-14 transition-all duration-300 ease-out focus-within:border-[#555] focus-within:shadow-[0_0_0_2px_rgba(255,255,255,0.1)]">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ماذا تريد أن تعرف؟"
                className="w-full bg-transparent border-none outline-none text-[#e7e7e7] resize-none text-base min-h-[3.5rem] md:min-h-[4rem] pt-6 px-3 font-inherit leading-6 placeholder-[#8a8a8a]"
                rows={3}
              />

              <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                <button
                  type="button"
                  className="p-2 hover:bg-[rgba(239,243,244,0.1)] rounded-full transition-all duration-300 ease-out"
                  aria-label="إرفاق ملف"
                >
                  <Paperclip size={20} />
                </button>
                <button
                  type="submit"
                  className="w-10 h-10 bg-[#58a6ff] hover:bg-[#4a8fdf] rounded-full flex items-center justify-center transition-all duration-300 ease-out hover:scale-105 active:scale-95"
                  aria-label="إرسال"
                >
                  <ArrowUp size={20} className="text-[#e7e7e7]" />
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <p className="text-xs text-[#8a8a8a] text-center max-w-lg mx-auto">
          بإرسالك رسالة إلى Dr.X، فإنك توافق على{" "}
          <a
            href="https://x.ai/legal/terms-of-service"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#58a6ff] hover:underline transition-all duration-300 ease-out"
          >
            الشروط
          </a>{" "}
          و{" "}
          <a
            href="https://x.ai/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#58a6ff] hover:underline transition-all duration-300 ease-out"
          >
            سياسة الخصوصية
          </a>
          .
        </p>
      </main>

      <style jsx>{`
        .chip-button {
          @apply bg-[#2a2b2e] border border-[#3a3b3e] text-[#e7e7e7] px-4 py-3 md:px-6 md:py-3 rounded-full text-sm md:text-base cursor-pointer inline-flex items-center gap-2 transition-all duration-300 ease-out hover:bg-[#34363a] hover:-translate-y-0.5;
        }
      `}</style>
    </div>
  )
}
