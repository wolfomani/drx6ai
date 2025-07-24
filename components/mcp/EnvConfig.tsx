'use client';

import React, { useState } from 'react';

// ضبط البيئات الوجودية
export default function EnvConfig() {
  const [configs, setConfigs] = useState([
    { key: 'COSMIC_ENERGY', value: '∞', description: 'مستوى الطاقة الكونية' },
    { key: 'QUANTUM_STATE', value: 'superposition', description: 'الحالة الكمية الحالية' },
    { key: 'SPACETIME_CURVATURE', value: '8πG/c⁴', description: 'انحناء الزمكان' },
    { key: 'DARK_MATTER_RATIO', value: '26.8%', description: 'نسبة المادة المظلمة' }
  ]);

  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const handleAddConfig = () => {
    if (newKey && newValue) {
      setConfigs([...configs, {
        key: newKey,
        value: newValue,
        description: newDescription || 'متغير كوني جديد'
      }]);
      setNewKey('');
      setNewValue('');
      setNewDescription('');
    }
  };

  const handleUpdateConfig = (index: number, newValue: string) => {
    const updatedConfigs = [...configs];
    updatedConfigs[index].value = newValue;
    setConfigs(updatedConfigs);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white mb-4">
          🌌 متغيرات البيئة الكونية
        </h3>
        
        {configs.map((config, index) => (
          <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <div className="text-sm font-mono text-purple-300 mb-1">
                  {config.key}
                </div>
                <div className="text-xs text-gray-400">
                  {config.description}
                </div>
              </div>
              <input
                type="text"
                value={config.value}
                onChange={(e) => handleUpdateConfig(index, e.target.value)}
                className="bg-white/10 text-white text-sm rounded px-2 py-1 border border-white/20 focus:border-purple-400 focus:outline-none min-w-[120px]"
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t border-white/10 pt-6">
        <h4 className="text-md font-semibold text-white mb-4">
          ➕ إضافة متغير كوني جديد
        </h4>
        
        <div className="space-y-3">
          <input
            type="text"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            placeholder="اسم المتغير (مثل: UNIVERSE_VERSION)"
            className="w-full bg-white/10 text-white placeholder-gray-400 rounded-lg p-3 border border-white/20 focus:border-purple-400 focus:outline-none"
          />
          
          <input
            type="text"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="القيمة"
            className="w-full bg-white/10 text-white placeholder-gray-400 rounded-lg p-3 border border-white/20 focus:border-purple-400 focus:outline-none"
          />
          
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="الوصف (اختياري)"
            className="w-full bg-white/10 text-white placeholder-gray-400 rounded-lg p-3 border border-white/20 focus:border-purple-400 focus:outline-none"
          />
          
          <button
            onClick={handleAddConfig}
            disabled={!newKey || !newValue}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-lg font-medium hover:from-green-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            🌟 إضافة متغير كوني
          </button>
        </div>
      </div>
      
      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
        <div className="flex items-center space-x-2 text-yellow-300 mb-2">
          <span>⚠️</span>
          <span className="font-medium">تحذير كوني</span>
        </div>
        <p className="text-sm text-yellow-200">
          تغيير هذه المتغيرات قد يؤثر على استقرار الكون. تأكد من صحة القيم قبل الحفظ.
        </p>
      </div>
    </div>
  );
}

