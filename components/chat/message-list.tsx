"use client";

import { useEffect, useRef } from "react";
import { Copy, Share, User, Bot } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  conversationId: number;
  role: 'user' | 'assistant';
  content: string;
  attachments: any[];
  createdAt: Date;
}

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  selectedModel?: any;
}

export default function MessageList({ messages, isLoading, selectedModel }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const copyMessage = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      toast({
        title: "تم النسخ",
        description: "تم نسخ الرسالة إلى الحافظة",
      });
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في نسخ الرسالة",
        variant: "destructive",
      });
    }
  };

  const shareMessage = async (content: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Dr.X AI Chat",
          text: content,
        });
      } catch (error) {
        copyMessage(content);
      }
    } else {
      copyMessage(content);
    }
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("ar-SA", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      
      {/* Welcome Message */}
      {messages.length === 0 && !isLoading && (
        <div className="flex justify-center mb-8">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center font-bold text-white text-xl shadow-2xl mx-auto mb-4">
              Dr.X
            </div>
            <h2 className="text-xl font-semibold mb-2 text-white">مرحباً بك في Dr.X AI</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              أنا مساعدك الذكي الشخصي. يمكنني مساعدتك في الكتابة، التحليل، البرمجة، والإجابة على أسئلتك باللغة العربية والإنجليزية.
            </p>
          </div>
        </div>
      )}

      {/* Messages */}
      {messages.map((message) => (
        <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          
          {/* User Message */}
          {message.role === 'user' ? (
            <>
              <div className="max-w-xs lg:max-w-md">
                <div className="bg-blue-600 text-white px-4 py-3 rounded-2xl rounded-br-md shadow-lg">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                </div>
                <div className="text-xs text-gray-500 mt-1 text-left">
                  {formatTime(message.createdAt)}
                </div>
              </div>
              <div className="w-8 h-8 bg-gray-600 rounded-full mr-2 flex-shrink-0 flex items-center justify-center text-white">
                <User className="w-4 h-4" />
              </div>
            </>
          ) : (
            /* AI Message */
            <>
              <div className="w-8 h-8 bg-blue-600 rounded-full ml-2 flex-shrink-0 flex items-center justify-center text-white">
                <Bot className="w-4 h-4" />
              </div>
              <div className="max-w-xs lg:max-w-lg">
                <div className="bg-gray-800 border border-gray-700 px-4 py-3 rounded-2xl rounded-bl-md shadow-lg">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap text-white">
                    {message.content}
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                  <span>{formatTime(message.createdAt)}</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyMessage(message.content)}
                      className="h-6 w-6 p-0 hover:text-blue-400 hover:bg-blue-500/10"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => shareMessage(message.content)}
                      className="h-6 w-6 p-0 hover:text-blue-400 hover:bg-blue-500/10"
                    >
                      <Share className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      ))}

      {/* Typing Indicator */}
      {isLoading && (
        <div className="flex justify-start">
          <div className="w-8 h-8 bg-blue-600 rounded-full ml-2 flex-shrink-0 flex items-center justify-center text-white">
            <Bot className="w-4 h-4" />
          </div>
          <div className="max-w-xs lg:max-w-md">
            <div className="bg-gray-800 border border-gray-700 px-4 py-3 rounded-2xl rounded-bl-md shadow-lg">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-1">يكتب...</div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
