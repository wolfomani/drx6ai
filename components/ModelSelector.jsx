"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Brain, Zap, Users, Sparkles } from "lucide-react"

const ModelSelector = ({ selectedModel, onModelChange, models }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredModel, setHoveredModel] = useState(null)
  const dropdownRef = useRef(null)

  const modelIcons = {
    deepseek: Brain,
    groq: Zap,
    together: Users,
    gemini: Sparkles,
  }

  const selectedModelData = models.find((model) => model.id === selectedModel)
  const SelectedIcon = modelIcons[selectedModel] || Brain

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleModelSelect = (modelId) => {
    onModelChange(modelId)
    setIsOpen(false)
  }

  return (
    <div className="model-selector-container" ref={dropdownRef}>
      <button
        className={`model-selector ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className="model-selector-content">
          <SelectedIcon size={20} className="model-icon" />
          <div className="model-text">
            <span className="model-label">النموذج المحدد</span>
            <span className="model-name">{selectedModelData?.name}</span>
          </div>
        </div>
        <ChevronDown size={16} className={`chevron-icon ${isOpen ? "rotate" : ""}`} />
      </button>

      {isOpen && (
        <div className="model-dropdown animate-slide-down">
          <div className="dropdown-header">اختر النموذج المناسب لك</div>
          {models.map((model, index) => {
            const ModelIcon = modelIcons[model.id] || Brain
            return (
              <button
                key={model.id}
                className={`model-option ${model.id === selectedModel ? "selected" : ""} ${
                  hoveredModel === index ? "hovered" : ""
                }`}
                onClick={() => handleModelSelect(model.id)}
                onMouseEnter={() => setHoveredModel(index)}
                onMouseLeave={() => setHoveredModel(null)}
                style={{ animationDelay: `${index * 0.1}s` }}
                role="option"
                aria-selected={model.id === selectedModel}
              >
                <div className="model-option-content">
                  <div className="model-option-header">
                    <ModelIcon size={18} className="model-option-icon" />
                    <span className="model-option-name">{model.name}</span>
                    {model.id === selectedModel && (
                      <div className="selected-indicator">
                        <div className="selected-dot"></div>
                      </div>
                    )}
                  </div>
                  <p className="model-option-description">{model.description}</p>
                  <div className="model-features">
                    {model.features.map((feature, featureIndex) => (
                      <span key={featureIndex} className="feature-tag">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ModelSelector
