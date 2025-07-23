"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Send } from "lucide-react"

export function ChatInput({ onSendMessage, disabled }) {
  const [message, setMessage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      onSendMessage(message.trim())
      setMessage("")
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="اكتب رسالتك هنا..."
          disabled={disabled}
          className="flex-1"
          dir="rtl"
        />
        <Button type="submit" disabled={disabled || !message.trim()}>
          <Send size={20} />
        </Button>
      </form>
    </div>
  )
}
