import { Brain, Zap, Target, CheckCircle2 } from "lucide-react";

interface AIThinkingIndicatorProps {
  stage: 'analyzing' | 'processing' | 'generating' | 'complete';
  message: string;
  progress?: number;
}

export default function AIThinkingIndicator({ stage, message, progress }: AIThinkingIndicatorProps) {
  const getStageIcon = () => {
    switch (stage) {
      case 'analyzing':
        return <Brain className="w-4 h-4 text-blue-400 animate-pulse" />;
      case 'processing':
        return <Target className="w-4 h-4 text-purple-400 animate-spin" />;
      case 'generating':
        return <Zap className="w-4 h-4 text-yellow-400 animate-bounce" />;
      case 'complete':
        return <CheckCircle2 className="w-4 h-4 text-green-400" />;
      default:
        return <Brain className="w-4 h-4 text-gray-400" />;
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

  const getStageText = () => {
    switch (stage) {
      case 'analyzing': return 'تحليل السؤال';
      case 'processing': return 'معالجة المعلومات';
      case 'generating': return 'صياغة الإجابة';
      case 'complete': return 'اكتملت الإجابة';
      default: return 'يعمل';
    }
  };

  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 ${getStageColor()}`}>
      <div className="flex items-center gap-2">
        {getStageIcon()}
        <span className="text-sm font-medium text-text-primary">
          {getStageText()}
        </span>
      </div>
      
      <div className="flex-1">
        <p className="text-xs text-text-secondary">{message}</p>
        {progress !== undefined && (
          <div className="w-full bg-dark-surface-hover rounded-full h-1 mt-1">
            <div 
              className="bg-dr-blue h-1 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
