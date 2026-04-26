/**
 * WelcomeMessage — First-time greeting shown as the first bot message.
 * Includes quick-reply chips that pre-fill the input bar.
 */

'use client'

import { motion } from 'framer-motion'
import { QuickReply } from '@/types'

/** Quick reply chips shown in the welcome message */
const QUICK_REPLIES: QuickReply[] = [
  {
    emoji: '💊',
    label: 'Common symptoms',
    message: 'What are the common symptoms of dengue fever?',
  },
  {
    emoji: '🛡️',
    label: 'Prevention tips',
    message: 'How can I prevent malaria during monsoon season?',
  },
  {
    emoji: '🏥',
    label: 'Find hospitals',
    message: 'Can you help me find a hospital near me?',
  },
  {
    emoji: '🔍',
    label: 'Bust a myth',
    message: 'Is it true that drinking hot water can cure COVID?',
  },
]

interface WelcomeMessageProps {
  /** Callback when a quick reply chip is clicked */
  onQuickReply: (message: string) => void
}

/**
 * Welcome message rendered as the first bot bubble in a fresh session.
 * Shows a greeting and quick-reply action chips.
 */
export default function WelcomeMessage({ onQuickReply }: WelcomeMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex items-start gap-2 mb-4"
    >
      {/* Bot avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white text-xs font-bold shadow-sm">
        🌿
      </div>

      {/* Welcome bubble */}
      <div className="max-w-[85%] sm:max-w-[75%]">
        <div className="bg-white rounded-tr-2xl rounded-br-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-100">
          {/* Greeting */}
          <p className="text-base text-slate-800 mb-2">
            <span className="text-xl">👋</span> Hi! I&apos;m <strong>ArogyaBot</strong>.
          </p>
          <p className="text-sm text-slate-600 mb-3 leading-relaxed">
            Ask me anything about your health — symptoms, prevention, myths, or
            local healthcare options. I provide verified information from WHO, CDC,
            and MoHFW.
          </p>

          {/* Quick reply chips */}
          <div className="flex flex-wrap gap-2">
            {QUICK_REPLIES.map((reply) => (
              <button
                key={reply.label}
                onClick={() => onQuickReply(reply.message)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium 
                  text-teal-700 bg-teal-50 border border-teal-200 rounded-full
                  hover:bg-teal-100 hover:border-teal-300 
                  active:scale-95 transition-all duration-150"
                aria-label={reply.label}
              >
                <span>{reply.emoji}</span>
                {reply.label}
              </button>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-[10px] text-gray-400 mt-1.5 ml-1">
          ⚕️ Not a diagnostic tool. Always consult a doctor for medical advice.
        </p>
      </div>
    </motion.div>
  )
}
