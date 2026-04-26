/**
 * ArogyaBot — Shared TypeScript Interfaces
 * All types used across the application are defined here.
 */

// ─── Intent Classification ────────────────────────────────────────────────────

/** Categories for classifying user intent */
export type IntentCategory =
  | 'symptoms'
  | 'prevention'
  | 'myth'
  | 'location'
  | 'emergency'
  | 'general'

// ─── AI Modules ────────────────────────────────────────────────────────────────

/** Modules used by the AI to generate responses */
export type ModuleUsed = 'VIR' | 'PMC' | 'CARE' | 'EMERGENCY' | 'GENERAL'

// ─── Language ──────────────────────────────────────────────────────────────────

/** Supported language codes */
export type LanguageCode = 'en' | 'hi' | 'ta' | 'bn' | 'mr' | 'te' | 'kn' | 'gu'

/** Language configuration object */
export interface Language {
  code: LanguageCode
  name: string
  nativeName: string
  flag: string
}

// ─── Messages ──────────────────────────────────────────────────────────────────

/** A single chat message in the UI */
export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  intentCategory?: IntentCategory
  moduleUsed?: ModuleUsed
  isEmergency?: boolean
  feedbackGiven?: 'helpful' | 'not_helpful' | null
}

/** Message format expected by the Gemini API */
export interface GeminiMessage {
  role: 'user' | 'model'
  parts: { text: string }[]
}

// ─── Chat API ──────────────────────────────────────────────────────────────────

/** Request body sent to /api/chat */
export interface ChatRequest {
  messages: GeminiMessage[]
  language: LanguageCode
  city?: string
  sessionId: string
  userMessage: string
}

// ─── Logging API ───────────────────────────────────────────────────────────────

/** Request body sent to /api/log */
export interface LogRequest {
  sessionId: string
  role: 'user' | 'assistant'
  content: string
  intentCategory?: IntentCategory
  moduleUsed?: ModuleUsed
  isEmergency?: boolean
  city?: string
}

// ─── Database Models ───────────────────────────────────────────────────────────

/** Sessions table row */
export interface Session {
  id: string
  started_at: string
  last_active: string
  language_used: string
  city: string | null
  message_count: number
}

/** Messages table row */
export interface DBMessage {
  id: string
  session_id: string
  role: 'user' | 'assistant'
  content: string
  intent_category: IntentCategory | null
  module_used: ModuleUsed | null
  is_emergency: boolean
  created_at: string
}

/** Myths table row */
export interface Myth {
  id: string
  myth_text: string
  fact_text: string
  explanation: string | null
  category: string
  language: string
  source_url: string | null
  verified_by: 'WHO' | 'CDC' | 'MoHFW'
  created_at: string
}

/** Health resources table row */
export interface HealthResource {
  id: string
  name: string
  type: 'hospital' | 'clinic' | 'vaccination_center' | 'pharmacy'
  city: string
  state: string
  pincode: string | null
  address: string | null
  phone: string | null
  is_govt: boolean
}

/** Feedback table row */
export interface Feedback {
  id: string
  message_id: string
  was_helpful: boolean
  created_at: string
}

// ─── Helplines ─────────────────────────────────────────────────────────────────

/** A helpline entry */
export interface Helpline {
  name: string
  number: string
  scope: 'national' | 'state'
  state?: string
}

// ─── Location API ──────────────────────────────────────────────────────────────

/** Response from /api/location */
export interface LocationResponse {
  resources: HealthResource[]
  helplines: Helpline[]
}

// ─── Quick Reply Chips ─────────────────────────────────────────────────────────

/** Quick reply button shown in welcome message */
export interface QuickReply {
  emoji: string
  label: string
  message: string
}

// ─── Chat Store ────────────────────────────────────────────────────────────────

/** Zustand chat store interface */
export interface ChatStore {
  // State
  messages: Message[]
  isStreaming: boolean
  selectedLanguage: Language
  userCity: string | null
  sessionId: string
  emergencyDetected: boolean
  hasSeenWelcome: boolean

  // Actions
  addMessage: (msg: Omit<Message, 'id' | 'timestamp'>) => void
  appendToLastMessage: (chunk: string) => void
  setStreaming: (v: boolean) => void
  setLanguage: (lang: Language) => void
  setCity: (city: string) => void
  triggerEmergency: () => void
  dismissEmergency: () => void
  clearChat: () => void
  initSession: () => void
  setFeedback: (messageId: string, feedback: 'helpful' | 'not_helpful') => void
}
