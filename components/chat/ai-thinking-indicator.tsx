"use client";

import { Brain, Zap, Target, CheckCircle } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface AIThinkingIndicatorProps {
  stage: 'analyzing' | 'processing' | 'generating' | 'complete';
  message: string;
  progress: number;
}

export default function AIThinkingIndicator({ stage, message, progress }: AIThinkingIndicatorProps) {
  const getStageIcon = () => {
    switch (stage) {
      case 'analyzing':
        return <Brain className="w-5 h-5 text-blue-400 animate-pulse" />;
      case 'processing':
        return <Target className="w-5 h-5 text-purple-400 animate-spin" />;
      case 'generating':
        return <Zap className="w-5 h-5 text-yellow-400 animate-bounce" />;
      case 'complete':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      default:
        return <Brain className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStageText = () => {
     return 'جاري التفكير...';
    }
  };

  const getStageColor = () => {
    switch (stage) {
      case 'analyzing': return 'border-blue-400 bg-blue-500/10';
      case 'processing': return 'border-purple-400 bg-purple-500/10';
      case 'generating': return 'border-yellow-400 bg-yellow-500/10';
      case 'complete': return 'border-green-400 bg-green-500/10';
      default: return 'border-gray-400 bg-gray-500/10';
    }
  };

  return (
    <div className={`border rounded-xl p-4 transition-all duration-300 ${getStageColor()}`}>
      <div className="flex items-center gap-3 mb-3">
        {getStageIcon()}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">
              {getStageText()}
            </h3>
            <span className="text-xs text-gray-400">
              {Math.round(progress)}%
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            {message}
          </p>
        </div>
      </div>
      
      <Progress value={progress} className="h-2" />
      
      <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
        <span>مرحلة التفكير النشطة</span>
        <div className="flex space-x-1">
          <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
        </div>
      </div>
    </div>
  );
}
