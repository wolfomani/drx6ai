import { useState, useCallback } from 'react'

export interface Message {
  id: string
  content: string
  role: 'user' | 'assistant' | 'system'
  timestamp: Date
}

export interface ChatState {
  messages: Message[]
  isLoading: boolean
  error: string | null
}

export function useChat() {
  const [state, setState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null
  })

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date()
    }

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null
    }))

    try {
      // Simulate API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Echo: ${content}`,
        role: 'assistant',
        timestamp: new Date()
      }

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false
      }))
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An error occurred'
      }))
    }
  }, [])

  const clearMessages = useCallback(() => {
    setState({
      messages: [],
      isLoading: false,
      error: null
    })
  }, [])

  return {
    ...state,
    sendMessage,
    clearMessages
  }
}
