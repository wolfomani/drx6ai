'use client';

import { useState, useCallback, useRef } from 'react';

interface VolcanoVoice {
  id: string;
  name: string;
  frequency: number;
  intensity: 'gentle' | 'moderate' | 'explosive';
  element: 'fire' | 'earth' | 'magma' | 'crystal';
}

interface TTSState {
  isPlaying: boolean;
  currentText: string;
  activeVoice: VolcanoVoice | null;
  volume: number;
  speed: number;
  pitch: number;
}

// خطاف الصوت البركاني
export function useVolcanoTTS() {
  const [state, setState] = useState<TTSState>({
    isPlaying: false,
    currentText: '',
    activeVoice: null,
    volume: 0.8,
    speed: 1.0,
    pitch: 1.0
  });

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const volcanoVoices: VolcanoVoice[] = [
    {
      id: 'cosmic-fire',
      name: 'نار كونية',
      frequency: 432,
      intensity: 'explosive',
      element: 'fire'
    },
    {
      id: 'earth-whisper',
      name: 'همس الأرض',
      frequency: 528,
      intensity: 'gentle',
      element: 'earth'
    },
    {
      id: 'magma-flow',
      name: 'تدفق الحمم',
      frequency: 741,
      intensity: 'moderate',
      element: 'magma'
    },
    {
      id: 'crystal-resonance',
      name: 'رنين البلورات',
      frequency: 963,
      intensity: 'gentle',
      element: 'crystal'
    }
  ];

  const setActiveVoice = useCallback((voice: VolcanoVoice) => {
    setState(prev => ({ ...prev, activeVoice: voice }));
  }, []);

  const adjustVolume = useCallback((volume: number) => {
    setState(prev => ({ ...prev, volume: Math.max(0, Math.min(1, volume)) }));
  }, []);

  const adjustSpeed = useCallback((speed: number) => {
    setState(prev => ({ ...prev, speed: Math.max(0.1, Math.min(3, speed)) }));
  }, []);

  const adjustPitch = useCallback((pitch: number) => {
    setState(prev => ({ ...prev, pitch: Math.max(0, Math.min(2, pitch)) }));
  }, []);

  const speak = useCallback((text: string) => {
    if (!text.trim()) return;

    // إيقاف أي تشغيل حالي
    if (utteranceRef.current) {
      window.speechSynthesis.cancel();
    }

    setState(prev => ({ ...prev, currentText: text, isPlaying: true }));

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    utterance.volume = state.volume;
    utterance.rate = state.speed;
    utterance.pitch = state.pitch;

    // تطبيق تأثيرات الصوت البركاني
    if (state.activeVoice) {
      switch (state.activeVoice.intensity) {
        case 'gentle':
          utterance.rate *= 0.8;
          utterance.pitch *= 0.9;
          break;
        case 'moderate':
          utterance.rate *= 1.0;
          utterance.pitch *= 1.1;
          break;
        case 'explosive':
          utterance.rate *= 1.2;
          utterance.pitch *= 1.3;
          break;
      }

      // تأثيرات العناصر
      switch (state.activeVoice.element) {
        case 'fire':
          utterance.pitch *= 1.2;
          break;
        case 'earth':
          utterance.pitch *= 0.8;
          utterance.rate *= 0.9;
          break;
        case 'magma':
          utterance.volume *= 1.1;
          break;
        case 'crystal':
          utterance.pitch *= 1.1;
          utterance.rate *= 0.95;
          break;
      }
    }

    utterance.onstart = () => {
      setState(prev => ({ ...prev, isPlaying: true }));
    };

    utterance.onend = () => {
      setState(prev => ({ ...prev, isPlaying: false, currentText: '' }));
    };

    utterance.onerror = () => {
      setState(prev => ({ ...prev, isPlaying: false, currentText: '' }));
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [state.volume, state.speed, state.pitch, state.activeVoice]);

  const pause = useCallback(() => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setState(prev => ({ ...prev, isPlaying: false }));
    }
  }, []);

  const resume = useCallback(() => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setState(prev => ({ ...prev, isPlaying: true }));
    }
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setState(prev => ({ ...prev, isPlaying: false, currentText: '' }));
  }, []);

  const getVoiceIntensityIcon = useCallback((intensity: VolcanoVoice['intensity']) => {
    switch (intensity) {
      case 'gentle': return '🌱';
      case 'moderate': return '🔥';
      case 'explosive': return '🌋';
      default: return '🔊';
    }
  }, []);

  const getElementIcon = useCallback((element: VolcanoVoice['element']) => {
    switch (element) {
      case 'fire': return '🔥';
      case 'earth': return '🌍';
      case 'magma': return '🌋';
      case 'crystal': return '💎';
      default: return '🎵';
    }
  }, []);

  return {
    ...state,
    volcanoVoices,
    setActiveVoice,
    adjustVolume,
    adjustSpeed,
    adjustPitch,
    speak,
    pause,
    resume,
    stop,
    getVoiceIntensityIcon,
    getElementIcon
  };
}

