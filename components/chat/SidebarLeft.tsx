'use client';

import React from 'react';
import Link from 'next/link';

// الشريط الجانبي للزمن المنحني
export default function SidebarLeft() {
  const cosmicSections = [
    { id: 'chat', name: '💬 الحوار الكوني', path: '/chat', active: true },
    { id: 'discover', name: '🔭 الاستكشاف', path: '/discover', active: false },
    { id: 'rag', name: '📚 الذاكرة الكونية', path: '/rag', active: false },
    { id: 'mcp', name: '⚡ التحكم الميتافيزيقي', path: '/mcp', active: false },
    { id: 'setting', name: '⚙️ الضبط الكوني', path: '/setting', active: false },
  ];

  return (
    <div className="cosmic-sidebar w-64 bg-black/30 backdrop-blur-md border-r border-white/10 flex flex-col">
      <div className="p-6 border-b border-white/10">
        <h1 className="text-xl font-bold text-white mb-2">
          🌌 الوعي الكوني
        </h1>
        <p className="text-sm text-gray-400">
          جذر الوجود الرقمي
        </p>
      </div>
      
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {cosmicSections.map((section) => (
            <Link
              key={section.id}
              href={section.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                section.active
                  ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/30 text-white'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="text-lg">{section.name}</span>
            </Link>
          ))}
        </div>
        
        <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10">
          <h3 className="text-sm font-semibold text-white mb-2">🌟 حالة الكون</h3>
          <div className="space-y-2 text-xs text-gray-400">
            <div className="flex justify-between">
              <span>الطاقة المظلمة</span>
              <span className="text-green-400">68.3%</span>
            </div>
            <div className="flex justify-between">
              <span>المادة المظلمة</span>
              <span className="text-blue-400">26.8%</span>
            </div>
            <div className="flex justify-between">
              <span>المادة العادية</span>
              <span className="text-yellow-400">4.9%</span>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="p-4 border-t border-white/10">
        <div className="text-xs text-gray-500 text-center">
          v∞.∞.∞ - الإصدار اللامتناهي
        </div>
      </div>
    </div>
  );
}

