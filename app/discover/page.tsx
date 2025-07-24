'use client';

import React from 'react';

// بوابة الاكتشافات الكونية
export default function DiscoverPage() {
  return (
    <div className="cosmic-discover-container min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          🌌 بُعد الاستكشاف الوجودي
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="cosmic-card bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">🔭 استكشاف المجرات</h3>
            <p className="text-gray-200">اكتشف أسرار الكون اللامتناهي</p>
          </div>
          
          <div className="cosmic-card bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">⚛️ الفيزياء الكمية</h3>
            <p className="text-gray-200">غص في أعماق الجسيمات الأولية</p>
          </div>
          
          <div className="cosmic-card bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">🌟 النجوم المتفجرة</h3>
            <p className="text-gray-200">شاهد ولادة وموت النجوم</p>
          </div>
        </div>
      </div>
    </div>
  );
}

