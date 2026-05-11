/**
 * Supported languages configuration for ArogyaBot.
 * Each entry maps a language code to its display name, native script name, and flag emoji.
 */

import { Language, LanguageCode } from '@/types'
export type { LanguageCode } from '@/types'


/** All languages supported by ArogyaBot */
export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇮🇳' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
]

/** The default language used when no preference is set */
export const DEFAULT_LANGUAGE: Language = SUPPORTED_LANGUAGES[0]

/**
 * Find a Language object by its code.
 * @param code - The language code to look up
 * @returns The matching Language or the default (English)
 */
export function getLanguageByCode(code: LanguageCode): Language {
  return SUPPORTED_LANGUAGES.find((lang) => lang.code === code) ?? DEFAULT_LANGUAGE
}

/**
 * Map of language codes to their full names (used in system prompt).
 * Gemini needs the full language name to generate responses in the correct language.
 */
export const LANGUAGE_FULL_NAMES: Record<LanguageCode, string> = {
  en: 'English',
  hi: 'Hindi',
  ta: 'Tamil',
  bn: 'Bengali',
  mr: 'Marathi',
  te: 'Telugu',
  kn: 'Kannada',
  gu: 'Gujarati',
}
