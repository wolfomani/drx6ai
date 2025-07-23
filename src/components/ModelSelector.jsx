"use client"
import { Select } from "./ui/select"

export function ModelSelector({ selectedModel, onModelChange }) {
  const models = [
    { id: "deepseek", name: "DeepSeek", description: "نموذج متقدم للمحادثة والتفكير العميق" },
    { id: "groq", name: "Groq", description: "نموذج سريع ودقيق للاستجابة الفورية" },
    { id: "together", name: "Together", description: "نموذج تعاوني للمهام المعقدة" },
    { id: "gemini", name: "Gemini", description: "نموذج Google المتقدم متعدد الوسائط" },
  ]

  return (
    <div className="flex justify-center mb-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 min-w-[300px]">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">اختر النموذج:</label>
        <Select value={selectedModel} onChange={(e) => onModelChange(e.target.value)} className="w-full">
          {models.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name} - {model.description}
            </option>
          ))}
        </Select>
      </div>
    </div>
  )
}
