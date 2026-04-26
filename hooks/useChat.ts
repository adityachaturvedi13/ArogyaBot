/**
 * Core chat hook for ArogyaBot.
 * Manages sending messages, streaming AI responses, and conversation history.
 * Used by InputBar and ChatWindow components.
 */

'use client'

import { useCallback } from 'react'
import { useChatStore } from '@/store/chatStore'
import { isEmergency } from '@/lib/ai/emergencyDetector'
import { GeminiMessage, Message } from '@/types'

/**
 * Convert UI messages to Gemini API format.
 * Gemini expects role 'model' instead of 'assistant'.
 *
 * @param messages - UI message array
 * @returns Gemini-formatted message history
 */
function formatForGemini(messages: Message[]): GeminiMessage[] {
  return messages
    .filter((msg) => msg.content.trim().length > 0)
    .map((msg) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }))
}

/**
 * Core chat hook providing send, stream, and history management.
 *
 * @returns Chat actions and state
 */
export function useChat() {
  const {
    messages,
    isStreaming,
    selectedLanguage,
    userCity,
    sessionId,
    addMessage,
    appendToLastMessage,
    setStreaming,
    triggerEmergency,
    clearChat,
  } = useChatStore()

  /**
   * Send a message to the AI and stream the response.
   *
   * @param text - The user's message text
   */
  const sendMessage = useCallback(
    async (text: string) => {
      const trimmedText = text.trim()
      if (!trimmedText || isStreaming) return

      // 1. Add user message to store
      addMessage({
        role: 'user',
        content: trimmedText,
      })

      // 2. Set streaming state
      setStreaming(true)

      // 3. Add empty assistant message (will be filled by stream)
      addMessage({
        role: 'assistant',
        content: '',
      })

      // 4. Check for emergency synchronously
      const emergencyDetected = isEmergency(trimmedText)
      if (emergencyDetected) {
        triggerEmergency()
      }

      try {
        // 5. Format history for Gemini (exclude the empty assistant message we just added)
        const historyMessages = useChatStore.getState().messages.slice(0, -1)
        // Exclude the latest user message from history since we send it as the current message
        const historyForGemini = formatForGemini(historyMessages.slice(0, -1))

        // 6. POST to /api/chat with streaming
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: historyForGemini,
            language: selectedLanguage.code,
            city: userCity || undefined,
            sessionId,
            userMessage: trimmedText,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
          throw new Error(errorData.error || `Server error: ${response.status}`)
        }

        // 7. Read the stream and append chunks
        const reader = response.body?.getReader()
        if (!reader) {
          throw new Error('No response stream available')
        }

        const decoder = new TextDecoder()

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          if (chunk) {
            appendToLastMessage(chunk)
          }
        }
      } catch (error) {
        // 9. On error: update last message with error text
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Something went wrong. Please try again.'

        // Replace the empty assistant message with the error
        const currentMessages = useChatStore.getState().messages
        const lastMsg = currentMessages[currentMessages.length - 1]
        if (lastMsg && lastMsg.role === 'assistant' && lastMsg.content === '') {
          appendToLastMessage(
            `⚠️ I'm sorry, I couldn't process your request: ${errorMessage}`
          )
        }
      } finally {
        // 8. Stream ended
        setStreaming(false)
      }
    },
    [
      isStreaming,
      addMessage,
      setStreaming,
      appendToLastMessage,
      triggerEmergency,
      selectedLanguage.code,
      userCity,
      sessionId,
    ]
  )

  return {
    messages,
    isStreaming,
    sendMessage,
    clearChat,
  }
}
