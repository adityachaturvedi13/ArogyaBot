/**
 * Anonymous session management for ArogyaBot.
 * Sessions are tracked purely client-side using a UUID stored in localStorage.
 * No authentication. No user accounts. Zero friction.
 */

const SESSION_KEY = 'arogyabot_session_id'

/**
 * Get the current anonymous session ID.
 * If no session exists, generates a new UUID and stores it in localStorage.
 *
 * @returns The session UUID string (empty string on server-side)
 */
export function getSessionId(): string {
  if (typeof window === 'undefined') return ''

  let id = localStorage.getItem(SESSION_KEY)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(SESSION_KEY, id)
  }
  return id
}

/**
 * Reset the current session by generating a new UUID.
 * Called when the user clicks "Clear Chat" to start a fresh conversation.
 *
 * @returns The new session UUID string
 */
export function resetSession(): string {
  const id = crypto.randomUUID()
  localStorage.setItem(SESSION_KEY, id)
  return id
}

/**
 * Check if a session ID exists in localStorage.
 *
 * @returns true if a session ID is already stored
 */
export function hasExistingSession(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(SESSION_KEY) !== null
}
