"use client"

import type React from "react"

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Send, Mic, StopCircle, RotateCcw } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface MessageInputProps {
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleSend: (e: React.FormEvent<HTMLFormElement>) => void
  handleRegenerate: () => void
  handleStop: () => void
  isLoading: boolean
  isRecording: boolean
  startRecording: () => void
  stopRecording: () => void
}

export function MessageInput({
  input,
  handleInputChange,
  handleSend,
  handleRegenerate,
  handleStop,
  isLoading,
  isRecording,
  startRecording,
  stopRecording,
}: MessageInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (!isLoading && input.trim()) {
        handleSend(e as unknown as React.FormEvent<HTMLFormElement>)
      }
    }
  }

  return (
    <TooltipProvider>
      <form onSubmit={handleSend} className="relative flex items-end gap-2">
        <Textarea
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message or record audio..."
          rows={1}
          className="min-h-[48px] rounded-lg resize-none bg-dark-surface border border-border-dark text-text-primary shadow-sm pr-16 focus-visible:ring-dr-blue"
        />
        <div className="absolute bottom-2 right-2 flex gap-1">
          {isLoading ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  size="icon"
                  className="h-9 w-9 bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  onClick={handleStop}
                  aria-label="Stop generation"
                >
                  <StopCircle className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Stop Generating</TooltipContent>
            </Tooltip>
          ) : (
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    size="icon"
                    className={cn(
                      "h-9 w-9",
                      isRecording ? "bg-red-500 hover:bg-red-600" : "bg-dr-blue text-white hover:bg-dr-blue/90",
                    )}
                    onClick={isRecording ? stopRecording : startRecording}
                    aria-label={isRecording ? "Stop recording" : "Start audio recording"}
                  >
                    {isRecording ? <StopCircle className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{isRecording ? "Stop Recording" : "Record Audio"}</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!input.trim()}
                    className="h-9 w-9 bg-dr-blue text-white hover:bg-dr-blue/90"
                    aria-label="Send message"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Send Message</TooltipContent>
              </Tooltip>
            </>
          )}
        </div>
        {!isLoading && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="absolute -top-10 right-0 h-9 w-9 text-text-secondary hover:bg-dark-surface-hover"
                onClick={handleRegenerate}
                aria-label="Regenerate response"
              >
                <RotateCcw className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Regenerate Response</TooltipContent>
          </Tooltip>
        )}
      </form>
    </TooltipProvider>
  )
}
