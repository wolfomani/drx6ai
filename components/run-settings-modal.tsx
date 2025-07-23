"use client"

import { X, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

interface RunSettingsModalProps {
  isOpen: boolean
  onClose: () => void
  selectedModel: string
  onModelChange: (model: string) => void
}

export function RunSettingsModal({ isOpen, onClose, selectedModel, onModelChange }: RunSettingsModalProps) {
  const [showModels, setShowModels] = useState(true)
  const [showTools, setShowTools] = useState(true)
  const [showAdvanced, setShowAdvanced] = useState(true)
  const [thinkingMode, setThinkingMode] = useState(true)
  const [groundingEnabled, setGroundingEnabled] = useState(true)

  if (!isOpen) return null

  // Update the models array to include all available models from different providers
  const models = [
    // DeepSeek Models
    { name: "DeepSeek Reasoner", id: "deepseek-reasoner", provider: "deepseek", isNew: true },
    { name: "DeepSeek Chat", id: "deepseek-chat", provider: "deepseek", isNew: false },

    // Groq Models
    { name: "Qwen QwQ 32B", id: "qwen-qwq-32b", provider: "groq", isNew: true },
    { name: "Llama 3.3 70B", id: "llama-3.3-70b-versatile", provider: "groq", isNew: false },
    { name: "Mixtral 8x7B", id: "mixtral-8x7b-32768", provider: "groq", isNew: false },

    // Together Models
    { name: "DeepSeek V3", id: "deepseek-ai/DeepSeek-V3", provider: "together", isNew: true },
    {
      name: "Llama 3.2 90B Vision",
      id: "meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo",
      provider: "together",
      isNew: false,
    },

    // Gemini Models
    { name: "Gemini 2.5 Pro", id: "gemini-2.5-pro", provider: "gemini", isNew: true },
    { name: "Gemini 2.5 Flash", id: "gemini-2.5-flash", provider: "gemini", isNew: true },
    { name: "Gemma 3n E2B", id: "gemma-3n-e2b-it", provider: "gemini", isNew: false },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-700 sticky top-0 bg-gray-800">
          <h2 className="text-lg font-medium">Run settings</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Model Selection */}
          <div>
            <div className="relative">
              <select
                value={selectedModel}
                onChange={(e) => onModelChange(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 pr-10 appearance-none"
              >
                {models.map((model) => (
                  <option key={model.id} value={model.name}>
                    {model.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none" />
            </div>
          </div>

          {/* Model Categories */}
          <div>
            <button
              className="flex items-center justify-between w-full text-left font-medium mb-3"
              onClick={() => setShowModels(!showModels)}
            >
              <span>AVAILABLE MODELS</span>
              {showModels ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {showModels && (
              <div className="space-y-4 ml-4">
                {/* DeepSeek Models */}
                <div>
                  <h4 className="text-sm font-medium text-blue-400 mb-2">DeepSeek</h4>
                  <div className="space-y-2">
                    {models
                      .filter((m) => m.provider === "deepseek")
                      .map((model) => (
                        <div
                          key={model.id}
                          className="flex items-center justify-between p-2 hover:bg-gray-700 rounded cursor-pointer"
                          onClick={() => onModelChange(model.name)}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span>{model.name}</span>
                              {model.isNew && <span className="text-xs bg-blue-600 px-2 py-1 rounded">NEW</span>}
                            </div>
                            <div className="text-sm text-gray-400">{model.id}</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Groq Models */}
                <div>
                  <h4 className="text-sm font-medium text-green-400 mb-2">Groq</h4>
                  <div className="space-y-2">
                    {models
                      .filter((m) => m.provider === "groq")
                      .map((model) => (
                        <div
                          key={model.id}
                          className="flex items-center justify-between p-2 hover:bg-gray-700 rounded cursor-pointer"
                          onClick={() => onModelChange(model.name)}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span>{model.name}</span>
                              {model.isNew && <span className="text-xs bg-green-600 px-2 py-1 rounded">NEW</span>}
                            </div>
                            <div className="text-sm text-gray-400">{model.id}</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Together Models */}
                <div>
                  <h4 className="text-sm font-medium text-purple-400 mb-2">Together</h4>
                  <div className="space-y-2">
                    {models
                      .filter((m) => m.provider === "together")
                      .map((model) => (
                        <div
                          key={model.id}
                          className="flex items-center justify-between p-2 hover:bg-gray-700 rounded cursor-pointer"
                          onClick={() => onModelChange(model.name)}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span>{model.name}</span>
                              {model.isNew && <span className="text-xs bg-purple-600 px-2 py-1 rounded">NEW</span>}
                            </div>
                            <div className="text-sm text-gray-400">{model.id}</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Gemini Models */}
                <div>
                  <h4 className="text-sm font-medium text-yellow-400 mb-2">Gemini</h4>
                  <div className="space-y-2">
                    {models
                      .filter((m) => m.provider === "gemini")
                      .map((model) => (
                        <div
                          key={model.id}
                          className="flex items-center justify-between p-2 hover:bg-gray-700 rounded cursor-pointer"
                          onClick={() => onModelChange(model.name)}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span>{model.name}</span>
                              {model.isNew && <span className="text-xs bg-yellow-600 px-2 py-1 rounded">NEW</span>}
                            </div>
                            <div className="text-sm text-gray-400">{model.id}</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Thinking Mode */}
          <div className="flex items-center justify-between">
            <span>Thinking mode</span>
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={thinkingMode}
                onChange={(e) => setThinkingMode(e.target.checked)}
              />
              <div className={`w-11 h-6 rounded-full relative ${thinkingMode ? "bg-blue-600" : "bg-gray-600"}`}>
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${thinkingMode ? "right-1" : "left-1"}`}
                ></div>
              </div>
            </div>
          </div>

          {/* Set thinking budget */}
          <div className="flex items-center justify-between">
            <span>Set thinking budget</span>
            <div className="w-11 h-6 bg-gray-600 rounded-full relative">
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>

          {/* Tools Section */}
          <div>
            <button
              className="flex items-center justify-between w-full text-left font-medium mb-3"
              onClick={() => setShowTools(!showTools)}
            >
              <span>Tools</span>
              {showTools ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {showTools && (
              <div className="space-y-4 ml-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div>Structured output</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="text-blue-400 text-sm">Edit</button>
                    <div className="w-11 h-6 bg-gray-600 rounded-full relative">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>Code execution</div>
                  <div className="w-11 h-6 bg-gray-600 rounded-full relative">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div>Function calling</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="text-blue-400 text-sm">Edit</button>
                    <div className="w-11 h-6 bg-gray-600 rounded-full relative">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div>Grounding with Google Search</div>
                    <div className="text-sm text-gray-400">Source: Google Search</div>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={groundingEnabled}
                      onChange={(e) => setGroundingEnabled(e.target.checked)}
                    />
                    <div
                      className={`w-11 h-6 rounded-full relative ${groundingEnabled ? "bg-blue-600" : "bg-gray-600"}`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${groundingEnabled ? "right-1" : "left-1"}`}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>URL context</div>
                  <div className="w-11 h-6 bg-gray-600 rounded-full relative">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Advanced Settings */}
          <div>
            <button
              className="flex items-center justify-between w-full text-left font-medium mb-3"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              <span>Advanced settings</span>
              {showAdvanced ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {showAdvanced && (
              <div className="space-y-4 ml-4">
                <div className="flex items-center justify-between">
                  <div>Safety settings</div>
                  <button className="text-blue-400 text-sm">Edit</button>
                </div>

                <div>
                  <div className="mb-2">Add stop sequence</div>
                  <input
                    type="text"
                    placeholder="Add stop..."
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>Output length</div>
                  <div className="text-gray-400">65536</div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div>Top P</div>
                    <div className="text-gray-400">0.95</div>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "95%" }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
