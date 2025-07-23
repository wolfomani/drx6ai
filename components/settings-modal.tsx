"use client"

import { X, Sun, Moon, Monitor } from "lucide-react"

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg font-medium">Settings</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Theme Selection */}
          <div>
            <h3 className="text-sm font-medium mb-3">Theme</h3>
            <div className="flex gap-2">
              <button className="flex items-center justify-center w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-lg">
                <Sun size={20} />
              </button>
              <button className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg">
                <Moon size={20} />
              </button>
              <button className="flex items-center justify-center w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-lg">
                <Monitor size={20} />
              </button>
            </div>
          </div>

          {/* Autosave Toggle */}
          <div className="flex items-center justify-between">
            <span>Autosave</span>
            <div className="relative">
              <input type="checkbox" className="sr-only" defaultChecked />
              <div className="w-11 h-6 bg-blue-600 rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-1">
            <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-700 rounded-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14,2 14,8 20,8" />
              </svg>
              Terms of service
            </button>

            <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-700 rounded-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Privacy policy
            </button>

            <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-700 rounded-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Send feedback
            </button>

            <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-700 rounded-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              Billing Support
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
