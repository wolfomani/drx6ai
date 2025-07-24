"use client";

import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
}

export default function LoadingOverlay({ isVisible, message = "جاري التحميل..." }: LoadingOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 flex flex-col items-center gap-4 shadow-2xl">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        <p className="text-white text-sm font-medium">{message}</p>
      </div>
    </div>
  );
}
