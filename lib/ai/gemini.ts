/**
 * Google Gemini AI client initialization for ArogyaBot.
 * Server-side only — never import this in client components.
 */

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  type GenerativeModel,
  type GenerationConfig,
  type SafetySetting,
} from '@google/generative-ai'

/** Generation config tuned for health information — lower temperature for factual accuracy */
const GENERATION_CONFIG: GenerationConfig = {
  temperature: 0.4,
  topK: 40,
  topP: 0.95,
  maxOutputTokens: 1024,
}

/** Safety settings — block medium and above for all harm categories */
const SAFETY_SETTINGS: SafetySetting[] = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
]

/** Singleton Gemini client instance */
let genAI: GoogleGenerativeAI | null = null

/**
 * Get or create the GoogleGenerativeAI client instance.
 * @returns GoogleGenerativeAI client
 * @throws Error if GEMINI_API_KEY is not set
 */
function getClient(): GoogleGenerativeAI {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      throw new Error(
        'GEMINI_API_KEY is not set. Get a free key at https://aistudio.google.com/app/apikey'
      )
    }
    genAI = new GoogleGenerativeAI(apiKey)
  }
  return genAI
}

/**
 * Get a configured Gemini generative model instance.
 * Uses gemini-1.5-flash for fast, cost-effective responses.
 *
 * @param systemInstruction - The system prompt to configure the model behavior
 * @returns A configured GenerativeModel instance
 */
export function getGeminiModel(systemInstruction?: string): GenerativeModel {
  const client = getClient()

  return client.getGenerativeModel({
    model: 'gemini-2.5-flash',
    generationConfig: GENERATION_CONFIG,
    safetySettings: SAFETY_SETTINGS,
    ...(systemInstruction ? { systemInstruction } : {}),
  })
}

/**
 * Export generation config for use in chat sessions that need to override defaults.
 */
export { GENERATION_CONFIG, SAFETY_SETTINGS }
