/**
 * MessageBubble — Renders an individual chat message.
 * User messages are right-aligned (teal), bot messages left-aligned (white).
 * Parses myth/fact patterns and renders MythFactCard inline.
 */

'use client'

import { motion } from 'framer-motion'
import { Message } from '@/types'
import { formatTime, parseMythBlock, containsMythBlock } from '@/lib/utils'
import MythFactCard from './MythFactCard'
import FeedbackButtons from './FeedbackButtons'

interface MessageBubbleProps {
  /** The message to render */
  message: Message
  /** Whether this is the last message (used for streaming indicator) */
  isLast?: boolean
  /** Whether the AI is currently streaming */
  isStreaming?: boolean
}

/**
 * Renders markdown-like text with basic formatting.
 * Supports bold (**text**), bullet points, and line breaks.
 */
function renderFormattedText(text: string) {
  const lines = text.split('\n')

  return lines.map((line, i) => {
    // Bold text
    const formattedLine = line.replace(
      /\*\*(.*?)\*\*/g,
      '<strong>$1</strong>'
    )

    // Bullet points
    if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
      const bulletText = line.trim().replace(/^[-•]\s*/, '')
      const formattedBullet = bulletText.replace(
        /\*\*(.*?)\*\*/g,
        '<strong>$1</strong>'
      )
      return (
        <div key={i} className="flex items-start gap-1.5 ml-1">
          <span className="text-teal-500 mt-0.5 flex-shrink-0">•</span>
          <span dangerouslySetInnerHTML={{ __html: formattedBullet }} />
        </div>
      )
    }

    // Empty lines become spacing
    if (line.trim() === '') {
      return <div key={i} className="h-2" />
    }

    return (
      <span
        key={i}
        dangerouslySetInnerHTML={{ __html: formattedLine }}
        className="block"
      />
    )
  })
}

/**
 * Individual message bubble with role-based styling.
 * Detects myth/fact patterns and renders MythFactCard inline.
 */
export default function MessageBubble({
  message,
  isLast = false,
  isStreaming = false,
}: MessageBubbleProps) {
  const isUser = message.role === 'user'
  const isBot = message.role === 'assistant'
  const showFeedback = isBot && message.content.length > 0 && !(isLast && isStreaming)

  // Check for myth/fact block in bot messages
  const mythData = isBot && containsMythBlock(message.content)
    ? parseMythBlock(message.content)
    : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`flex items-start gap-2 mb-4 group ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      {/* Avatar */}
      {isBot && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white text-xs font-bold shadow-sm">
          🌿
        </div>
      )}

      {/* Message content */}
      <div
        className={`max-w-[85%] sm:max-w-[75%] ${isUser ? 'items-end' : 'items-start'}`}
      >
        {/* Bubble */}
        <div
          className={`px-4 py-2.5 text-sm leading-relaxed ${
            isUser
              ? 'bg-gradient-to-br from-teal-600 to-teal-700 text-white rounded-tl-2xl rounded-bl-2xl rounded-tr-sm rounded-br-2xl'
              : 'bg-white text-slate-800 rounded-tr-2xl rounded-br-2xl rounded-tl-sm shadow-sm border border-gray-100'
          }`}
        >
          {/* If myth block detected, render it specially */}
          {mythData ? (
            <>
              <MythFactCard
                myth={mythData.myth}
                fact={mythData.fact}
                why={mythData.why}
              />
              {mythData.remainingText && (
                <div className="mt-2">
                  {renderFormattedText(mythData.remainingText)}
                </div>
              )}
            </>
          ) : (
            <div>{renderFormattedText(message.content)}</div>
          )}

          {/* Streaming cursor */}
          {isLast && isStreaming && (
            <span className="inline-block w-1.5 h-4 bg-teal-500 ml-0.5 animate-pulse rounded-sm" />
          )}
        </div>

        {/* Timestamp */}
        <p
          className={`text-[10px] text-gray-400 mt-1 ${
            isUser ? 'text-right mr-1' : 'ml-1'
          }`}
        >
          {formatTime(
            message.timestamp instanceof Date
              ? message.timestamp
              : new Date(message.timestamp)
          )}
        </p>

        {/* Feedback buttons for bot messages */}
        {showFeedback && (
          <div className={isUser ? 'flex justify-end' : ''}>
            <FeedbackButtons
              messageId={message.id}
              feedbackGiven={message.feedbackGiven}
            />
          </div>
        )}
      </div>
    </motion.div>
  )
}
