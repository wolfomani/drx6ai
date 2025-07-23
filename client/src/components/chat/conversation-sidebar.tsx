import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MessageSquare, Plus, Trash2, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Conversation } from "@shared/schema";

interface ConversationSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  currentConversationId?: number;
  onConversationSelect: (id: number) => void;
  onNewConversation: () => void;
}

export default function ConversationSidebar({ 
  isCollapsed, 
  onToggle, 
  currentConversationId,
  onConversationSelect,
  onNewConversation 
}: ConversationSidebarProps) {
  const { data: conversations = [] } = useQuery<Conversation[]>({
    queryKey: ["/api/conversations"],
  });

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleDateString("ar-SA", {
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div className={`bg-dark-surface border-r border-border-dark transition-all duration-300 ${
      isCollapsed ? 'w-12' : 'w-80'
    }`}>
      
      {/* Header */}
      <div className="p-4 border-b border-border-dark">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h2 className="text-lg font-semibold text-text-primary">المحادثات</h2>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-text-secondary hover:text-text-primary"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
        
        {!isCollapsed && (
          <Button
            onClick={onNewConversation}
            className="w-full mt-3 bg-dr-blue hover:bg-blue-600 text-white"
          >
            <Plus className="w-4 h-4 ml-2" />
            محادثة جديدة
          </Button>
        )}
      </div>

      {/* Conversations List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => onConversationSelect(conversation.id)}
              className={`p-3 rounded-lg cursor-pointer transition-all duration-200 mb-2 group ${
                currentConversationId === conversation.id
                  ? 'bg-dr-blue/20 border border-dr-blue/30'
                  : 'hover:bg-dark-surface-hover'
              }`}
            >
              {isCollapsed ? (
                <div className="flex justify-center">
                  <MessageSquare className="w-5 h-5 text-text-secondary" />
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-text-secondary flex-shrink-0" />
                      <h3 className="text-sm font-medium text-text-primary truncate">
                        {conversation.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-3 h-3 text-text-secondary" />
                      <span className="text-xs text-text-secondary">
                        {formatTime(conversation.updatedAt)}
                      </span>
                      <span className="text-xs bg-dark-surface-hover px-2 py-1 rounded-full">
                        {conversation.model}
                      </span>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 w-6 h-6 p-0"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
          ))}
          
          {conversations.length === 0 && !isCollapsed && (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-text-secondary mx-auto mb-3" />
              <p className="text-text-secondary text-sm">لا توجد محادثات بعد</p>
              <p className="text-xs text-text-secondary mt-1">ابدأ محادثة جديدة للبدء</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
