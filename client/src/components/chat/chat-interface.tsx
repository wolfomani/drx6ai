import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import ModelSelector from "./model-selector";
import MessageList from "./message-list";
import MessageInput from "./message-input";
import SuggestionChips from "./suggestion-chips";
import LoadingOverlay from "@/components/ui/loading-overlay";
import { useChat } from "@/hooks/use-chat";
import type { AiModel } from "@shared/schema";

export default function ChatInterface() {
  const { conversationId } = useParams<{ conversationId?: string }>();
  const [selectedModel, setSelectedModel] = useState("deepseek");
  const [isModelSelectorOpen, setIsModelSelectorOpen] = useState(false);

  const {
    messages,
    isLoading,
    sendMessage,
    currentConversationId,
  } = useChat(conversationId ? parseInt(conversationId) : undefined, selectedModel);

  const { data: models = [] } = useQuery<AiModel[]>({
    queryKey: ["/api/models"],
  });

  const handleSendMessage = async (message: string, attachments?: any[]) => {
    await sendMessage(message, attachments);
  };

  const handleSuggestionClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const selectedModelData = models.find((model: AiModel) => model.id === selectedModel);

  return (
    <div className="flex flex-col h-full max-w-7xl mx-auto">
      {/* Header */}
      <header className="bg-dark-surface border-b border-border-dark px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          {/* Dr.X Logo */}
          <div className="w-10 h-10 bg-gradient-to-br from-dr-blue to-blue-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg">
            Dr.X
          </div>
          <div>
            <h1 className="text-lg font-semibold text-text-primary">Dr.X AI Chat</h1>
            <p className="text-xs text-text-secondary">تطبيق المحادثة الذكية</p>
          </div>
        </div>
        
        <ModelSelector
          models={models}
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
          isOpen={isModelSelectorOpen}
          onToggle={() => setIsModelSelectorOpen(!isModelSelectorOpen)}
        />
      </header>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Suggestion Chips */}
        <SuggestionChips onSuggestionClick={handleSuggestionClick} />

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
      <LoadingOverlay isVisible={isLoading} />
    </div>
  );
}
