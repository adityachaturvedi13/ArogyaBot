/**
 * LocationPrompt — Subtle slide-up panel for city input.
 * Appears above the InputBar when the user taps the location icon.
 */

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LocationPromptProps {
  /** Whether the prompt is visible */
  isOpen: boolean
  /** Callback when the prompt is dismissed */
  onClose: () => void
  /** Callback when the user saves their city */
  onSave: (city: string) => void
  /** Current city value */
  currentCity?: string | null
}

/**
 * City input panel that slides up above the input bar.
 * Not a modal — a subtle inline panel.
 */
export default function LocationPrompt({
  isOpen,
  onClose,
  onSave,
  currentCity,
}: LocationPromptProps) {
  const [city, setCity] = useState(currentCity || '')

  const handleSave = () => {
    if (city.trim()) {
      onSave(city.trim())
      onClose()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: 20, height: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="overflow-hidden"
        >
          <div className="bg-white border-t border-gray-100 px-4 py-3">
            <div className="flex items-center gap-2 max-w-2xl mx-auto">
              <span className="text-lg flex-shrink-0">📍</span>
              <div className="flex-1">
                <label
                  htmlFor="city-input"
                  className="block text-xs font-medium text-gray-500 mb-1"
                >
                  Your city (for nearby healthcare options)
                </label>
                <input
                  id="city-input"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="e.g., Mumbai, Delhi, Bengaluru..."
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-1.5 
                    focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500
                    placeholder:text-gray-400"
                  autoFocus
                  aria-label="Enter your city"
                />
              </div>
              <button
                onClick={handleSave}
                disabled={!city.trim()}
                className="px-4 py-1.5 text-sm font-medium text-white bg-teal-600 rounded-lg
                  hover:bg-teal-700 active:scale-95 transition-all duration-150
                  disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Save city"
              >
                Save
              </button>
              <button
                onClick={onClose}
                className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close location prompt"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
