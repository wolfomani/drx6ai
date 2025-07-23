import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import type { AiModel } from "@shared/schema";

interface ModelSelectorProps {
  models: AiModel[];
  selectedModel: string;
  onModelChange: (modelId: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const getModelColors = (color: string) => {
  const colorMap = {
    blue: "from-dr-blue to-blue-600",
    orange: "from-orange-500 to-red-500", 
    purple: "from-purple-500 to-pink-500",
    green: "from-green-500 to-teal-500",
  };
  return colorMap[color as keyof typeof colorMap] || "from-gray-500 to-gray-600";
};

export default function ModelSelector({
  models,
  selectedModel,
  onModelChange,
  isOpen,
  onToggle,
}: ModelSelectorProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedModelData = models.find(model => model.id === selectedModel);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onToggle();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onToggle]);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        onClick={onToggle}
        variant="outline"
        className="flex items-center gap-2 bg-dark-surface-hover hover:bg-gray-700 border-border-dark hover:border-dr-blue text-text-primary"
      >
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-sm font-medium">
          {selectedModelData?.name || "اختر النموذج"}
        </span>
        <ChevronDown className="w-4 h-4 text-text-secondary" />
      </Button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-dark-surface border border-border-dark rounded-xl shadow-2xl z-50 animate-in slide-in-from-top-2">
          <div className="p-2">
            {models.map((model) => (
              <button
                key={model.id}
                onClick={() => {
                  onModelChange(model.id);
                  onToggle();
                }}
                className="w-full p-3 rounded-lg hover:bg-dark-surface-hover cursor-pointer transition-all duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 bg-gradient-to-br ${getModelColors(model.color || 'blue')} rounded-lg flex items-center justify-center text-xs font-bold text-white`}>
                      {model.icon}
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-sm text-text-primary">{model.name}</div>
                      <div className="text-xs text-text-secondary">{model.description}</div>
                    </div>
                  </div>
                  {selectedModel === model.id && (
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  )}
                  {selectedModel !== model.id && (
                    <div className="w-2 h-2 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
