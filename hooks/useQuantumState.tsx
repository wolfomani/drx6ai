'use client';

import { useState, useEffect, useCallback } from 'react';

type QuantumState = 'superposition' | 'entangled' | 'collapsed' | 'coherent' | 'decoherent';

interface QuantumParticle {
  id: string;
  state: QuantumState;
  energy: number;
  spin: number;
  position: { x: number; y: number; z: number };
  entangledWith?: string[];
}

interface QuantumSystemState {
  particles: QuantumParticle[];
  totalEnergy: number;
  coherenceLevel: number;
  entanglementCount: number;
  isObserving: boolean;
}

// خطاف الحالات الكمية
export function useQuantumState() {
  const [quantumSystem, setQuantumSystem] = useState<QuantumSystemState>({
    particles: [],
    totalEnergy: 0,
    coherenceLevel: 100,
    entanglementCount: 0,
    isObserving: false
  });

  const [dimension, setDimension] = useState<number>(11);

  useEffect(() => {
    // تهيئة النظام الكمي
    initializeQuantumSystem();
  }, []);

  const initializeQuantumSystem = useCallback(() => {
    const initialParticles: QuantumParticle[] = Array.from({ length: 5 }, (_, i) => ({
      id: `particle-${i}`,
      state: 'superposition' as QuantumState,
      energy: Math.random() * 100,
      spin: Math.random() > 0.5 ? 0.5 : -0.5,
      position: {
        x: Math.random() * 100,
        y: Math.random() * 100,
        z: Math.random() * 100
      }
    }));

    setQuantumSystem({
      particles: initialParticles,
      totalEnergy: initialParticles.reduce((sum, p) => sum + p.energy, 0),
      coherenceLevel: 100,
      entanglementCount: 0,
      isObserving: false
    });
  }, []);

  const observeParticle = useCallback((particleId: string) => {
    setQuantumSystem(prev => {
      const updatedParticles = prev.particles.map(particle => {
        if (particle.id === particleId) {
          // الانهيار الكمي عند الملاحظة
          return {
            ...particle,
            state: 'collapsed' as QuantumState,
            position: {
              x: Math.round(particle.position.x),
              y: Math.round(particle.position.y),
              z: Math.round(particle.position.z)
            }
          };
        }
        return particle;
      });

      return {
        ...prev,
        particles: updatedParticles,
        coherenceLevel: Math.max(0, prev.coherenceLevel - 10),
        isObserving: true
      };
    });

    // إيقاف الملاحظة بعد ثانية واحدة
    setTimeout(() => {
      setQuantumSystem(prev => ({ ...prev, isObserving: false }));
    }, 1000);
  }, []);

  const entangleParticles = useCallback((particleId1: string, particleId2: string) => {
    setQuantumSystem(prev => {
      const updatedParticles = prev.particles.map(particle => {
        if (particle.id === particleId1) {
          return {
            ...particle,
            state: 'entangled' as QuantumState,
            entangledWith: [...(particle.entangledWith || []), particleId2]
          };
        }
        if (particle.id === particleId2) {
          return {
            ...particle,
            state: 'entangled' as QuantumState,
            entangledWith: [...(particle.entangledWith || []), particleId1]
          };
        }
        return particle;
      });

      const entanglementCount = updatedParticles.filter(p => p.state === 'entangled').length;

      return {
        ...prev,
        particles: updatedParticles,
        entanglementCount
      };
    });
  }, []);

  const superposition = useCallback((particleId: string) => {
    setQuantumSystem(prev => ({
      ...prev,
      particles: prev.particles.map(particle => 
        particle.id === particleId 
          ? { ...particle, state: 'superposition' as QuantumState }
          : particle
      ),
      coherenceLevel: Math.min(100, prev.coherenceLevel + 5)
    }));
  }, []);

  const measureEnergy = useCallback(() => {
    const totalEnergy = quantumSystem.particles.reduce((sum, p) => sum + p.energy, 0);
    return totalEnergy;
  }, [quantumSystem.particles]);

  const getParticlesByState = useCallback((state: QuantumState) => {
    return quantumSystem.particles.filter(p => p.state === state);
  }, [quantumSystem.particles]);

  const tunnelThroughDimensions = useCallback((newDimension: number) => {
    setDimension(newDimension);
    
    // تأثير النفق الكمي على الجسيمات
    setQuantumSystem(prev => ({
      ...prev,
      particles: prev.particles.map(particle => ({
        ...particle,
        energy: particle.energy * (newDimension / 11), // تطبيع الطاقة حسب البُعد
        position: {
          x: particle.position.x * Math.random(),
          y: particle.position.y * Math.random(),
          z: particle.position.z * Math.random()
        }
      }))
    }));
  }, []);

  const resetQuantumSystem = useCallback(() => {
    initializeQuantumSystem();
    setDimension(11);
  }, [initializeQuantumSystem]);

  return {
    quantumSystem,
    dimension,
    observeParticle,
    entangleParticles,
    superposition,
    measureEnergy,
    getParticlesByState,
    tunnelThroughDimensions,
    resetQuantumSystem
  };
}

