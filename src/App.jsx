import React, { useState } from 'react';
import { Search } from 'lucide-react';
import ModelSelector from './components/ModelSelector';
import ChatInput from './components/ChatInput';
import SuggestionChips from './components/SuggestionChips';
import './App.css';

const DrXChatApp = () => {
  const [selectedModel, setSelectedModel] = useState('deepseek');
  const [isLoading, setIsLoading] = useState(false);

  // النماذج المتاحة مع معلومات إضافية
  const models = [
    { 
      id: 'deepseek', 
      name: 'DeepSeek', 
      description: 'نموذج متقدم للمحادثة والتفكير العميق',
      features: ['تفكير عميق', 'تحليل متقدم', 'إبداعي']
    },
    { 
      id: 'groq', 
      name: 'Groq', 
      description: 'نموذج سريع ودقيق للاستجابة الفورية',
      features: ['سرعة عالية', 'دقة ممتازة', 'كفاءة']
    },
    { 
      id: 'together', 
      name: 'Together', 
      description: 'نموذج تعاوني للمهام المعقدة',
      features: ['تعاون', 'مهام معقدة', 'شامل']
    },
    { 
      id: 'gemini', 
      name: 'Gemini', 
      description: 'نموذج Google المتقدم متعدد الوسائط',
      features: ['متعدد الوسائط', 'ذكي', 'متطور']
    }
  ];

  const handleSuggestionClick = (prompt) => {
    handleSendMessage(prompt);
  };

  const handleSendMessage = (message) => {
    setIsLoading(true);
    console.log('إرسال الرسالة:', message, 'باستخدام النموذج:', selectedModel);
    
    // محاكاة إرسال الرسالة
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleModelChange = (modelId) => {
    setSelectedModel(modelId);
    console.log('تم تغيير النموذج إلى:', modelId);
  };

  return (
    <div className="app-container">
      {/* شريط التنقل العلوي */}
      <nav className="top-nav">
        <div className="nav-logo">
          <img 
            src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/2cb56500-100e-4ba3-a75d-e5c85744490f" 
            alt="Dr.X" 
            className="logo-img"
          />
        </div>
        <div className="nav-actions">
          <button className="nav-button" aria-label="السجل">
            <Search size={20} />
          </button>
          <button className="login-button">تسجيل الدخول</button>
        </div>
      </nav>

      {/* المحتوى الرئيسي */}
      <main className="main-container">
        <div className="main-logo animate-fade-in">
          <img 
            src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/2cb56500-100e-4ba3-a75d-e5c85744490f" 
            alt="Dr.X" 
            className="main-logo-img"
          />
        </div>

        {/* منتقي النموذج */}
        <ModelSelector
          selectedModel={selectedModel}
          onModelChange={handleModelChange}
          models={models}
        />

        {/* شرائح الاقتراحات */}
        <SuggestionChips onSuggestionClick={handleSuggestionClick} />

        {/* منطقة الإدخال */}
        <ChatInput 
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />

        {/* النص التذييلي */}
        <p className="footer-text">
          بإرسالك رسالة إلى Dr.X، فإنك توافق على{' '}
          <a href="https://x.ai/legal/terms-of-service" target="_blank" rel="noopener noreferrer">
            الشروط
          </a>{' '}
          و{' '}
          <a href="https://x.ai/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
            سياسة الخصوصية
          </a>
          .
        </p>
      </main>
    </div>
  );
};

export default DrXChatApp;

