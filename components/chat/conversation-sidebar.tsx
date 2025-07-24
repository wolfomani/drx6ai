"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MessageSquare, Plus, Trash2, Clock, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

interface Conversation {
  id: number;
  title: string;
  model: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ConversationSidebarProps {
  currentConversationId?: number;
  onConversationSelect: (id: number) => void;
  onNewConversation: () => void;
  onClose?: () => void;
}

export default function ConversationSidebar({ 
  currentConversationId,
  onConversationSelect,
  onNewConversation,
  onClose
}: ConversationSidebarProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: conversations = [] } = useQuery<Conversation[]>({
    queryKey: ["/api/conversations"],
    queryFn: async () => {
      const response = await fetch("/api/conversations");
      if (!response.ok) throw new Error("Failed to fetch conversations");
      return response.json();
    },
  });

  const deleteConversationMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/conversations/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error("Failed to delete conversation");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/conversations"] });
      toast({
        title: "تم الحذف",
        description: "تم حذف المحادثة بنجاح",
      });
    },
    onError: () => {
      toast({
        title: "خطأ",
        description: "فشل في حذف المحادثة",
        variant: "destructive",
      });
    },
  });

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleDateString("ar-SA", {
      day: "numeric",
      month: "short",
    });
  };

  const handleDeleteConversation = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    deleteConversationMutation.mutate(id);
  };

  return (
    <div className="w-80 bg-gray-900 border-r border-gray-800 h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-white">المحادثات</h2>
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
        
        <Button
          onClick={onNewConversation}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="w-4 h-4 ml-2" />
          محادثة جديدة
        </Button>
      </div>

      {/* Conversations List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => {
                onConversationSelect(conversation.id);
                onClose?.();
              }}
              className={`p-3 rounded-lg cursor-pointer transition-all duration-200 mb-2 group ${
                currentConversationId === conversation.id
                  ? 'bg-blue-600/20 border border-blue-500/30'
                  : 'hover:bg-gray-800'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <h3 className="text-sm font-medium text-white truncate">
                      {conversation.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-3 h-3 text-gray-500" />
                    <span className="text-xs text-gray-500">
                      {formatTime(conversation.updatedAt)}
                    </span>
                    <span className="text-xs bg-gray-800 px-2 py-1 rounded-full text-gray-300">
                      {conversation.model}
                    </span>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => handleDeleteConversation(e, conversation.id)}
                  className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 w-6 h-6 p-0"
                  disabled={deleteConversationMutation.isPending}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
          
          {conversations.length === 0 && (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">لا توجد محادثات بعد</p>
              <p className="text-xs text-gray-600 mt-1">ابدأ محادثة جديدة للبدء</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
