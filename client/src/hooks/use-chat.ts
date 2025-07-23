import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Message, ChatRequest, ChatResponse } from "@shared/schema";

export function useChat(conversationId?: number, selectedModel: string = "deepseek") {
  const [currentConversationId, setCurrentConversationId] = useState<number | undefined>(conversationId);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch messages for current conversation
  const { data: messages = [], isLoading: messagesLoading } = useQuery<Message[]>({
    queryKey: ["/api/conversations", currentConversationId, "messages"],
    enabled: !!currentConversationId,
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (data: ChatRequest): Promise<ChatResponse> => {
      const response = await apiRequest("POST", "/api/chat", data);
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
