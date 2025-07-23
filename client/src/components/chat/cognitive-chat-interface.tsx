import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
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
import { Brain, Settings, History, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AiModel } from "@shared/schema";

interface ReasoningStep {
  id: string;
  type: 'thinking' | 'analysis' | 'conclusion';
  content: string;
  timestamp: Date;
  confidence?: number;
}

export default function CognitiveChatInterface() {
  const { conversationId } = useParams<{ conversationId?: string }>();
  const [location, setLocation] = useLocation();
  const [selectedModel, setSelectedModel] = useState("deepseek");
  const [isModelSelectorOpen, setIsModelSelectorOpen] = useState(false);
  const [reasoningSteps, setReasoningSteps] = useState<ReasoningStep[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [responseTime, setResponseTime] = useState<number>();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [thinkingStage, setThinkingStage] = useState<'analyzing' | 'processing' | 'generating' | 'complete'>('analyzing');

  const {
    messages,
    isLoading,
    sendMessage,
    currentConversationId,
  } = useChat(conversationId ? parseInt(conversationId) : undefined, selectedModel);

  const { data: models = [] } = useQuery<AiModel[]>({
    queryKey: ["/api/models"],
  });

  // Simulate reasoning steps and thinking stages for demonstration
  useEffect(() => {
    if (isLoading && selectedModel === 'deepseek') {
      setIsThinking(true);
      setReasoningSteps([]);
      setThinkingStage('analyzing');
      
      const steps = [
        { id: '1', type: 'thinking' as const, content: 'أحلل السؤال وأفهم السياق المطلوب...', timestamp: new Date(), confidence: 0.85 },
        { id: '2', type: 'analysis' as const, content: 'أبحث في قاعدة المعرفة للعثور على المعلومات الأكثر دقة...', timestamp: new Date(), confidence: 0.92 },
        { id: '3', type: 'conclusion' as const, content: 'أصيغ الإجابة بطريقة واضحة ومفيدة للمستخدم...', timestamp: new Date(), confidence: 0.98 }
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
      }, 1500);

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
    setLocation("/");
  };

  const handleConversationSelect = (id: number) => {
    setLocation(`/chat/${id}`);
  };

  const selectedModelData = models.find((model: AiModel) => model.id === selectedModel);

  return (
    <div className="flex h-full">
      {/* Conversation Sidebar */}
      <ConversationSidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        currentConversationId={currentConversationId}
        onConversationSelect={handleConversationSelect}
        onNewConversation={handleNewConversation}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto">
      {/* Enhanced Header */}
      <header className="bg-dark-surface border-b border-border-dark px-4 py-3 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Dr.X Logo with AI Indicator */}
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-dr-blue to-blue-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg">
                Dr.X
              </div>
              {isLoading && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              )}
            </div>
            <div>
              <h1 className="text-lg font-semibold text-text-primary flex items-center gap-2">
                <Brain className="w-5 h-5 text-dr-blue" />
                Dr.X AI Chat
              </h1>
              <p className="text-xs text-text-secondary">واجهة ذكية مع عرض التفكير الداخلي</p>
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

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Suggestion Chips */}
        <SuggestionChips onSuggestionClick={handleSuggestionClick} />

        {/* AI Thinking Indicator */}
        {isThinking && selectedModel === 'deepseek' && (
          <div className="px-4 py-2">
            <AIThinkingIndicator
              stage={thinkingStage}
              message="يعمل النموذج على تحليل طلبك وصياغة إجابة شاملة..."
              progress={Math.min((reasoningSteps.length / 3) * 100, 100)}
            />
          </div>
        )}

        {/* Reasoning Display */}
        {(reasoningSteps.length > 0 || isThinking) && selectedModel === 'deepseek' && (
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