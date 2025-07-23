"use client"

import {
  X,
  MessageSquare,
  Radio,
  ImageIcon,
  Wrench,
  History,
  FileText,
  BarChart3,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { useState } from "react"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [historyExpanded, setHistoryExpanded] = useState(false)
  const [dashboardExpanded, setDashboardExpanded] = useState(false)

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={onClose} />

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-80 bg-gray-800 z-50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h1 className="text-xl font-semibold">Google AI Studio</h1>
            <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
              <X size={20} />
            </button>
          </div>

          {/* Get API Key Button */}
          <div className="p-4">
            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              Get API key
            </button>
          </div>

          {/* Studio Section */}
          <div className="px-4 pb-4">
            <h2 className="text-sm font-medium text-gray-400 mb-3">Studio</h2>
            <div className="space-y-1">
              <button className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-700 rounded-lg bg-gray-700">
                <MessageSquare size={18} />
                Chat
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-700 rounded-lg">
                <Radio size={18} />
                Stream
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-700 rounded-lg">
                <ImageIcon size={18} />
                Generate Media
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-700 rounded-lg">
                <Wrench size={18} />
                Build
              </button>

              {/* History with dropdown */}
              <button
                className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-gray-700 rounded-lg"
                onClick={() => setHistoryExpanded(!historyExpanded)}
              >
                <div className="flex items-center gap-3">
                  <History size={18} />
                  History
                </div>
                {historyExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
            </div>
          </div>

          {/* Documentation */}
          <div className="px-4 pb-4">
            <button className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-700 rounded-lg">
              <FileText size={18} />
              Documentation
              <svg className="w-3 h-3 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Dashboard */}
          <div className="px-4 pb-4">
            <button
              className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-gray-700 rounded-lg"
              onClick={() => setDashboardExpanded(!dashboardExpanded)}
            >
              <div className="flex items-center gap-3">
                <BarChart3 size={18} />
                Dashboard
              </div>
              {dashboardExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
          </div>

          {/* Bottom section */}
          <div className="mt-auto p-4 border-t border-gray-700">
            <div className="text-xs text-gray-400 mb-2">
              Google AI models may make mistakes, so double-check outputs.
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                X
              </div>
              <span className="text-gray-300">wolfonlyoman@gma...</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
