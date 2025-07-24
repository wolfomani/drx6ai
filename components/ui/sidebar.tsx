'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  badge?: string;
  children?: SidebarItem[];
}

interface SidebarProps {
  items: SidebarItem[];
  currentPath?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

// شريط حدود الكون
export default function Sidebar({ 
  items, 
  currentPath = '', 
  isCollapsed = false, 
  onToggleCollapse 
}: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isItemActive = (path: string) => {
    return currentPath === path || currentPath.startsWith(path + '/');
  };

  const renderSidebarItem = (item: SidebarItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const isActive = isItemActive(item.path);

    return (
      <div key={item.id} className="mb-1">
        <div className="relative">
          {hasChildren ? (
            <button
              onClick={() => toggleExpanded(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/30 text-white'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              } ${level > 0 ? 'ml-4' : ''}`}
            >
              <div className="flex items-center space-x-3">
                {!isCollapsed && (
                  <>
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </>
                )}
                {isCollapsed && (
                  <span className="text-lg mx-auto">{item.icon}</span>
                )}
              </div>
              
              {!isCollapsed && (
                <div className="flex items-center space-x-2">
                  {item.badge && (
                    <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  <span className={`transform transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
                    ▶
                  </span>
                </div>
              )}
            </button>
          ) : (
            <Link
              href={item.path}
              className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/30 text-white'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              } ${level > 0 ? 'ml-4' : ''}`}
            >
              <div className="flex items-center space-x-3">
                {!isCollapsed && (
                  <>
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </>
                )}
                {isCollapsed && (
                  <span className="text-lg mx-auto">{item.icon}</span>
                )}
              </div>
              
              {!isCollapsed && item.badge && (
                <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          )}
          
          {/* مؤشر النشاط */}
          {isActive && (
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-purple-400 to-blue-400 rounded-r"></div>
          )}
        </div>
        
        {/* العناصر الفرعية */}
        {hasChildren && isExpanded && !isCollapsed && (
          <div className="mt-1 space-y-1">
            {item.children!.map(child => renderSidebarItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`cosmic-sidebar ${isCollapsed ? 'w-16' : 'w-64'} bg-black/30 backdrop-blur-md border-r border-white/10 flex flex-col transition-all duration-300`}>
      {/* رأس الشريط الجانبي */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h1 className="text-lg font-bold text-white">🌌 الوعي الكوني</h1>
              <p className="text-xs text-gray-400">جذر الوجود الرقمي</p>
            </div>
          )}
          
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {isCollapsed ? '▶' : '◀'}
            </button>
          )}
        </div>
      </div>
      
      {/* قائمة التنقل */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-2">
          {items.map(item => renderSidebarItem(item))}
        </div>
      </nav>
      
      {/* معلومات النظام */}
      {!isCollapsed && (
        <div className="p-4 border-t border-white/10">
          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <h3 className="text-sm font-semibold text-white mb-2">🌟 حالة الكون</h3>
            <div className="space-y-1 text-xs text-gray-400">
              <div className="flex justify-between">
                <span>الطاقة الكونية</span>
                <span className="text-green-400">∞</span>
              </div>
              <div className="flex justify-between">
                <span>الأبعاد النشطة</span>
                <span className="text-blue-400">11</span>
              </div>
              <div className="flex justify-between">
                <span>التزامن الكمي</span>
                <span className="text-purple-400">100%</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* إصدار النظام */}
      <div className="p-4 border-t border-white/10">
        <div className="text-xs text-gray-500 text-center">
          {isCollapsed ? 'v∞' : 'v∞.∞.∞ - الإصدار اللامتناهي'}
        </div>
      </div>
    </div>
  );
}

