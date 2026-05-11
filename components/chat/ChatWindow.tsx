/**
 * ChatWindow — Scrollable message list with auto-scroll and typing indicator.
 * The core viewport of the chat experience.
 */

'use client'

import { useEffect, useRef, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useChatStore } from '@/store/chatStore'
import { useChat } from '@/hooks/useChat'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'
import WelcomeMessage from './WelcomeMessage'

/**
 * Scrollable chat message list.
 * Auto-scrolls to bottom on new messages.
 * Shows WelcomeMessage for fresh sessions and TypingIndicator during streaming.
 */
export default function ChatWindow() {
  const { messages, isStreaming, sendMessage } = useChat()
  const hasSeenWelcome = useChatStore((state) => state.hasSeenWelcome)
  const scrollRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  /** Auto-scroll to bottom when messages change or streaming updates */
  const lastMessageContent = messages[messages.length - 1]?.content
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length, lastMessageContent, isStreaming])


  /** Handle quick reply chip clicks from WelcomeMessage */
  const handleQuickReply = useCallback(
    (message: string) => {
      sendMessage(message)
    },
    [sendMessage]
  )

  const showWelcome = !hasSeenWelcome && messages.length === 0

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto scroll-smooth px-3 sm:px-4 pt-4"
      style={{ paddingBottom: '140px' }}
      role="log"
      aria-label="Chat messages"
      aria-live="polite"
    >
      <div className="max-w-2xl mx-auto">
        {/* Welcome message for fresh sessions */}
        {showWelcome && (
          <WelcomeMessage onQuickReply={handleQuickReply} />
        )}

        {/* Message list */}
        <AnimatePresence mode="popLayout">
          {messages.map((msg, index) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isLast={index === messages.length - 1}
              isStreaming={isStreaming}
            />
          ))}
        </AnimatePresence>

        {/* Typing indicator — shown when streaming and the last message is empty */}
        <AnimatePresence>
          {isStreaming &&
            messages.length > 0 &&
            messages[messages.length - 1]?.content === '' && (
              <TypingIndicator />
            )}
        </AnimatePresence>

        {/* Scroll anchor */}
        <div ref={bottomRef} className="h-1" />
      </div>
    </div>
  )
}
