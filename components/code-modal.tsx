"use client"

import { X, Copy, FileText } from "lucide-react"
import { useState } from "react"

interface CodeModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CodeModal({ isOpen, onClose }: CodeModalProps) {
  const [language, setLanguage] = useState("TypeScript")
  const [promptHistory, setPromptHistory] = useState(true)

  if (!isOpen) return null

  const codeExample = `// To run this code you need to install:
// npm install @google/genai mime
// npm install -D @types/node

import {
  GoogleGenAI,
  HarmBlockThreshold,
  HarmCategory,
} from '@google/genai';

async function main() {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
  });
  const tools = [
    {
      googleSearch: {
      }
    },
  ];
  const config = {`

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg font-medium">Get code</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          <p className="text-gray-300 mb-4">
            You can run this prompt from the <span className="text-blue-400">Gemini API</span>, after installing the{" "}
            <span className="text-blue-400">relevant package</span>, by running the following code:
          </p>

          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between p-3 border-b border-gray-700">
              <div className="flex items-center gap-4">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded px-3 py-1 text-sm"
                >
                  <option>TypeScript</option>
                  <option>JavaScript</option>
                  <option>Python</option>
                </select>

                <div className="flex items-center gap-2">
                  <span className="text-sm">Prompt history</span>
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={promptHistory}
                      onChange={(e) => setPromptHistory(e.target.checked)}
                    />
                    <div className={`w-8 h-4 rounded-full relative ${promptHistory ? "bg-blue-600" : "bg-gray-600"}`}>
                      <div
                        className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-transform ${promptHistory ? "right-0.5" : "left-0.5"}`}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-700 rounded">
                  <Copy size={16} />
                </button>
                <button className="p-2 hover:bg-gray-700 rounded">
                  <FileText size={16} />
                </button>
              </div>
            </div>

            <div className="p-4 overflow-x-auto">
              <pre className="text-sm text-gray-300 font-mono">
                <code>{codeExample}</code>
              </pre>
            </div>
          </div>

          <div className="mt-4 text-xs text-gray-400">Files over 1MB are not included in the code.</div>
        </div>
      </div>
    </div>
  )
}
