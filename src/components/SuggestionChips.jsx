"use client"

import React, { useState } from "react"
import { ImageIcon, FileText, Clock, Code, Lightbulb, Calculator, Globe, Music } from "lucide-react"
import { Button } from "./ui/button"

const SuggestionChips = ({ onSuggestionClick }) => {
  const [hoveredChip, setHoveredChip] = useState(null)

  // الاقتراحات مع الأيقونات والألوان
  const suggestions = [
    {
      icon: ImageIcon,
      text: "تعديل الصورة",
      prompt: "كيف يمكنني تعديل الصور باستخدام الذكاء الاصطناعي؟",
      color: "#ff6b6b",
      category: "إبداعي",
    },
    {
      icon: FileText,
      text: "آخر الأخبار",
      prompt: "ما هي آخر الأخبار والتطورات المهمة؟",
      color: "#4ecdc4",
      category: "أخبار",
    },
    {
      icon: Clock,
      text: "التقارير الفنية",
      prompt: "أريد تقريراً فنياً مفصلاً حول موضوع معين",
      color: "#45b7d1",
      category: "تقني",
    },
    {
      icon: Code,
      text: "البرمجة",
      prompt: "ساعدني في كتابة وتطوير الكود البرمجي",
      color: "#96ceb4",
      category: "برمجة",
    },
    {
      icon: Lightbulb,
      text: "أفكار إبداعية",
      prompt: "أحتاج إلى أفكار إبداعية ومبتكرة لمشروعي",
      color: "#feca57",
      category: "إبداع",
    },
    {
      icon: Calculator,
      text: "حسابات رياضية",
      prompt: "ساعدني في حل المسائل الرياضية والحسابات",
      color: "#ff9ff3",
      category: "رياضيات",
    },
    {
      icon: Globe,
      text: "معلومات عامة",
      prompt: "أريد معلومات عامة حول موضوع معين",
      color: "#54a0ff",
      category: "عام",
    },
    {
      icon: Music,
      text: "الموسيقى والفن",
      prompt: "تحدث معي عن الموسيقى والفنون",
      color: "#5f27cd",
      category: "فن",
    },
    "ما هي أحدث التطورات في الذكاء الاصطناعي؟",
    "اشرح لي مفهوم التعلم العميق",
    "كيف يمكنني تحسين مهاراتي في البرمجة؟",
    "ما هي أفضل الممارسات في تطوير الويب؟",
  ]

  const handleChipClick = (suggestion) => {
    if (typeof suggestion === "object") {
      onSuggestionClick(suggestion.prompt)
    } else {
      onSuggestionClick(suggestion)
    }
  }

  return (
    <div className="suggestion-chips-container">
      <div className="chips-header">
        <h3 className="chips-title">اقتراحات لبدء المحادثة</h3>
        <p className="chips-subtitle">اختر موضوعاً أو اكتب سؤالك الخاص</p>
      </div>

      <div className="suggestion-chips">
        {suggestions.map((suggestion, index) => (
          <React.Fragment key={index}>
            {typeof suggestion === "object" ? (
              <button
                className={`suggestion-chip ${hoveredChip === index ? "hovered" : ""}`}
                onClick={() => handleChipClick(suggestion)}
                onMouseEnter={() => setHoveredChip(index)}
                onMouseLeave={() => setHoveredChip(null)}
                style={{
                  "--chip-color": suggestion.color,
                  "--animation-delay": `${index * 0.1}s`,
                }}
              >
                <div className="chip-background"></div>
                <div className="chip-content">
                  <div className="chip-icon-wrapper">
                    <suggestion.icon size={20} className="chip-icon" />
                  </div>
                  <div className="chip-text-wrapper">
                    <span className="chip-text">{suggestion.text}</span>
                    <span className="chip-category">{suggestion.category}</span>
                  </div>
                </div>
                <div className="chip-hover-effect"></div>
              </button>
            ) : (
              <Button
                variant="outline"
                onClick={() => handleChipClick(suggestion)}
                className="suggestion-chip text-sm px-4 py-2 rounded-full border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                {suggestion}
              </Button>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* مؤشر التمرير للجوال */}
      <div className="scroll-indicator">
        <div className="scroll-dots">
          {Array.from({ length: Math.ceil(suggestions.length / 2) }).map((_, index) => (
            <div key={index} className="scroll-dot"></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SuggestionChips
