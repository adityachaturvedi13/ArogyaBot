/**
 * LanguageSelector — Dropdown for selecting the chat language.
 * Shows language names in both English and native script.
 */

'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/hooks/useLanguage'
import { Language } from '@/types'

/**
 * Language picker dropdown for the navbar.
 * Shows the current language and a dropdown of all supported languages.
 */
export default function LanguageSelector() {
  const { language, setLanguage, supportedLanguages } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (lang: Language) => {
    setLanguage(lang)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 
          bg-gray-50 border border-gray-200 rounded-lg
          hover:bg-gray-100 hover:border-gray-300 
          active:scale-95 transition-all duration-150"
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span>{language.flag}</span>
        <span className="hidden sm:inline">{language.nativeName}</span>
        <span className="sm:hidden">{language.code.toUpperCase()}</span>
        <svg
          className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 top-full mt-1 w-56 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50"
            role="listbox"
            aria-label="Available languages"
          >
            {supportedLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left
                  hover:bg-teal-50 transition-colors
                  ${
                    lang.code === language.code
                      ? 'bg-teal-50 text-teal-700 font-medium'
                      : 'text-slate-700'
                  }`}
                role="option"
                aria-selected={lang.code === language.code}
              >
                <span className="text-base">{lang.flag}</span>
                <div className="flex-1">
                  <span className="block">{lang.nativeName}</span>
                  <span className="block text-xs text-gray-400">
                    {lang.name} ({lang.code.toUpperCase()})
                  </span>
                </div>
                {lang.code === language.code && (
                  <svg
                    className="w-4 h-4 text-teal-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
