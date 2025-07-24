'use client';

import React, { useState } from 'react';

interface CosmicDocument {
  id: string;
  name: string;
  type: 'scroll' | 'tablet' | 'crystal' | 'quantum';
  size: string;
  dimension: string;
  knowledge: number;
  uploadDate: Date;
}

// جدول الألواح الكونية
export default function DocumentTable() {
  const [documents, setDocuments] = useState<CosmicDocument[]>([
    {
      id: '1',
      name: 'أسرار الكون الأول',
      type: 'crystal',
      size: '∞ بايت',
      dimension: '11D',
      knowledge: 95,
      uploadDate: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'نظريات الأوتار الفائقة',
      type: 'quantum',
      size: '42 GB',
      dimension: '26D',
      knowledge: 88,
      uploadDate: new Date('2024-01-10')
    },
    {
      id: '3',
      name: 'خريطة المجرات المتوازية',
      type: 'tablet',
      size: '7.3 TB',
      dimension: '4D',
      knowledge: 76,
      uploadDate: new Date('2024-01-05')
    }
  ]);

  const getTypeIcon = (type: CosmicDocument['type']) => {
    switch (type) {
      case 'scroll': return '📜';
      case 'tablet': return '📋';
      case 'crystal': return '💎';
      case 'quantum': return '⚛️';
      default: return '📄';
    }
  };

  const getKnowledgeColor = (knowledge: number) => {
    if (knowledge >= 90) return 'text-green-400';
    if (knowledge >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ar-SA');
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-right py-3 px-4 text-gray-300 font-medium">المستند</th>
              <th className="text-right py-3 px-4 text-gray-300 font-medium">النوع</th>
              <th className="text-right py-3 px-4 text-gray-300 font-medium">الحجم</th>
              <th className="text-right py-3 px-4 text-gray-300 font-medium">البُعد</th>
              <th className="text-right py-3 px-4 text-gray-300 font-medium">المعرفة</th>
              <th className="text-right py-3 px-4 text-gray-300 font-medium">تاريخ الرفع</th>
              <th className="text-right py-3 px-4 text-gray-300 font-medium">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{getTypeIcon(doc.type)}</span>
                    <span className="text-white font-medium">{doc.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-300">{doc.type}</td>
                <td className="py-4 px-4 text-gray-300">{doc.size}</td>
                <td className="py-4 px-4">
                  <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs">
                    {doc.dimension}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getKnowledgeColor(doc.knowledge).replace('text-', 'bg-')}`}
                        style={{ width: `${doc.knowledge}%` }}
                      ></div>
                    </div>
                    <span className={`text-sm ${getKnowledgeColor(doc.knowledge)}`}>
                      {doc.knowledge}%
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-300">{formatDate(doc.uploadDate)}</td>
                <td className="py-4 px-4">
                  <div className="flex space-x-2">
                    <button className="text-blue-400 hover:text-blue-300 text-sm">
                      👁️ عرض
                    </button>
                    <button className="text-red-400 hover:text-red-300 text-sm">
                      🗑️ حذف
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-between items-center pt-4 border-t border-white/10">
        <div className="text-sm text-gray-400">
          إجمالي المستندات: {documents.length} | المعرفة الكونية: ∞
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
            السابق
          </button>
          <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
            التالي
          </button>
        </div>
      </div>
    </div>
  );
}

