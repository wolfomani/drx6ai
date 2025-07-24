"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface SuggestionChipsProps {
  onSelectSuggestion: (suggestion: string) => void
}

const defaultSuggestions = [
  "What's the weather like today?",
  "Tell me a fun fact.",
  "Explain quantum physics simply.",
  "Write a short poem about nature.",
  "Summarize the latest news.",
]

export function SuggestionChips({ onSelectSuggestion }: SuggestionChipsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])

  useEffect(() => {
    // In a real application, you might fetch dynamic suggestions based on context
    // For now, we'll use static ones.
    setSuggestions(defaultSuggestions)
  }, [])

  if (suggestions.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {suggestions.map((suggestion, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          className={cn(
            "rounded-full px-4 py-1 text-sm",
            "bg-dark-surface-hover border-border-dark text-text-secondary hover:bg-dark-surface-hover/80",
          )}
          onClick={() => onSelectSuggestion(suggestion)}
        >
          {suggestion}
        </Button>
      ))}
    </div>
  )
}
