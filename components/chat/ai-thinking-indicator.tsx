import { cn } from "@/lib/utils"
import { Brain, Loader2 } from "lucide-react"

interface AiThinkingIndicatorProps {
  isThinking: boolean
  className?: string
}

export function AiThinkingIndicator({ isThinking, className }: AiThinkingIndicatorProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-sm text-muted-foreground transition-opacity duration-300",
        isThinking ? "opacity-100" : "opacity-0",
        className,
      )}
    >
      {isThinking ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>AI is thinking...</span>
        </>
      ) : (
        <>
          <Brain className="h-4 w-4" />
          <span>Ready</span>
        </>
      )}
    </div>
  )
}
