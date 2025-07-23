export const DEFAULT_CHAT_MODEL: string = "deepseek"

export interface ChatModel {
  id: string
  name: string
  description: string
  features: string[]
}

export const chatModels: Array<ChatModel> = [
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

// نموذج للتفكير المنطقي (DeepSeek Reasoner)
export const reasoningModel = {
  id: "deepseek-reasoning",
  name: "DeepSeek Reasoning",
  description: "نموذج DeepSeek المتقدم للتفكير المنطقي",
  features: ["تفكير منطقي", "تحليل عميق", "استنتاج"],
}
