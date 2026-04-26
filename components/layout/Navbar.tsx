/**
 * Navbar — Minimal top bar with logo, language selector, and clear chat button.
 * Height: 56px, sticky top, white background.
 */

'use client'

import { useChatStore } from '@/store/chatStore'
import LanguageSelector from '@/components/chat/LanguageSelector'

/**
 * Top navigation bar with branding, language selector, and clear chat.
 */
export default function Navbar() {
  const clearChat = useChatStore((state) => state.clearChat)

  const handleClearChat = () => {
    const confirmed = window.confirm(
      'Are you sure you want to clear this conversation? This cannot be undone.'
    )
    if (confirmed) {
      clearChat()
    }
  }

  return (
    <nav
      className="sticky top-0 z-40 h-14 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 shadow-sm"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Left: Logo + Brand */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-sm">
          <span className="text-sm">🌿</span>
        </div>
        <div>
          <h1
            className="text-lg font-bold text-slate-800 leading-none"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            ArogyaBot
          </h1>
          <p className="text-[9px] text-gray-400 leading-none mt-0.5 hidden sm:block">
            Verified Health • Zero Misinformation
          </p>
        </div>
      </div>

      {/* Right: Language + Clear Chat */}
      <div className="flex items-center gap-2">
        <LanguageSelector />

        {/* Clear Chat Button */}
        <button
          onClick={handleClearChat}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-150"
          aria-label="Clear chat and start a new conversation"
          title="Clear chat"
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </nav>
  )
}
