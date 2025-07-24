"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { useChat as useVercelChat, type Message } from "ai/react"
import { toast } from "@/components/ui/use-toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface UseChatOptions {
  conversationId?: string
  onFinish?: (message: { conversationId: string | undefined; content: string; role: "assistant" | "user" }) => void
}

export function useChat({ conversationId, onFinish }: UseChatOptions) {
  const queryClient = useQueryClient()
  const [thinkingProcess, setThinkingProcess] = useState("")
  const [currentConversationId, setCurrentConversationId] = useState<string | undefined>(conversationId)

  const createConversationMutation = useMutation({
    mutationFn: async (initialMessage: string) => {
      const response = await fetch("/api/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: initialMessage.substring(0, 50) }), // Use first part of message as title
      })
      if (!response.ok) {
        throw new Error("Failed to create conversation")
      }
      return response.json()
    },
    onSuccess: (data) => {
      setCurrentConversationId(data.id)
      queryClient.invalidateQueries({ queryKey: ["conversations"] })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to create conversation: ${error.message}`,
        variant: "destructive",
      })
    },
  })

  const updateConversationMutation = useMutation({
    mutationFn: async ({ id, title }: { id: string; title: string }) => {
      const response = await fetch(`/api/conversations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      })
      if (!response.ok) {
        throw new Error("Failed to update conversation")
      }
      return response.json()
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update conversation: ${error.message}`,
        variant: "destructive",
      })
    },
  })

  const addMessageMutation = useMutation({
    mutationFn: async ({ conversationId, message }: { conversationId: string; message: Message }) => {
      const response = await fetch(`/api/conversations/${conversationId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
      })
      if (!response.ok) {
        throw new Error("Failed to add message")
      }
      return response.json()
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to save message: ${error.message}`,
        variant: "destructive",
      })
    },
  })

  const { messages, input, handleInputChange, handleSubmit, isLoading, error, append, setMessages, stop } =
    useVercelChat({
      api: "/api/chat",
      id: currentConversationId,
      body: {
        conversationId: currentConversationId,
        model: "grok-1", // Default model, can be changed via selector
      },
      onResponse: (response) => {
        const thinkingProcessHeader = response.headers.get("X-Vercel-AI-Thinking")
        if (thinkingProcessHeader) {
          setThinkingProcess(decodeURIComponent(thinkingProcessHeader))
        } else {
          setThinkingProcess("")
        }
      },
      onFinish: (message) => {
        setThinkingProcess("")
        if (currentConversationId) {
          addMessageMutation.mutate({ conversationId: currentConversationId, message })
          if (messages.length === 0) {
            // If it's the first message, update conversation title
            updateConversationMutation.mutate({ id: currentConversationId, title: message.content.substring(0, 50) })
          }
        }
        onFinish?.({ conversationId: currentConversationId, content: message.content, role: message.role })
      },
      onError: (e) => {
        setThinkingProcess("")
        toast({
          title: "Chat Error",
          description: e.message,
          variant: "destructive",
        })
      },
    })

  const handleCustomSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (!currentConversationId) {
        // If no conversation ID, create one first
        const userMessageContent = input
        await createConversationMutation.mutateAsync(userMessageContent)
        // After creating, the `currentConversationId` state will be updated by onSuccess,
        // and the next render will trigger the actual chat submission via useVercelChat's handleSubmit.
        // For now, we'll manually append the user message and then let the chat hook handle the rest.
        setMessages((prev) => [...prev, { id: "temp-user", role: "user", content: userMessageContent }])
        handleSubmit(e) // Submit the message to the AI
      } else {
        handleSubmit(e)
      }
    },
    [input, currentConversationId, createConversationMutation, handleSubmit, setMessages],
  )

  const regenerateResponse = useCallback(
    async (lastMessage: Message) => {
      if (!currentConversationId) return

      // Remove the last assistant message and thinking process if regenerating
      setMessages((prevMessages) => prevMessages.slice(0, prevMessages.length - 1))
      setThinkingProcess("")

      // Re-send the last user message
      await append(lastMessage)
    },
    [currentConversationId, append, setMessages],
  )

  const selectedModel = "grok-1" // This should come from a state managed by ModelSelector
  const setSelectedModel = (modelId: string) => {
    // In a real app, you'd update the model in the useVercelChat body or re-initialize it
    // For this example, we'll just log it.
    console.log("Selected model:", modelId)
    toast({
      title: "Model Changed",
      description: `Switched to ${modelId}. Note: This example does not dynamically change the model for ongoing chats.`,
    })
  }

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit: handleCustomSubmit,
    isLoading,
    error: error?.message,
    thinkingProcess,
    selectedModel,
    setSelectedModel,
    regenerateResponse,
    append,
    stop,
  }
}
