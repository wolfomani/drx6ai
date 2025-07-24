'use client';

import React from 'react';
import DocumentTable from '@/components/rag/DocumentTable';
import DocumentUpload from '@/components/rag/DocumentUpload';

// بوابة المعرفة الأزلية
export default function RAGPage() {
  return (
    <div className="cosmic-rag-container min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          📚 بُعد الذاكرة الكونية
        </h1>
        
        <div className="space-y-8">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-4">📤 بوابة رفع الأسرار الكونية</h2>
            <DocumentUpload />
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-4">📋 جدول الألواح الكونية</h2>
            <DocumentTable />
          </div>
          
          <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4">🧠 إحصائيات المعرفة</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">∞</div>
                <p className="text-gray-300">المستندات المحفوظة</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400 mb-2">∞</div>
                <p className="text-gray-300">الكلمات المفهرسة</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-2">∞</div>
                <p className="text-gray-300">الروابط الدلالية</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">∞</div>
                <p className="text-gray-300">المفاهيم المستخرجة</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

