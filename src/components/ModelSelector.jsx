import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Cpu, Zap, Users, Sparkles } from 'lucide-react';

const ModelSelector = ({ selectedModel, onModelChange, models }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredModel, setHoveredModel] = useState(null);
  const dropdownRef = useRef(null);

  // أيقونات النماذج
  const modelIcons = {
    deepseek: Cpu,
    groq: Zap,
    together: Users,
    gemini: Sparkles
  };

  // إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedModelData = models.find(m => m.id === selectedModel);
  const SelectedIcon = modelIcons[selectedModel] || Cpu;

  return (
    <div className="model-selector-container" ref={dropdownRef}>
      <button 
        className={`model-selector ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className="model-selector-content">
          <SelectedIcon size={18} className="model-icon" />
          <div className="model-text">
            <span className="model-label">النموذج:</span>
            <span className="model-name">{selectedModelData?.name}</span>
          </div>
        </div>
        <ChevronDown 
          size={16} 
          className={`chevron-icon ${isOpen ? 'rotate' : ''}`} 
        />
      </button>
      
      {isOpen && (
        <div className="model-dropdown">
          <div className="dropdown-header">
            <span>اختر النموذج المناسب</span>
          </div>
          {models.map((model, index) => {
            const ModelIcon = modelIcons[model.id] || Cpu;
            return (
              <button
                key={model.id}
                className={`model-option ${selectedModel === model.id ? 'selected' : ''} ${hoveredModel === model.id ? 'hovered' : ''}`}
                onClick={() => {
                  onModelChange(model.id);
                  setIsOpen(false);
                }}
                onMouseEnter={() => setHoveredModel(model.id)}
                onMouseLeave={() => setHoveredModel(null)}
                style={{ animationDelay: `${index * 0.05}s` }}
                role="option"
                aria-selected={selectedModel === model.id}
              >
                <div className="model-option-content">
                  <div className="model-option-header">
                    <ModelIcon size={20} className="model-option-icon" />
                    <span className="model-option-name">{model.name}</span>
                    {selectedModel === model.id && (
                      <div className="selected-indicator">
                        <div className="selected-dot"></div>
                      </div>
                    )}
                  </div>
                  <p className="model-option-description">{model.description}</p>
                  {model.features && (
                    <div className="model-features">
                      {model.features.map((feature, idx) => (
                        <span key={idx} className="feature-tag">{feature}</span>
                      ))}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ModelSelector;

