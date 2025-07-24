'use client';

import React, { useState } from 'react';

// خلق الأكوان الجديدة
export default function AddNew() {
  const [universeName, setUniverseName] = useState('');
  const [universeType, setUniverseType] = useState('parallel');
  const [dimensions, setDimensions] = useState(11);

  const handleCreateUniverse = () => {
    if (universeName.trim()) {
      console.log('خلق كون جديد:', {
        name: universeName,
        type: universeType,
        dimensions: dimensions
      });
      setUniverseName('');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-gray-200 mb-2 font-medium">
          🌌 اسم الكون الجديد
        </label>
        <input
          type="text"
          value={universeName}
          onChange={(e) => setUniverseName(e.target.value)}
          placeholder="أدخل اسم الكون..."
          className="w-full bg-white/10 text-white placeholder-gray-400 rounded-lg p-3 border border-white/20 focus:border-purple-400 focus:outline-none"
        />
      </div>
      
      <div>
        <label className="block text-gray-200 mb-2 font-medium">
          🔮 نوع الكون
        </label>
        <select
          value={universeType}
          onChange={(e) => setUniverseType(e.target.value)}
          className="w-full bg-white/10 text-white rounded-lg p-3 border border-white/20 focus:border-purple-400 focus:outline-none"
        >
          <option value="parallel">كون متوازي</option>
          <option value="quantum">كون كمي</option>
          <option value="multiverse">كون متعدد الأبعاد</option>
          <option value="holographic">كون هولوغرافي</option>
        </select>
      </div>
      
      <div>
        <label className="block text-gray-200 mb-2 font-medium">
          📐 عدد الأبعاد: {dimensions}
        </label>
        <input
          type="range"
          min="3"
          max="26"
          value={dimensions}
          onChange={(e) => setDimensions(parseInt(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>3D (كلاسيكي)</span>
          <span>11D (نظرية الأوتار)</span>
          <span>26D (نظرية الأوتار البوزونية)</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <div className="text-sm text-gray-300 mb-1">الطاقة المطلوبة</div>
          <div className="text-lg font-bold text-blue-400">
            ∞ جول
          </div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <div className="text-sm text-gray-300 mb-1">زمن الخلق</div>
          <div className="text-lg font-bold text-green-400">
            10⁻⁴³ ثانية
          </div>
        </div>
      </div>
      
      <button
        onClick={handleCreateUniverse}
        disabled={!universeName.trim()}
        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        ✨ خلق الكون الجديد
      </button>
      
      <div className="text-xs text-gray-400 text-center">
        ⚠️ تحذير: خلق الأكوان قد يؤثر على نسيج الزمكان
      </div>
    </div>
  );
}

