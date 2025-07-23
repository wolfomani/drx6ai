"use client"

import { useState, useRef } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Send, Paperclip } from "lucide-react"

const ChatInput = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState("")
  const fileInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      onSendMessage(message.trim())
      setMessage("")
    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      // Handle file upload logic here
      console.log("File selected:", file)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4 border-t bg-background">
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => fileInputRef.current?.click()}
        disabled={disabled}
      >
        <Paperclip className="h-4 w-4" />
      </Button>

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileUpload}
        accept="image/*,.pdf,.txt,.doc,.docx"
      />

      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="اكتب رسالتك هنا..."
        disabled={disabled}
        className="flex-1"
        dir="rtl"
      />

      <Button type="submit" disabled={disabled || !message.trim()}>
        <Send className="h-4 w-4" />
      </Button>
    </form>
  )
}

export default ChatInput
