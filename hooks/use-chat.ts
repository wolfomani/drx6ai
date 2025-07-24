"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  conversationId: number;
  role: 'user' | 'assistant';
  content: string;
  attachments: any[];
  createdAt: Date;
}

interface ChatRequest {
  message: string;
  conversationId?: number;
  model: string;
  attachments?: any[];
}

interface ChatResponse {
  message: string;
  conversationId: number;
  messageId: number;
}

export function useChat(conversationId?: number, selectedModel: string = "deepseek") {
  const [currentConversationId, setCurrentConversationId] = useState<number | undefined>(conversationId);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch messages for current conversation
  const { data: messages = [], isLoading: messagesLoading } = useQuery<Message[]>({
    queryKey: ["/api/conversations", currentConversationId, "messages"],
    queryFn: async () => {
      if (!currentConversationId) return [];
      const response = await fetch(`/api/conversations/${currentConversationId}/messages`);
      if (!response.ok) throw new Error("Failed to fetch messages");
      return response.json();
    },
    enabled: !!currentConversationId,
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (data: ChatRequest): Promise<ChatResponse> => {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to send message");
      }
      
      return response.json();
    },
    onSuccess: (response) => {
      setCurrentConversationId(response.conversationId);
      // Invalidate and refetch messages
      queryClient.invalidateQueries({
        queryKey: ["/api/conversations", response.conversationId, "messages"],
      });
      // Also invalidate conversations list
      queryClient.invalidateQueries({
        queryKey: ["/api/conversations"],
      });
    },
    onError: (error: Error) => {
      toast({
        title: "خطأ في الإرسال",
        description: error.message || "فشل في إرسال الرسالة",
        variant: "destructive",
      });
    },
  });

  const sendMessage = async (message: string, attachments?: any[]) => {
    if (!message.trim()) return;

    const chatRequest: ChatRequest = {
      message: message.trim(),
      conversationId: currentConversationId,
      model: selectedModel,
      attachments,
    };

    await sendMessageMutation.mutateAsync(chatRequest);
  };

  // Update conversation ID when prop changes
  useEffect(() => {
    setCurrentConversationId(conversationId);
  }, [conversationId]);

  return {
    messages,
    isLoading: messagesLoading || sendMessageMutation.isPending,
    sendMessage,
    currentConversationId,
    error: sendMessageMutation.error,
  };
}
