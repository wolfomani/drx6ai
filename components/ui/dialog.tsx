'use client';

import React, { useEffect } from 'react';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'cosmic';
}

// حوارات الأبعاد المتوازية
export default function Dialog({ isOpen, onClose, title, children, size = 'md' }: DialogProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'max-w-md';
      case 'md':
        return 'max-w-lg';
      case 'lg':
        return 'max-w-2xl';
      case 'xl':
        return 'max-w-4xl';
      case 'cosmic':
        return 'max-w-6xl';
      default:
        return 'max-w-lg';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* خلفية الأبعاد المتوازية */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* نافذة الحوار */}
      <div className={`relative w-full ${getSizeClasses()} mx-4 max-h-[90vh] overflow-hidden`}>
        <div className="bg-gradient-to-br from-gray-900/95 via-purple-900/95 to-blue-900/95 backdrop-blur-md rounded-lg border border-white/20 shadow-2xl">
          {/* شريط العنوان */}
          {title && (
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
                <span>🌌</span>
                <span>{title}</span>
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors text-xl"
              >
                ✕
              </button>
            </div>
          )}
          
          {/* محتوى الحوار */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            {children}
          </div>
          
          {/* تأثيرات كونية */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 opacity-50"></div>
        </div>
        
        {/* جسيمات كونية متحركة */}
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-purple-400 rounded-full animate-pulse opacity-70"></div>
        <div className="absolute -top-2 -right-2 w-3 h-3 bg-blue-400 rounded-full animate-pulse opacity-70 animation-delay-300"></div>
        <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-green-400 rounded-full animate-pulse opacity-70 animation-delay-600"></div>
        <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-pulse opacity-70 animation-delay-900"></div>
      </div>
    </div>
  );
}

// مكون فرعي لأزرار الحوار
interface DialogActionsProps {
  children: React.ReactNode;
}

export function DialogActions({ children }: DialogActionsProps) {
  return (
    <div className="flex items-center justify-end space-x-3 pt-6 border-t border-white/10">
      {children}
    </div>
  );
}

// مكون فرعي لمحتوى الحوار
interface DialogContentProps {
  children: React.ReactNode;
}

export function DialogContent({ children }: DialogContentProps) {
  return (
    <div className="text-gray-200 leading-relaxed">
      {children}
    </div>
  );
}

