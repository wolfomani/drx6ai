"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from 'lucide-react';

interface ModelSelectorProps {
  models: any[];
  selectedModel: string;
  onModelChange: (modelId: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const getModelColors = (color: string) => {
  const colorMap = {
    blue: "from-blue-500 to-blue-600",
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
        className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border-gray-700 hover:border-blue-500 text-white"
      >
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-sm font-medium">
          {selectedModelData?.name || "اختر النموذج"}
        </span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </Button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl z-50">
          <div className="p-2">
            {models.map((model) => (
              <button
                key={model.id}
                onClick={() => {
                  onModelChange(model.id);
                  onToggle();
                }}
                className="w-full p-3 rounded-lg hover:bg-gray-700 cursor-pointer transition-all duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 bg-gradient-to-br ${getModelColors(model.color || 'blue')} rounded-lg flex items-center justify-center text-xs font-bold text-white`}>
                      {model.icon}
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-sm text-white">{model.name}</div>
                      <div className="text-xs text-gray-400">{model.description}</div>
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
