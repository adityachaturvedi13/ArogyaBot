/**
 * InputBar — Chat input with auto-resizing textarea, send button, and location toggle.
 * Sticky at the bottom of the screen. Mobile-first design.
 */

'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { useChatStore } from '@/store/chatStore'
import { useLocation } from '@/hooks/useLocation'
import LocationPrompt from './LocationPrompt'

interface InputBarProps {
  /** Callback when the user sends a message */
  onSend: (text: string) => void
  /** Whether the AI is currently streaming a response */
  isStreaming: boolean
}

/** Maximum characters allowed in a message */
const MAX_CHARS = 500

/**
 * Chat input bar with auto-resizing textarea, send button, and location toggle.
 * Enter sends the message; Shift+Enter adds a newline.
 */
export default function InputBar({ onSend, isStreaming }: InputBarProps) {
  const [text, setText] = useState('')
  const [showLocation, setShowLocation] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const userCity = useChatStore((state) => state.userCity)
  const { setCity } = useLocation()

  /** Auto-resize the textarea based on content */
  const resizeTextarea = useCallback(() => {
    const textarea = textareaRef.current
    if (!textarea) return
    textarea.style.height = 'auto'
    const maxHeight = 4 * 24 // 4 rows × ~24px line height
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`
  }, [])

  useEffect(() => {
    resizeTextarea()
  }, [text, resizeTextarea])

  /** Handle sending the message */
  const handleSend = useCallback(() => {
    const trimmed = text.trim()
    if (!trimmed || isStreaming) return
    onSend(trimmed)
    setText('')
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }, [text, isStreaming, onSend])

  /** Handle keyboard events — Enter sends, Shift+Enter adds newline */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  /** Handle text change with character limit */
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    if (value.length <= MAX_CHARS) {
      setText(value)
    }
  }

  /** Set text from external sources (like quick reply chips) */
  const setInputText = useCallback((newText: string) => {
    setText(newText)
  }, [])

  // Expose setInputText via a global ref so WelcomeMessage can use it
  useEffect(() => {
    (window as unknown as Record<string, unknown>).__arogyabot_setInput = setInputText;
    return () => {
      delete (window as unknown as Record<string, unknown>).__arogyabot_setInput;
    }
  }, [setInputText])

  return (
    <div className="sticky bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-100">
      {/* Location prompt (slides up above input) */}
      <LocationPrompt
        isOpen={showLocation}
        onClose={() => setShowLocation(false)}
        onSave={(city) => setCity(city)}
        currentCity={userCity}
      />

      {/* Input area */}
      <div className="max-w-2xl mx-auto px-3 py-2.5 sm:px-4">
        <div className="flex items-end gap-2">
          {/* Location button */}
          <button
            onClick={() => setShowLocation(!showLocation)}
            className={`flex-shrink-0 p-2 rounded-full transition-all duration-150
              ${
                userCity
                  ? 'text-teal-600 bg-teal-50 hover:bg-teal-100'
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
              }
              ${showLocation ? 'ring-2 ring-teal-500 ring-offset-1' : ''}
            `}
            aria-label={userCity ? `Location: ${userCity}` : 'Set your location'}
            title={userCity ? `📍 ${userCity}` : 'Set your city'}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>

          {/* Textarea container */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Type your health question..."
              disabled={isStreaming}
              rows={1}
              className="w-full resize-none text-sm text-slate-800 bg-gray-50 border border-gray-200 
                rounded-2xl px-4 py-2.5 pr-10
                focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:bg-white
                placeholder:text-gray-400
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-150"
              aria-label="Type your health question"
              style={{ maxHeight: `${4 * 24}px` }}
            />

            {/* Character counter — shown when > 400 chars */}
            {text.length > 400 && (
              <span
                className={`absolute bottom-1 right-12 text-[10px] ${
                  text.length >= MAX_CHARS ? 'text-red-500' : 'text-gray-400'
                }`}
              >
                {text.length}/{MAX_CHARS}
              </span>
            )}
          </div>

          {/* Send button */}
          <button
            onClick={handleSend}
            disabled={!text.trim() || isStreaming}
            className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 
              text-white flex items-center justify-center
              hover:from-teal-600 hover:to-teal-800
              active:scale-90 transition-all duration-150
              disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100
              shadow-md hover:shadow-lg"
            aria-label="Send message"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19V5m0 0l-7 7m7-7l7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
