import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Mic, Image, FileText, Smile } from 'lucide-react';

const ChatInput = ({ onSendMessage, isLoading = false }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);
  const attachmentRef = useRef(null);

  // خيارات المرفقات
  const attachmentOptions = [
    { icon: Image, label: 'صورة', type: 'image' },
    { icon: FileText, label: 'مستند', type: 'document' },
    { icon: Smile, label: 'رموز تعبيرية', type: 'emoji' }
  ];

  // تعديل ارتفاع textarea تلقائياً
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = 200; // الحد الأقصى للارتفاع
      textareaRef.current.style.height = Math.min(scrollHeight, maxHeight) + 'px';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  // إغلاق قائمة المرفقات عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (attachmentRef.current && !attachmentRef.current.contains(event.target)) {
        setShowAttachments(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
      adjustTextareaHeight();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleAttachmentClick = (type) => {
    console.log('نوع المرفق المحدد:', type);
    setShowAttachments(false);
    // هنا يمكن إضافة منطق التعامل مع المرفقات
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // هنا يمكن إضافة منطق التسجيل الصوتي
  };

  return (
    <div className="chat-input-container">
      <form onSubmit={handleSubmit} className="chat-form">
        <div className={`input-wrapper ${isFocused ? 'focused' : ''} ${isLoading ? 'loading' : ''}`}>
          {/* شريط التحميل */}
          {isLoading && <div className="loading-bar"></div>}
          
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="اكتب رسالتك هنا..."
            className="message-input"
            disabled={isLoading}
            rows={1}
          />
          
          {/* عنصر نائب للرسالة */}
          {!message && !isFocused && (
            <div className="input-placeholder">
              <span className="placeholder-text">كيف يمكنني مساعدتك اليوم؟</span>
              <div className="placeholder-suggestions">
                <span className="suggestion-bubble">اسأل عن أي شيء</span>
                <span className="suggestion-bubble">اطلب المساعدة</span>
                <span className="suggestion-bubble">ابدأ محادثة</span>
              </div>
            </div>
          )}

          {/* أدوات التحكم */}
          <div className="input-controls">
            <div className="controls-left">
              {/* زر المرفقات */}
              <div className="attachment-container" ref={attachmentRef}>
                <button
                  type="button"
                  className={`control-button attachment-button ${showAttachments ? 'active' : ''}`}
                  onClick={() => setShowAttachments(!showAttachments)}
                  aria-label="إرفاق ملف"
                >
                  <Paperclip size={18} />
                </button>
                
                {showAttachments && (
                  <div className="attachment-dropdown">
                    {attachmentOptions.map((option, index) => (
                      <button
                        key={option.type}
                        type="button"
                        className="attachment-option"
                        onClick={() => handleAttachmentClick(option.type)}
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <option.icon size={16} />
                        <span>{option.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* زر التسجيل الصوتي */}
              <button
                type="button"
                className={`control-button mic-button ${isRecording ? 'recording' : ''}`}
                onClick={toggleRecording}
                aria-label={isRecording ? 'إيقاف التسجيل' : 'بدء التسجيل'}
              >
                <Mic size={18} />
                {isRecording && <div className="recording-pulse"></div>}
              </button>
            </div>

            {/* زر الإرسال */}
            <button
              type="submit"
              className={`send-button ${message.trim() ? 'active' : ''} ${isLoading ? 'loading' : ''}`}
              disabled={!message.trim() || isLoading}
              aria-label="إرسال الرسالة"
            >
              {isLoading ? (
                <div className="loading-spinner"></div>
              ) : (
                <Send size={18} />
              )}
            </button>
          </div>
        </div>
      </form>

      {/* عداد الأحرف */}
      {message.length > 0 && (
        <div className="character-counter">
          <span className={message.length > 2000 ? 'warning' : ''}>
            {message.length} / 2000
          </span>
        </div>
      )}
    </div>
  );
};

export default ChatInput;

