'use client';

import React from 'react';

interface AlertProps {
  type: 'info' | 'warning' | 'error' | 'success' | 'cosmic';
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
}

// إنذارات الزمكان
export default function Alert({ type, title, children, onClose }: AlertProps) {
  const getAlertStyles = () => {
    switch (type) {
      case 'info':
        return 'bg-blue-500/10 border-blue-500/20 text-blue-300';
      case 'warning':
        return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-300';
      case 'error':
        return 'bg-red-500/10 border-red-500/20 text-red-300';
      case 'success':
        return 'bg-green-500/10 border-green-500/20 text-green-300';
      case 'cosmic':
        return 'bg-purple-500/10 border-purple-500/20 text-purple-300';
      default:
        return 'bg-gray-500/10 border-gray-500/20 text-gray-300';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'info':
        return 'ℹ️';
      case 'warning':
        return '⚠️';
      case 'error':
        return '❌';
      case 'success':
        return '✅';
      case 'cosmic':
        return '🌌';
      default:
        return '📢';
    }
  };

  const getTitle = () => {
    if (title) return title;
    
    switch (type) {
      case 'info':
        return 'معلومات كونية';
      case 'warning':
        return 'تحذير من الزمكان';
      case 'error':
        return 'خطأ في النسيج الكوني';
      case 'success':
        return 'نجح التزامن الكمي';
      case 'cosmic':
        return 'رسالة من الكون';
      default:
        return 'إشعار';
    }
  };

  return (
    <div className={`rounded-lg border p-4 ${getAlertStyles()} backdrop-blur-md`}>
      <div className="flex items-start space-x-3">
        <div className="text-xl flex-shrink-0">
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold mb-1">
            {getTitle()}
          </h4>
          <div className="text-sm opacity-90">
            {children}
          </div>
        </div>
        
        {onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 text-lg hover:opacity-70 transition-opacity"
          >
            ✕
          </button>
        )}
      </div>
      
      {type === 'cosmic' && (
        <div className="mt-3 pt-3 border-t border-current/20">
          <div className="flex items-center justify-between text-xs opacity-70">
            <span>🌟 مستوى الطاقة الكونية: عالي</span>
            <span>⚛️ التزامن الكمي: نشط</span>
          </div>
        </div>
      )}
    </div>
  );
}

