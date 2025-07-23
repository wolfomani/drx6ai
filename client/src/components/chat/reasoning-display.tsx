import { useState } from "react";
import { ChevronDown, ChevronUp, Brain, Clock, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReasoningStep {
  id: string;
  type: 'thinking' | 'analysis' | 'conclusion';
  content: string;
  timestamp: Date;
  confidence?: number;
}

interface ReasoningDisplayProps {
  steps: ReasoningStep[];
  isThinking: boolean;
  model: string;
}

export default function ReasoningDisplay({ steps, isThinking, model }: ReasoningDisplayProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'thinking': return <Brain className="w-4 h-4 text-blue-400" />;
      case 'analysis': return <Target className="w-4 h-4 text-purple-400" />;
      case 'conclusion': return <Clock className="w-4 h-4 text-green-400" />;
      default: return <Brain className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStepColor = (type: string) => {
    switch (type) {
      case 'thinking': return 'border-r-blue-400 bg-blue-500/5';
      case 'analysis': return 'border-r-purple-400 bg-purple-500/5';
      case 'conclusion': return 'border-r-green-400 bg-green-500/5';
      default: return 'border-r-gray-400 bg-gray-500/5';
    }
  };

  if (steps.length === 0 && !isThinking) return null;

  return (
    <div className="bg-dark-surface/50 border border-border-dark rounded-xl p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-dr-blue animate-pulse" />
          <h3 className="text-sm font-semibold text-text-primary">
            التفكير الداخلي - {model}
          </h3>
          {isThinking && (
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-dr-blue rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
              <div className="w-2 h-2 bg-dr-blue rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
              <div className="w-2 h-2 bg-dr-blue rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
            </div>
          )}
        </div>
        
        {steps.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-text-secondary hover:text-text-primary"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            <span className="ml-1 text-xs">{steps.length} خطوة</span>
          </Button>
        )}
      </div>

      {isThinking && (
        <div className="flex items-center gap-2 text-text-secondary text-sm mb-2">
          <div className="w-4 h-1 bg-dr-blue rounded-full animate-pulse"></div>
          <span>يفكر في الإجابة...</span>
        </div>
      )}

      {isExpanded && steps.length > 0 && (
        <div className="space-y-3 animate-fade-in">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`border-r-2 ${getStepColor(step.type)} pr-3 py-2 rounded-r-lg`}
            >
              <div className="flex items-start gap-2">
                {getStepIcon(step.type)}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-text-secondary">
                      خطوة {index + 1}
                    </span>
                    {step.confidence && (
                      <span className="text-xs text-green-400">
                        ثقة: {Math.round(step.confidence * 100)}%
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-text-primary mt-1 leading-relaxed">
                    {step.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isExpanded && steps.length > 0 && (
        <div className="text-xs text-text-secondary">
          النقر لعرض خطوات التفكير التفصيلية...
        </div>
      )}
    </div>
  );
}
