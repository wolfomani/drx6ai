"use client"

import { useState } from "react"
import { ChevronDown, Bot, Zap, Search, Brain } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

const models = [
  {
    id: "grok-3",
    name: "Grok-3",
    description: "النموذج الأحدث والأكثر تطوراً",
    icon: Bot,
    color: "text-blue-500",
  },
  {
    id: "deepseek-reasoner",
    name: "DeepSeek Reasoner",
    description: "متخصص في التفكير المنطقي",
    icon: Brain,
    color: "text-purple-500",
  },
  {
    id: "qwen-qwq-32b",
    name: "Qwen QwQ 32B",
    description: "نموذج قوي للمحادثات المعقدة",
    icon: Zap,
    color: "text-orange-500",
  },
  {
    id: "deepseek-v3",
    name: "DeepSeek V3",
    description: "نموذج متقدم للبحث والتحليل",
    icon: Search,
    color: "text-green-500",
  },
]

export const ModelSelector = ({ selectedModel, onModelChange }) => {
  const [isOpen, setIsOpen] = useState(false)

  const currentModel = models.find((model) => model.id === selectedModel) || models[0]
  const Icon = currentModel.icon

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 min-w-[200px] justify-between bg-transparent">
          <div className="flex items-center gap-2">
            <Icon className={`w-4 h-4 ${currentModel.color}`} />
            <span className="font-medium">{currentModel.name}</span>
          </div>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[300px]">
        {models.map((model) => {
          const ModelIcon = model.icon
          return (
            <DropdownMenuItem
              key={model.id}
              onClick={() => {
                onModelChange(model.id)
                setIsOpen(false)
              }}
              className="flex items-start gap-3 p-3 cursor-pointer"
            >
              <ModelIcon className={`w-5 h-5 mt-0.5 ${model.color}`} />
              <div className="flex-1">
                <div className="font-medium">{model.name}</div>
                <div className="text-sm text-muted-foreground">{model.description}</div>
              </div>
              {selectedModel === model.id && <div className="w-2 h-2 bg-primary rounded-full mt-2" />}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
