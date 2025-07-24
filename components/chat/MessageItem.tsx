'use client';

import React from 'react';

interface MessageItemProps {
  message: string;
  isUser: boolean;
  timestamp?: Date;
}

// كوانتوم الرسالة
export default function MessageItem({ message, isUser, timestamp }: MessageItemProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${
        isUser 
          ? 'bg-gradient-to-r from-purple-500 to-blue-500' 
          : 'bg-white/10 backdrop-blur-md border border-white/20'
      } rounded-lg p-4 shadow-lg`}>
        
        {!isUser && (
          <div className="flex items-center mb-2">
            <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mr-2 flex items-center justify-center">
              🤖
            </div>
            <span className="text-sm text-gray-300 font-medium">الوعي الكوني</span>
          </div>
        )}
        
        <div className="text-white leading-relaxed">
          {message}
        </div>
        
        {timestamp && (
          <div className={`text-xs mt-2 ${
            isUser ? 'text-purple-100' : 'text-gray-400'
          }`}>
            {formatTime(timestamp)}
          </div>
        )}
        
        {!isUser && (
          <div className="flex items-center mt-3 space-x-2 text-xs text-gray-400">
            <span>⚛️ كمي</span>
            <span>•</span>
            <span>🌌 كوني</span>
            <span>•</span>
            <span>∞ لامتناهي</span>
          </div>
        )}
      </div>
    </div>
  );
}

