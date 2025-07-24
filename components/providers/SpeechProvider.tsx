'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CosmicVoice {
  id: string;
  name: string;
  frequency: number;
  dimension: string;
  active: boolean;
}

interface SpeechContextType {
  voices: CosmicVoice[];
  activeVoice: CosmicVoice | null;
  isPlaying: boolean;
  setActiveVoice: (voice: CosmicVoice) => void;
  speak: (text: string) => void;
  stop: () => void;
}

const SpeechContext = createContext<SpeechContextType | undefined>(undefined);

// مانح صوت الكون
export function SpeechProvider({ children }: { children: ReactNode }) {
  const [voices, setVoices] = useState<CosmicVoice[]>([
    {
      id: 'cosmic-narrator',
      name: 'الراوي الكوني',
      frequency: 432,
      dimension: '4D',
      active: true
    },
    {
      id: 'quantum-whisper',
      name: 'همس الكوانتوم',
      frequency: 528,
      dimension: '7D',
      active: false
    },
    {
      id: 'stellar-voice',
      name: 'صوت النجوم',
      frequency: 741,
      dimension: '11D',
      active: false
    }
  ]);

  const [activeVoice, setActiveVoiceState] = useState<CosmicVoice | null>(
    voices.find(v => v.active) || null
  );
  
  const [isPlaying, setIsPlaying] = useState(false);

  const setActiveVoice = (voice: CosmicVoice) => {
    setVoices(prev => prev.map(v => ({ ...v, active: v.id === voice.id })));
    setActiveVoiceState(voice);
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.8;
      utterance.pitch = activeVoice ? activeVoice.frequency / 500 : 1;
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const stop = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  return (
    <SpeechContext.Provider value={{
      voices,
      activeVoice,
      isPlaying,
      setActiveVoice,
      speak,
      stop
    }}>
      {children}
    </SpeechContext.Provider>
  );
}

export function useCosmicSpeech() {
  const context = useContext(SpeechContext);
  if (context === undefined) {
    throw new Error('useCosmicSpeech must be used within a SpeechProvider');
  }
  return context;
}

