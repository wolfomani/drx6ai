export default function FixedComponent() {
  "use client"
  import { Button } from "@/components/ui/button"
  import { ChevronDown, ChevronUp, Brain } from "lucide-react"
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
  import { Separator } from "@/components/ui/separator"
  import { cn } from "@/lib/utils"
  import ReactMarkdown from "react-markdown"

  interface ReasoningDisplayProps {
    thinkingProcess: string
    showReasoning: boolean
    onToggleShowReasoning: () => void
  }

  export function ReasoningDisplay({ thinkingProcess, showReasoning, onToggleShowReasoning }: ReasoningDisplayProps) {
    return (
      <Card className="bg-dark-surface border-border-dark text-text-primary mb-4">
        <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Brain className="h-5 w-5 text-dr-blue" />
            AI Thinking Process
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleShowReasoning}
            aria-expanded={showReasoning}
            aria-controls="reasoning-content"
            className="text-text-secondary hover:bg-dark-surface-hover"
          >
            {showReasoning ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            <span className="sr-only">{showReasoning ? "Collapse" : "Expand"} reasoning</span>
          </Button>
        </CardHeader>
        <Separator className="bg-border-dark" />
        <div
          id="reasoning-content"
          className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            showReasoning ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <CardContent className="p-4 pt-2">
            <ReactMarkdown className="prose prose-invert max-w-none text-sm text-text-secondary">
              {thinkingProcess}
            </ReactMarkdown>
          </CardContent>
        </div>
      </Card>
    )
  }
}
