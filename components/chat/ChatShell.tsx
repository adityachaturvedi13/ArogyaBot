/**
 * ChatShell — Full-page chat layout wrapper.
 * Composes the Navbar, ChatWindow, InputBar, and EmergencyBanner.
 * This is the entire app UI — no other pages needed.
 */

'use client'

import { useEffect } from 'react'
import { useChatStore } from '@/store/chatStore'
import { useChat } from '@/hooks/useChat'
import Navbar from '@/components/layout/Navbar'
import ChatWindow from './ChatWindow'
import InputBar from './InputBar'
import EmergencyBanner from './EmergencyBanner'

/**
 * Full-page chat shell layout.
 * Initializes the session on mount and composes all chat components.
 */
export default function ChatShell() {
  const initSession = useChatStore((state) => state.initSession)
  const { sendMessage, isStreaming } = useChat()

  // Initialize session on mount
  useEffect(() => {
    initSession()
  }, [initSession])

  return (
    <div className="flex flex-col h-dvh bg-warmWhite">
      {/* Emergency banner (fixed top, only shows when emergency detected) */}
      <EmergencyBanner />

      {/* Top navbar */}
      <Navbar />

      {/* Chat messages area (scrollable, fills available space) */}
      <ChatWindow />

      {/* Input bar (sticky bottom) */}
      <InputBar onSend={sendMessage} isStreaming={isStreaming} />
    </div>
  )
}
