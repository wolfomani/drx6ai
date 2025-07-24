"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import ModelSelector from "./model-selector";
import MessageList from "./message-list";
import MessageInput from "./message-input";
import SuggestionChips from "./suggestion-chips";
import ReasoningDisplay from "./reasoning-display";
import ModelStatusIndicator from "./model-status-indicator";
import ConversationSidebar from "./conversation-sidebar";
import AIThinkingIndicator from "./ai-thinking-indicator";
import LoadingOverlay from "@/components/ui/loading-overlay";
import { useChat } from "@/hooks/use-chat";
import { Brain, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ReasoningStep {
  id: string;
  type: 'thinking' | 'analysis' | 'conclusion';
  content: string;
  timestamp: Date;
  confidence?: number;
}

interface CognitiveChatInterfaceProps {
  conversationId?: number;
}

export default function CognitiveChatInterface({ conversationId }: CognitiveChatInterfaceProps) {
  const router = useRouter();
  const [selectedModel, setSelectedModel] = useState("deepseek");
  const [isModelSelectorOpen, setIsModelSelectorOpen] = useState(false);
  const [reasoningSteps, setReasoningSteps] = useState<ReasoningStep[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [responseTime, setResponseTime] = useState<number>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [thinkingStage, setThinkingStage] = useState<'analyzing' | 'processing' | 'generating' | 'complete'>('analyzing');

  const {
    messages,
    isLoading,
    sendMessage,
    currentConversationId,
  } = useChat(conversationId, selectedModel);

  const { data: models = [] } = useQuery({
    queryKey: ["/api/models"],
    queryFn: async () => {
      const response = await fetch("/api/models");
      if (!response.ok) throw new Error("Failed to fetch models");
      return response.json();
    },
  });

  // Simulate reasoning steps for demonstration
  useEffect(() => {
    if (isLoading && ['deepseek', 'gemini', 'together'].includes(selectedModel)) {
      setIsThinking(true);
      setReasoningSteps([]);
      setThinkingStage('analyzing');
      
      const steps: ReasoningStep[] = [
        { 
          id: '1', 
          type: 'thinking', 
          content: 'أحلل السؤال وأفهم السياق المطلوب باستخدام تقنيات التفكير المتقدم...', 
          timestamp: new Date(), 
          confidence: 0.85 
        },
        { 
          id: '2', 
          type: 'analysis', 
          content: 'أبحث في قاعدة المعرفة والذاكرة طويلة المدى للعثور على المعلومات الأكثر دقة...', 
          timestamp: new Date(), 
          confidence: 0.92 
        },
        { 
          id: '3', 
          type: 'conclusion', 
          content: 'أصيغ الإجابة بطريقة واضحة ومنطقية مع التأكد من جودة المحتوى...', 
          timestamp: new Date(), 
          confidence: 0.98 
        }
      ];

      const stages: Array<'analyzing' | 'processing' | 'generating'> = ['analyzing', 'processing', 'generating'];
      let currentStep = 0;
      let currentStage = 0;

      const interval = setInterval(() => {
        if (currentStage < stages.length) {
          setThinkingStage(stages[currentStage]);
          currentStage++;
        }
        
        if (currentStep < steps.length) {
          setReasoningSteps(prev => [...prev, steps[currentStep]]);
          currentStep++;
        } else {
          clearInterval(interval);
          setIsThinking(false);
          setThinkingStage('complete');
        }
      }, 1200);

      return () => clearInterval(interval);
    }
  }, [isLoading, selectedModel]);

  const handleSendMessage = async (message: string, attachments?: any[]) => {
    const startTime = Date.now();
    await sendMessage(message, attachments);
    setResponseTime(Date.now() - startTime);
  };

  const handleSuggestionClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const handleNewConversation = () => {
    router.push("/");
  };

  const handleConversationSelect = (id: number) => {
    router.push(`/chat/${id}`);
  };

  const selectedModelData = models.find((model: any) => model.id === selectedModel);

  return (
    <div className="flex h-full bg-gray-950">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Conversation Sidebar */}
      <div className={`${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 fixed lg:relative z-50 transition-transform duration-300`}>
        <ConversationSidebar
          currentConversationId={currentConversationId}
          onConversationSelect={handleConversationSelect}
          onNewConversation={handleNewConversation}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-gray-900 border-b border-gray-800 px-4 py-3 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden text-gray-400 hover:text-white"
              >
                <Menu className="w-5 h-5" />
              </Button>

              {/* Dr.X Logo */}
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg">
                  Dr.X
                </div>
                {isLoading && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                )}
              </div>
              
              <div>
                <h1 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Brain className="w-5 h-5 text-blue-500" />
                  Dr.X AI Chat
                </h1>
                <p className="text-xs text-gray-400">واجهة ذكية مع عرض التفكير الداخلي</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Model Status */}
              {selectedModelData && (
                <ModelStatusIndicator 
                  model={selectedModelData} 
                  isActive={isLoading}
                  responseTime={responseTime}
                />
              )}
              
              {/* Model Selector */}
              <ModelSelector
                models={models}
                selectedModel={selectedModel}
                onModelChange={setSelectedModel}
                isOpen={isModelSelectorOpen}
                onToggle={() => setIsModelSelectorOpen(!isModelSelectorOpen)}
              />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Suggestion Chips */}
          {messages.length === 0 && !isLoading && (
            <SuggestionChips onSuggestionClick={handleSuggestionClick} />
          )}

          {/* AI Thinking Indicator */}
          {isThinking && ['deepseek', 'gemini', 'together'].includes(selectedModel) && (
            <div className="px-4 py-2">
              <AIThinkingIndicator
                stage={thinkingStage}
                message="نموذج التفكير المتقدم يحلل طلبك بعمق..."
                progress={Math.min((reasoningSteps.length / 3) * 100, 100)}
              />
            </div>
          )}

          {/* Reasoning Display */}
          {(reasoningSteps.length > 0 || isThinking) && ['deepseek', 'gemini', 'together'].includes(selectedModel) && (
            <div className="px-4">
              <ReasoningDisplay 
                steps={reasoningSteps} 
                isThinking={isThinking}
                model={selectedModelData?.name || selectedModel}
              />
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-hidden">
            <MessageList 
              messages={messages} 
              isLoading={isLoading}
              selectedModel={selectedModelData}
            />
          </div>
          
          {/* Input Area */}
          <MessageInput 
            onSendMessage={handleSendMessage}
            selectedModel={selectedModelData}
            disabled={isLoading}
          />
        </div>

        {/* Loading Overlay */}
        <LoadingOverlay isVisible={isLoading && !isThinking} />
      </div>
    </div>
  );
}
