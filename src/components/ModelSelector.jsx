"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Label } from "./ui/label"
import { ChevronDown, Bot } from "lucide-react"

const models = [
  { id: "deepseek", name: "DeepSeek", description: "Advanced reasoning model" },
  { id: "groq", name: "Groq", description: "Fast inference model" },
  { id: "together", name: "Together AI", description: "Collaborative AI model" },
  { id: "gemini", name: "Gemini", description: "Google's multimodal AI" },
]

export default function ModelSelector({ selectedModel, onModelChange }) {
  const [isOpen, setIsOpen] = useState(false)

  const currentModel = models.find((m) => m.id === selectedModel) || models[0]

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 min-w-[150px] justify-between"
      >
        <div className="flex items-center gap-2">
          <Bot className="h-4 w-4" />
          <span>{currentModel.name}</span>
        </div>
        <ChevronDown className="h-4 w-4" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>اختر نموذج الذكاء الاصطناعي</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {models.map((model) => (
              <div
                key={model.id}
                className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedModel === model.id ? "border-primary bg-primary/5" : "border-border hover:bg-accent"
                }`}
                onClick={() => {
                  onModelChange(model.id)
                  setIsOpen(false)
                }}
              >
                <div className="flex-1">
                  <Label className="font-medium cursor-pointer">{model.name}</Label>
                  <p className="text-sm text-muted-foreground">{model.description}</p>
                </div>
                {selectedModel === model.id && <div className="h-2 w-2 rounded-full bg-primary" />}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
