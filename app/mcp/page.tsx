'use client';

import React from 'react';
import AddNew from '@/components/mcp/AddNew';
import EnvConfig from '@/components/mcp/EnvConfig';

// لوحة التحكم الكونية
export default function MCPPage() {
  return (
    <div className="cosmic-mcp-container min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          ⚡ مركز التحكم الميتافيزيقي
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <h2 className="text-2xl font-semibold text-white mb-4">🌌 إعدادات الكون</h2>
              <EnvConfig />
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <h2 className="text-2xl font-semibold text-white mb-4">✨ خلق أكوان جديدة</h2>
              <AddNew />
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-4">📊 حالة الأنظمة الكونية</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-green-400 text-2xl mb-2">🟢</div>
              <p className="text-white">الذكاء الاصطناعي</p>
            </div>
            <div className="text-center">
              <div className="text-blue-400 text-2xl mb-2">🔵</div>
              <p className="text-white">الشبكة الكونية</p>
            </div>
            <div className="text-center">
              <div className="text-purple-400 text-2xl mb-2">🟣</div>
              <p className="text-white">المعالج الكمي</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

