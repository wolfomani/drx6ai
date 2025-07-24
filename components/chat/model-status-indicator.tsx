"use client";

import { useState, useEffect } from "react";
import { Cpu, Zap, Activity, CheckCircle } from 'lucide-react';

interface ModelStatusIndicatorProps {
  model: any;
  isActive: boolean;
  responseTime?: number;
}

export default function ModelStatusIndicator({ model, isActive, responseTime }: ModelStatusIndicatorProps) {
  const [status, setStatus] = useState<'idle' | 'thinking' | 'responding' | 'complete'>('idle');

  useEffect(() => {
    if (isActive) {
      setStatus('thinking');
      const timer = setTimeout(() => setStatus('responding'), 1000);
      return () => clearTimeout(timer);
    } else {
      setStatus('idle');
    }
  }, [isActive]);

  const getStatusIcon = () => {
    switch (status) {
      case 'thinking':
        return <Cpu className="w-4 h-4 text-blue-400 animate-pulse" />;
      case 'responding':
        return <Zap className="w-4 h-4 text-yellow-400 animate-bounce" />;
      case 'complete':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      default:
        return <Activity className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'thinking': return 'يفكر...';
      case 'responding': return 'يكتب...';
      case 'complete': return 'مكتمل';
      default: return 'جاهز';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'thinking': return 'border-blue-400 bg-blue-500/10';
      case 'responding': return 'border-yellow-400 bg-yellow-500/10';
      case 'complete': return 'border-green-400 bg-green-500/10';
      default: return 'border-gray-700 bg-gray-800';
    }
  };

  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-300 ${getStatusColor()}`}>
      <div className="flex items-center gap-2">
        {getStatusIcon()}
        <span className="text-xs font-medium text-white">
          {model.name}
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400">
          {getStatusText()}
        </span>
        
        {responseTime && status === 'complete' && (
          <span className="text-xs text-green-400">
            {responseTime}ms
          </span>
        )}
      </div>
    </div>
  );
}
