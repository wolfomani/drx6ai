import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Send, 
  Paperclip, 
  Mic, 
  MicOff, 
  Smile, 
  X,
  Image as ImageIcon 
} from "lucide-react";
import { useAudioRecording } from "@/hooks/use-audio-recording";
import { useToast } from "@/hooks/use-toast";
import type { AiModel } from "@shared/schema";

interface MessageInputProps {
  onSendMessage: (message: string, attachments?: any[]) => void;
  selectedModel?: AiModel;
  disabled?: boolean;
}

export default function MessageInput({ onSendMessage, selectedModel, disabled }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const {
    isRecording,
    startRecording,
    stopRecording,
    audioBlob,
    clearRecording,
  } = useAudioRecording();

  const maxCharacters = 4000;
  const characterCount = message.length;
  const isOverLimit = characterCount > maxCharacters;
  const isNearLimit = characterCount > maxCharacters * 0.8;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [message]);

  const handleSend = () => {
    if ((!message.trim() && attachments.length === 0) || isOverLimit || disabled) return;
    
    onSendMessage(message.trim(), attachments);
    setMessage("");
    setAttachments([]);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        toast({
          title: "خطأ",
          description: `الملف ${file.name} كبير جداً. الحد الأقصى 10 ميجابايت`,
          variant: "destructive",
        });
        return false;
      }
      return true;
    });
    
    setAttachments(prev => [...prev, ...validFiles]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const toggleRecording = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      try {
        await startRecording();
      } catch (error) {
        toast({
          title: "خطأ",
          description: "فشل في بدء التسجيل. تأكد من صلاحيات الميكروفون",
          variant: "destructive",
        });
      }
    }
  };

  const getCharacterCountColor = () => {
    if (isOverLimit) return "text-red-400";
    if (isNearLimit) return "text-yellow-400";
    return "text-text-secondary";
  };

  return (
    <div className="p-4 bg-dark-surface border-t border-border-dark">
      <div className="max-w-4xl mx-auto">
        
        {/* File Attachments Preview */}
        {attachments.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-2">
              {attachments.map((file, index) => (
                <div key={index} className="flex items-center gap-2 bg-dark-surface-hover px-3 py-2 rounded-lg text-sm">
                  <ImageIcon className="w-4 h-4 text-blue-400" />
                  <span className="text-text-primary">{file.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAttachment(index)}
                    className="h-4 w-4 p-0 text-red-400 hover:text-red-300"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Audio Recording Preview */}
        {audioBlob && (
          <div className="mb-3">
            <div className="flex items-center gap-2 bg-dark-surface-hover px-3 py-2 rounded-lg text-sm">
              <Mic className="w-4 h-4 text-red-400" />
              <span className="text-text-primary">تسجيل صوتي</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearRecording}
                className="h-4 w-4 p-0 text-red-400 hover:text-red-300"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
        )}

        {/* Input Container */}
        <div className="relative bg-dark-surface-hover border border-border-dark rounded-2xl focus-within:border-dr-blue focus-within:shadow-lg focus-within:shadow-dr-blue/20 transition-all duration-300">
          
          {/* Textarea */}
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="اكتب رسالتك هنا... (اضغط Enter للإرسال، Shift+Enter للسطر الجديد)"
            className="w-full bg-transparent text-text-primary placeholder-text-secondary resize-none border-none outline-none focus:ring-0 focus:border-transparent pr-16 max-h-32 min-h-[60px]"
            disabled={disabled}
          />

          {/* Action Buttons */}
          <div className="absolute bottom-2 right-2 flex items-center gap-2">
            
            {/* Audio Recording */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleRecording}
              disabled={disabled}
              className={`w-8 h-8 p-0 rounded-full transition-all duration-300 hover:scale-110 ${
                isRecording 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-red-500/20 hover:bg-red-500/30 text-red-400'
              }`}
            >
              {isRecording ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
            </Button>

            {/* File Upload */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled}
              className="w-8 h-8 p-0 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-full transition-all duration-300 hover:scale-110"
            >
              <Paperclip className="w-3 h-3" />
            </Button>

            {/* Emoji Picker */}
            <Button
              variant="ghost"
              size="sm"
              disabled={disabled}
              className="w-8 h-8 p-0 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-full transition-all duration-300 hover:scale-110"
            >
              <Smile className="w-3 h-3" />
            </Button>

            {/* Send Button */}
            <Button
              onClick={handleSend}
              disabled={!message.trim() || isOverLimit || disabled}
              className="w-8 h-8 p-0 bg-dr-blue hover:bg-blue-600 text-white rounded-full transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Send className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Character Counter and Status */}
        <div className="flex items-center justify-between mt-2 text-xs">
          <div className="flex items-center gap-4">
            <span className={getCharacterCountColor()}>
              {characterCount} / {maxCharacters} حرف
            </span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-text-secondary">
                {selectedModel?.name || "غير محدد"} متاح
              </span>
            </div>
          </div>
          <div className="text-text-secondary">
            Shift+Enter للسطر الجديد
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.pdf,.doc,.docx,.txt"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
}
