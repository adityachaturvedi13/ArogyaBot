/**
 * Homepage — The chat IS the landing page.
 * No separate landing page, no "Get Started" button, no modals.
 * User opens the URL → immediately sees the chat interface.
 */

import ChatShell from '@/components/chat/ChatShell'

/**
 * The homepage renders the full ChatShell component directly.
 * Zero friction — open the app, start chatting.
 */
export default function HomePage() {
  return <ChatShell />
}
