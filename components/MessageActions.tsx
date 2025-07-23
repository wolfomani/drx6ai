"use client"
import { CopyIcon, ThumbUpIcon, ThumbDownIcon } from "./icons"
import { Button } from "../components/ui/button"

interface MessageActionsProps {
  chatId: string
  message: any
  vote?: any
  isLoading: boolean
}

export function MessageActions({ chatId, message, vote, isLoading }: MessageActionsProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content)
      console.log("تم نسخ النص")
    } catch (error) {
      console.error("فشل في نسخ النص:", error)
    }
  }

  const handleUpvote = () => {
    console.log("إعجاب بالرسالة:", message.id)
  }

  const handleDownvote = () => {
    console.log("عدم إعجاب بالرسالة:", message.id)
  }

  if (isLoading || message.role === "user") return null

  return (
    <div className="flex flex-row gap-2 mt-2">
      <Button
        variant="ghost"
        size="sm"
        className="h-8 px-2 text-muted-foreground hover:text-foreground"
        onClick={handleCopy}
      >
        <CopyIcon size={14} />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="h-8 px-2 text-muted-foreground hover:text-foreground"
        onClick={handleUpvote}
        disabled={vote?.isUpvoted}
      >
        <ThumbUpIcon size={14} />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="h-8 px-2 text-muted-foreground hover:text-foreground"
        onClick={handleDownvote}
        disabled={vote && !vote.isUpvoted}
      >
        <ThumbDownIcon size={14} />
      </Button>
    </div>
  )
}
