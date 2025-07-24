'use client';

import React, { useState, useRef } from 'react';

// بوابة رفع الأسرار الكونية
export default function DocumentUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    if (files.length > 0) {
      setIsUploading(true);
      setUploadProgress(0);
      
      // محاكاة عملية الرفع
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          isDragging
            ? 'border-purple-400 bg-purple-500/10'
            : 'border-white/30 hover:border-white/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.txt,.md"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <div className="space-y-4">
          <div className="text-6xl">
            {isDragging ? '🌌' : '📚'}
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {isDragging ? 'أفلت الأسرار هنا' : 'رفع الأسرار الكونية'}
            </h3>
            <p className="text-gray-400">
              اسحب وأفلت الملفات هنا أو اضغط للاختيار
            </p>
          </div>
          
          <button
            onClick={openFileDialog}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
          >
            🔮 اختيار الملفات
          </button>
          
          <div className="text-sm text-gray-500">
            الأنواع المدعومة: PDF, DOC, DOCX, TXT, MD
          </div>
        </div>
      </div>
      
      {isUploading && (
        <div className="bg-white/10 rounded-lg p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-medium">🚀 رفع الأسرار...</span>
            <span className="text-gray-300">{uploadProgress}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-200"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-400 mt-2">
            ⚛️ تحليل المحتوى الكمي... | 🧠 استخراج المعرفة... | 🌌 فهرسة كونية...
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/5 rounded-lg p-4 border border-white/10 text-center">
          <div className="text-2xl mb-2">⚡</div>
          <div className="text-sm text-gray-300 mb-1">المعالجة السريعة</div>
          <div className="text-xs text-gray-400">تحليل فوري للمحتوى</div>
        </div>
        
        <div className="bg-white/5 rounded-lg p-4 border border-white/10 text-center">
          <div className="text-2xl mb-2">🔒</div>
          <div className="text-sm text-gray-300 mb-1">التشفير الكمي</div>
          <div className="text-xs text-gray-400">حماية متقدمة للبيانات</div>
        </div>
        
        <div className="bg-white/5 rounded-lg p-4 border border-white/10 text-center">
          <div className="text-2xl mb-2">∞</div>
          <div className="text-sm text-gray-300 mb-1">التخزين اللامحدود</div>
          <div className="text-xs text-gray-400">مساحة كونية لا نهائية</div>
        </div>
      </div>
    </div>
  );
}

