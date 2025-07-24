"use client";

import { Image, Newspaper, Code, Calculator, Lightbulb, GraduationCap, TrendingUp, Languages } from 'lucide-react';

interface SuggestionChip {
  icon: React.ComponentType<any>;
  text: string;
  prompt: string;
  color: string;
}

const suggestionChips: SuggestionChip[] = [
  {
    icon: Image,
    text: "تعديل الصور",
    prompt: "كيف يمكنني تعديل الصور باستخدام الذكاء الاصطناعي؟",
    color: "blue"
  },
  {
    icon: Newspaper,
    text: "الأخبار",
    prompt: "ما هي آخر الأخبار التقنية المهمة؟",
    color: "red"
  },
  {
    icon: Code,
    text: "البرمجة",
    prompt: "ساعدني في تعلم البرمجة من البداية",
    color: "green"
  },
  {
    icon: Calculator,
    text: "الرياضيات",
    prompt: "اشرح لي مفهوماً معقداً في الرياضيات",
    color: "purple"
  },
  {
    icon: Lightbulb,
    text: "الإبداع",
    prompt: "أعطني أفكار إبداعية لمشروع جديد",
    color: "yellow"
  },
  {
    icon: GraduationCap,
    text: "التعلم",
    prompt: "اقترح خطة تعليمية لمهارة جديدة",
    color: "pink"
  },
  {
    icon: TrendingUp,
    text: "التحليل",
    prompt: "حلل هذه البيانات واستخرج الأنماط",
    color: "teal"
  },
  {
    icon: Languages,
    text: "الترجمة",
    prompt: "ترجم هذا النص وحسن صياغته",
    color: "orange"
  }
];

const getColorClasses = (color: string) => {
  const colorMap = {
    blue: "bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border-blue-500/30",
    red: "bg-red-500/20 text-red-300 hover:bg-red-500/30 border-red-500/30",
    green: "bg-green-500/20 text-green-300 hover:bg-green-500/30 border-green-500/30",
    purple: "bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 border-purple-500/30",
    yellow: "bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30 border-yellow-500/30",
    pink: "bg-pink-500/20 text-pink-300 hover:bg-pink-500/30 border-pink-500/30",
    teal: "bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 border-teal-500/30",
    orange: "bg-orange-500/20 text-orange-300 hover:bg-orange-500/30 border-orange-500/30",
  };
  return colorMap[color as keyof typeof colorMap] || colorMap.blue;
};

interface SuggestionChipsProps {
  onSuggestionClick: (prompt: string) => void;
}

export default function SuggestionChips({ onSuggestionClick }: SuggestionChipsProps) {
  return (
    <div className="p-4 border-b border-gray-800 bg-gray-900/50">
      <div className="flex flex-wrap gap-2 justify-center">
        {suggestionChips.map((chip, index) => {
          const Icon = chip.icon;
          return (
            <button
              key={index}
              onClick={() => onSuggestionClick(chip.prompt)}
              className={`px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105 border ${getColorClasses(chip.color)}`}
            >
              <Icon className="w-3 h-3 ml-1 inline" />
              {chip.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}
