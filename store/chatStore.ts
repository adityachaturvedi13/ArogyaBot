/**
 * Zustand chat store for ArogyaBot.
 * Persists messages, language, city, and session ID to localStorage.
 * Does NOT persist streaming state or emergency detection.
 */

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { ChatStore, Language, Message } from '@/types'
import { DEFAULT_LANGUAGE } from '@/lib/constants/languages'
import { generateId } from '@/lib/utils'
import { getSessionId, resetSession } from '@/lib/session'

/**
 * Custom date reviver for JSON.parse — restores Date objects from ISO strings.
 * Used by the persist middleware to correctly deserialize message timestamps.
 */
function dateReviver(_key: string, value: unknown): unknown {
  if (typeof value === 'string') {
    // Check if it looks like an ISO date string
    const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/
    if (dateRegex.test(value)) {
      const date = new Date(value)
      if (!isNaN(date.getTime())) return date
    }
  }
  return value
}

/** The main Zustand store for chat state and actions */
export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      // ─── State ──────────────────────────────────────────────────────────
      messages: [],
      isStreaming: false,
      selectedLanguage: DEFAULT_LANGUAGE,
      userCity: null,
      sessionId: '',
      emergencyDetected: false,
      hasSeenWelcome: false,

      // ─── Actions ────────────────────────────────────────────────────────

      /**
       * Add a new message to the conversation.
       * Automatically generates an ID and timestamp.
       */
      addMessage: (msg: Omit<Message, 'id' | 'timestamp'>) => {
        const newMessage: Message = {
          ...msg,
          id: generateId(),
          timestamp: new Date(),
        }
        set((state) => ({
          messages: [...state.messages, newMessage],
        }))
      },

      /**
       * Append a text chunk to the last message in the list.
       * Used during streaming to progressively build the assistant's response.
       */
      appendToLastMessage: (chunk: string) => {
        set((state) => {
          const messages = [...state.messages]
          const lastMessage = messages[messages.length - 1]
          if (lastMessage) {
            messages[messages.length - 1] = {
              ...lastMessage,
              content: lastMessage.content + chunk,
            }
          }
          return { messages }
        })
      },

      /** Set the streaming state (true while AI is generating a response) */
      setStreaming: (v: boolean) => set({ isStreaming: v }),

      /** Update the selected language */
      setLanguage: (lang: Language) => set({ selectedLanguage: lang }),

      /** Update the user's city for the CARE module */
      setCity: (city: string) => set({ userCity: city }),

      /** Trigger the emergency banner */
      triggerEmergency: () => set({ emergencyDetected: true }),

      /** Dismiss the emergency banner */
      dismissEmergency: () => set({ emergencyDetected: false }),

      /**
       * Clear all chat messages and start a fresh session.
       * Generates a new session ID so the old conversation is preserved in Supabase.
       */
      clearChat: () => {
        const newSessionId = resetSession()
        set({
          messages: [],
          isStreaming: false,
          emergencyDetected: false,
          hasSeenWelcome: false,
          sessionId: newSessionId,
        })
      },

      /**
       * Initialize the session on first load.
       * Reads or creates the session ID from localStorage.
       */
      initSession: () => {
        const sessionId = getSessionId()
        set({ sessionId })
      },

      /** Set feedback on a specific message */
      setFeedback: (messageId: string, feedback: 'helpful' | 'not_helpful') => {
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg.id === messageId ? { ...msg, feedbackGiven: feedback } : msg
          ),
        }))
      },
    }),
    {
      name: 'arogyabot-chat-store',
      storage: createJSONStorage(() => localStorage, {
        reviver: dateReviver,
      }),
      // Only persist these fields to localStorage
      partialize: (state) => ({
        messages: state.messages,
        selectedLanguage: state.selectedLanguage,
        userCity: state.userCity,
        sessionId: state.sessionId,
        hasSeenWelcome: state.hasSeenWelcome,
      }),
    }
  )
)
