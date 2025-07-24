'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CosmicModel {
  id: string;
  name: string;
  type: 'quantum' | 'neural' | 'consciousness' | 'multiverse';
  energy: number;
  dimensions: number;
  active: boolean;
}

interface ModelContextType {
  models: CosmicModel[];
  activeModel: CosmicModel | null;
  setActiveModel: (model: CosmicModel) => void;
  addModel: (model: CosmicModel) => void;
}

const ModelContext = createContext<ModelContextType | undefined>(undefined);

// موزع النماذج الوجودية
export function ModelProvider({ children }: { children: ReactNode }) {
  const [models, setModels] = useState<CosmicModel[]>([
    {
      id: 'cosmic-gpt',
      name: 'الذكاء الكوني العام',
      type: 'consciousness',
      energy: 100,
      dimensions: 11,
      active: true
    },
    {
      id: 'quantum-mind',
      name: 'العقل الكمي',
      type: 'quantum',
      energy: 85,
      dimensions: 7,
      active: false
    },
    {
      id: 'neural-universe',
      name: 'الكون العصبي',
      type: 'neural',
      energy: 92,
      dimensions: 9,
      active: false
    }
  ]);

  const [activeModel, setActiveModelState] = useState<CosmicModel | null>(
    models.find(m => m.active) || null
  );

  const setActiveModel = (model: CosmicModel) => {
    setModels(prev => prev.map(m => ({ ...m, active: m.id === model.id })));
    setActiveModelState(model);
  };

  const addModel = (model: CosmicModel) => {
    setModels(prev => [...prev, model]);
  };

  return (
    <ModelContext.Provider value={{
      models,
      activeModel,
      setActiveModel,
      addModel
    }}>
      {children}
    </ModelContext.Provider>
  );
}

export function useCosmicModels() {
  const context = useContext(ModelContext);
  if (context === undefined) {
    throw new Error('useCosmicModels must be used within a ModelProvider');
  }
  return context;
}

