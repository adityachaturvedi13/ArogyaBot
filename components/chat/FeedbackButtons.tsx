/**
 * FeedbackButtons — Thumbs up/down per bot message.
 * Submits anonymous feedback to Supabase.
 */

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useChatStore } from '@/store/chatStore'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'

interface FeedbackButtonsProps {
  /** The message ID to attach feedback to */
  messageId: string
  /** Whether feedback has already been given for this message */
  feedbackGiven?: 'helpful' | 'not_helpful' | null
}

/**
 * Compact thumbs up/down buttons for rating bot responses.
 * Disabled after one click per message.
 */
export default function FeedbackButtons({
  messageId,
  feedbackGiven,
}: FeedbackButtonsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const setFeedback = useChatStore((state) => state.setFeedback)

  /**
   * Submit feedback for this message.
   * @param wasHelpful - true for thumbs up, false for thumbs down
   */
  const handleFeedback = async (wasHelpful: boolean) => {
    if (feedbackGiven || isSubmitting) return

    setIsSubmitting(true)
    const feedbackType = wasHelpful ? 'helpful' : 'not_helpful'

    // Update UI immediately
    setFeedback(messageId, feedbackType)

    // Submit to Supabase (fire-and-forget)
    try {
      const supabase = getSupabaseBrowserClient()
      await supabase.from('feedback').insert({
        message_id: messageId,
        was_helpful: wasHelpful,
      })
    } catch (error) {
      console.error('[FeedbackButtons] Error submitting feedback:', error)
      // Don't revert the UI — feedback submission failure is non-critical
    } finally {
      setIsSubmitting(false)
    }
  }

  if (feedbackGiven) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-1 mt-1"
      >
        <span
          className={`text-xs px-1.5 py-0.5 rounded-full ${
            feedbackGiven === 'helpful'
              ? 'bg-teal-50 text-teal-600'
              : 'bg-red-50 text-red-500'
          }`}
        >
          {feedbackGiven === 'helpful' ? '👍 Helpful' : '👎 Not helpful'}
        </span>
      </motion.div>
    )
  }

  return (
    <div className="flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      <button
        onClick={() => handleFeedback(true)}
        disabled={isSubmitting}
        className="p-1 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded transition-colors disabled:opacity-50"
        aria-label="This response was helpful"
        title="Helpful"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
          />
        </svg>
      </button>
      <button
        onClick={() => handleFeedback(false)}
        disabled={isSubmitting}
        className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
        aria-label="This response was not helpful"
        title="Not helpful"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
          />
        </svg>
      </button>
    </div>
  )
}
