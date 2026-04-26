/**
 * Language selection hook for ArogyaBot.
 * Reads and writes language preference from/to the Zustand store.
 */

'use client'

import { useChatStore } from '@/store/chatStore'
import { Language } from '@/types'
import { SUPPORTED_LANGUAGES } from '@/lib/constants/languages'

/**
 * Hook for managing the user's language preference.
 *
 * @returns Language state and actions
 */
export function useLanguage() {
  const selectedLanguage = useChatStore((state) => state.selectedLanguage)
  const setLanguage = useChatStore((state) => state.setLanguage)

  return {
    /** The currently selected language */
    language: selectedLanguage,
    /** The language code (e.g., 'en', 'hi') */
    languageCode: selectedLanguage.code,
    /** The language name in English */
    languageLabel: selectedLanguage.name,
    /** The language name in its native script */
    languageNativeLabel: selectedLanguage.nativeName,
    /** Update the selected language */
    setLanguage: (lang: Language) => setLanguage(lang),
    /** All available languages */
    supportedLanguages: SUPPORTED_LANGUAGES,
  }
}
