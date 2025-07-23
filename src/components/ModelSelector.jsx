"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Separator } from "./ui/separator"
import { Settings, ChevronDown } from "lucide-react"

const ModelSelector = ({ selectedModel, onModelChange, onSettingsOpen }) => {
  const [isOpen, setIsOpen] = useState(false)

  const models = [
    { id: "deepseek", name: "DeepSeek", provider: "DeepSeek" },
    { id: "groq", name: "Groq Qwen", provider: "Groq" },
    { id: "together", name: "DeepSeek V3", provider: "Together" },
    { id: "gemini", name: "Gemini", provider: "Google" },
  ]

  const currentModel = models.find((m) => m.id === selectedModel) || models[0]

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 min-w-[140px] justify-between"
        >
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium">{currentModel.name}</span>
            <span className="text-xs text-muted-foreground">{currentModel.provider}</span>
          </div>
          <ChevronDown className="h-4 w-4" />
        </Button>

        <Button variant="outline" size="icon" onClick={onSettingsOpen} className="h-10 w-10 bg-transparent">
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Select AI Model</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {models.map((model) => (
              <div key={model.id}>
                <Button
                  variant={selectedModel === model.id ? "default" : "ghost"}
                  className="w-full justify-start h-auto p-4"
                  onClick={() => {
                    onModelChange(model.id)
                    setIsOpen(false)
                  }}
                >
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{model.name}</span>
                    <span className="text-sm text-muted-foreground">{model.provider}</span>
                  </div>
                </Button>
                {model.id !== models[models.length - 1].id && <Separator className="mt-2" />}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ModelSelector
