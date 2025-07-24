'use client';

import React from 'react';
import ChatInput from '@/components/chat/ChatInput';
import MessageItem from '@/components/chat/MessageItem';
import SidebarLeft from '@/components/chat/SidebarLeft';

// بوابة الحوار اللامتناهي
export default function ChatPage() {
  return (
    <div className="cosmic-chat-container">
      <div className="flex h-screen bg-cosmic-dark">
        <SidebarLeft />
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <MessageItem 
              message="مرحباً بك في بُعد التواصل الكوني"
              isUser={false}
            />
          </div>
          <ChatInput />
        </div>
      </div>
    </div>
  );
}

