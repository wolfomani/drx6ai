"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Send, Paperclip } from "lucide-react"

export default function ChatInput({ onSendMessage, disabled }) {
  const [message, setMessage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      onSendMessage(message.trim())
      setMessage("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4 border-t">
      <Button type="button" variant="outline" size="icon" className="shrink-0 bg-transparent" disabled={disabled}>
        <Paperclip className="h-4 w-4" />
      </Button>

      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="اكتب رسالتك هنا..."
        disabled={disabled}
        className="flex-1"
        dir="rtl"
      />

      <Button type="submit" size="icon" disabled={!message.trim() || disabled} className="shrink-0">
        <Send className="h-4 w-4" />
      </Button>
    </form>
  )
}
