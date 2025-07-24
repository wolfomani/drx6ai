export default function FixedComponent() {
  "use client"

  import type React from "react"

  import { useState, useEffect, useRef } from "react"
  import { MessageInput } from "./message-input"
  import { MessageList } from "./message-list"
  import { ModelSelector } from "./model-selector"
  import { ModelStatusIndicator } from "./model-status-indicator"
  import { AiThinkingIndicator } from "./ai-thinking-indicator"
  import { ReasoningDisplay } from "./reasoning-display"
  import { SuggestionChips } from "./suggestion-chips"
  import { useChat } from "@/hooks/use-chat"
  import { Button } from "@/components/ui/button"
  import { ArrowLeft, Plus } from "lucide-react"
  import { useRouter, useParams } from "next/navigation"
  import { useQueryClient } from "@tanstack/react-query"
  import { useAudioRecording } from "@/hooks/use-audio-recording"
  import { toast } from "@/components/ui/use-toast"

  export function CognitiveChatInterface() {
    const router = useRouter()
    const params = useParams()
    const conversationId = params.conversationId as string
    const queryClient = useQueryClient()

    const {
      messages,
      input,
      handleInputChange,
      handleSubmit,
      isLoading,
      error,
      thinkingProcess,
      selectedModel,
      setSelectedModel,
      regenerateResponse,
      append,
      stop,
    } = useChat({
      conversationId: conversationId === "new" ? undefined : conversationId,
      onFinish: (message) => {
        if (conversationId === "new" && message.conversationId) {
          router.replace(`/chat/${message.conversationId}`)
          queryClient.invalidateQueries({ queryKey: ["conversations"] })
        }
      },
    })

    const { isRecording, startRecording, stopRecording, audioBlob, audioURL, resetRecording } = useAudioRecording()

    const [showReasoning, setShowReasoning] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
      }
    }, [messages])

    useEffect(() => {
      if (error) {
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        })
      }
    }, [error])

    useEffect(() => {
      if (audioBlob) {
        // Here you would typically send the audioBlob to your API for transcription
        // For now, we'll just log it and reset
        console.log("Audio recorded:", audioBlob)
        // You might want to add a loading state here while transcription happens
        append({ role: "user", content: "Transcribing audio..." }) // Placeholder
        // In a real app, you'd send audioBlob to an API, get text, then append the text message
        // For demonstration, let's simulate a transcription result
        setTimeout(() => {
          append({ role: "user", content: `(Audio transcription: "This is a simulated transcription of your audio.")` })
          resetRecording()
        }, 2000)
      }
    }, [audioBlob, append, resetRecording])

    const handleNewChat = () => {
      router.push("/chat/new")
    }

    const handleRegenerate = () => {
      if (messages.length > 0) {
        regenerateResponse(messages[messages.length - 1])
      }
    }

    const handleStop = () => {
      stop()
    }

    const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      handleSubmit(e)
    }

    const handleSuggestionClick = (suggestion: string) => {
      append({ role: "user", content: suggestion })
    }

    return (
      <div className="flex flex-col h-full bg-dark-bg text-text-primary">
        <header className="flex items-center justify-between p-4 border-b border-border-dark">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => router.push("/")} className="md:hidden">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">
              {conversationId === "new" ? "New Chat" : `Chat ${conversationId.substring(0, 8)}...`}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <ModelSelector selectedModel={selectedModel} onSelectModel={setSelectedModel} />
            <Button variant="ghost" size="icon" onClick={handleNewChat} aria-label="New Chat">
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 space-y-4">
          <MessageList messages={messages} />
          <div ref={messagesEndRef} />
        </main>

        <footer className="p-4 border-t border-border-dark bg-dark-surface">
          <div className="flex items-center justify-between mb-2">
            <AiThinkingIndicator isThinking={isLoading} />
            <ModelStatusIndicator modelName={selectedModel} />
          </div>

          {thinkingProcess && (
            <ReasoningDisplay
              thinkingProcess={thinkingProcess}
              showReasoning={showReasoning}
              onToggleShowReasoning={() => setShowReasoning(!showReasoning)}
            />
          )}

          <SuggestionChips onSelectSuggestion={handleSuggestionClick} />

          <MessageInput
            input={input}
            handleInputChange={handleInputChange}
            handleSend={handleSend}
            handleRegenerate={handleRegenerate}
            handleStop={handleStop}
            isLoading={isLoading}
            isRecording={isRecording}
            startRecording={startRecording}
            stopRecording={stopRecording}
          />
        </footer>
      </div>
    )
  }
}
