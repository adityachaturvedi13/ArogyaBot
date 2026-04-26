/**
 * MythFactCard — Structured display card for myth/fact corrections.
 * Shows the myth (with strikethrough), verified fact, and explanation.
 * Used within MessageBubble when the AI detects misinformation.
 */

'use client'

import { motion } from 'framer-motion'

interface MythFactCardProps {
  /** The myth text to display (shown with strikethrough) */
  myth: string
  /** The verified fact text */
  fact: string
  /** Brief explanation of why the myth is wrong */
  why: string
}

/**
 * Structured myth/fact correction card with distinct visual styling.
 * Slides up and fades in when rendered.
 */
export default function MythFactCard({ myth, fact, why }: MythFactCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="my-3 rounded-xl overflow-hidden border border-gray-200 shadow-sm"
    >
      {/* Myth row */}
      <div className="flex items-start gap-3 px-4 py-3 bg-red-50 border-l-4 border-red-400">
        <span className="flex-shrink-0 text-lg mt-0.5">🚫</span>
        <div>
          <p className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-1">
            Myth
          </p>
          <p className="text-sm text-red-800 line-through decoration-red-400">
            {myth}
          </p>
        </div>
      </div>

      {/* Fact row */}
      <div className="flex items-start gap-3 px-4 py-3 bg-green-50 border-l-4 border-green-400">
        <span className="flex-shrink-0 text-lg mt-0.5">✅</span>
        <div>
          <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-1">
            Fact
          </p>
          <p className="text-sm text-green-800 font-medium">{fact}</p>
        </div>
      </div>

      {/* Why row */}
      {why && (
        <div className="flex items-start gap-3 px-4 py-3 bg-amber-50 border-l-4 border-amber-400">
          <span className="flex-shrink-0 text-lg mt-0.5">💡</span>
          <div>
            <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-1">
              Why
            </p>
            <p className="text-sm text-amber-800">{why}</p>
          </div>
        </div>
      )}

      {/* Source badge */}
      <div className="px-4 py-2 bg-gray-50 flex justify-end">
        <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-white px-2 py-1 rounded-full border border-gray-200">
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          Verified by WHO / CDC / MoHFW
        </span>
      </div>
    </motion.div>
  )
}
