'use client';

import React, { useState } from 'react';

// مدخل الأمواج الكمية
export default function ChatInput() {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      console.log('إرسال رسالة كونية:', message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="cosmic-input-container p-4 bg-black/20 backdrop-blur-md border-t border-white/10">
      <div className="flex items-end space-x-4 max-w-4xl mx-auto">
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="اكتب رسالتك إلى الكون..."
            className="w-full bg-white/10 text-white placeholder-gray-400 rounded-lg p-3 border border-white/20 focus:border-purple-400 focus:outline-none resize-none min-h-[50px] max-h-32"
            rows={1}
          />
        </div>
        
        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          🚀 إرسال
        </button>
      </div>
      
      <div className="flex justify-center mt-2">
        <div className="flex space-x-2 text-xs text-gray-400">
          <span>⚡ الطاقة الكونية: نشطة</span>
          <span>•</span>
          <span>🌌 الاتصال الكمي: متصل</span>
        </div>
      </div>
    </div>
  );
}

