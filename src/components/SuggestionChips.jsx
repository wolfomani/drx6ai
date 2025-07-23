"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { ImageIcon, FileText, Clock, Code, Lightbulb, Calculator, Globe, Music } from "lucide-react"

export function SuggestionChips({ onSuggestionClick, disabled }) {
  const [hoveredChip, setHoveredChip] = useState(null)

  // الاقتراحات مع الأيقونات والألوان
  const suggestionsWithIcons = [
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
  ]

  const simpleSuggestions = [
    "ما هي أحدث التطورات في الذكاء الاصطناعي؟",
    "اشرح لي مفهوم التعلم الآلي",
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
        {suggestionsWithIcons.map((suggestion, index) => (
          <button
            key={index}
            className={`suggestion-chip ${hoveredChip === index ? "hovered" : ""}`}
            onClick={() => handleChipClick(suggestion)}
            onMouseEnter={() => setHoveredChip(index)}
            onMouseLeave={() => setHoveredChip(null)}
            style={{
              "--chip-color": suggestion.color,
              "--animation-delay": `${index * 0.1}s`,
            }}
            disabled={disabled}
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
        ))}
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {simpleSuggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => handleChipClick(suggestion)}
            disabled={disabled}
            className="text-xs"
          >
            {suggestion}
          </Button>
        ))}
      </div>

      {/* مؤشر التمرير للجوال */}
      <div className="scroll-indicator">
        <div className="scroll-dots">
          {Array.from({ length: Math.ceil(suggestionsWithIcons.length / 2) }).map((_, index) => (
            <div key={index} className="scroll-dot"></div>
          ))}
        </div>
      </div>
    </div>
  )
}
