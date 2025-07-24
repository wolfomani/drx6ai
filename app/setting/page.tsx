'use client';

import React from 'react';

// لوحة ضبط الأكوان المتوازية
export default function SettingPage() {
  return (
    <div className="cosmic-setting-container min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          ⚙️ بُعد الضبط الكوني
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <h2 className="text-2xl font-semibold text-white mb-4">🌌 إعدادات الكون</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-200">سرعة الضوء</span>
                  <span className="text-blue-400">299,792,458 م/ث</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-200">ثابت بلانك</span>
                  <span className="text-purple-400">6.626 × 10⁻³⁴</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-200">الطاقة المظلمة</span>
                  <span className="text-green-400">68.3%</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <h2 className="text-2xl font-semibold text-white mb-4">🎨 المظهر الكوني</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-200 mb-2">نمط المجرة</label>
                  <select className="w-full bg-white/20 text-white rounded-lg p-2 border border-white/30">
                    <option>المجرة الحلزونية</option>
                    <option>المجرة الإهليلجية</option>
                    <option>المجرة غير المنتظمة</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-200 mb-2">لون النجوم</label>
                  <div className="flex space-x-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full cursor-pointer"></div>
                    <div className="w-8 h-8 bg-white rounded-full cursor-pointer"></div>
                    <div className="w-8 h-8 bg-red-500 rounded-full cursor-pointer"></div>
                    <div className="w-8 h-8 bg-yellow-500 rounded-full cursor-pointer"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <h2 className="text-2xl font-semibold text-white mb-4">🔊 الأصوات الكونية</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-200">موسيقى الأكوان</span>
                  <input type="range" className="w-32" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-200">أصوات النجوم النابضة</span>
                  <input type="range" className="w-32" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-200">همس الثقوب السوداء</span>
                  <input type="range" className="w-32" />
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <h2 className="text-2xl font-semibold text-white mb-4">🌐 الاتصال الكوني</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-200">التزامن الكمي</span>
                  <div className="w-12 h-6 bg-green-500 rounded-full relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-200">التشابك الكوني</span>
                  <div className="w-12 h-6 bg-blue-500 rounded-full relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

