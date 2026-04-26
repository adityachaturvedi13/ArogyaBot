/**
 * Shared utility functions for ArogyaBot.
 */

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes with clsx.
 * Combines conditional class names and resolves Tailwind conflicts.
 *
 * @param inputs - Class values to merge
 * @returns Merged class name string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Format a Date object to HH:MM time string.
 *
 * @param date - The date to format
 * @returns Time string in HH:MM format
 */
export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date)
}

/**
 * Truncate a string to a maximum length with ellipsis.
 *
 * @param text - The text to truncate
 * @param maxLength - Maximum character length
 * @returns Truncated string
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - 3) + '...'
}

/**
 * Debounce a function call.
 *
 * @param fn - The function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

/**
 * Check if a string contains a myth/fact block pattern.
 * Used to detect structured myth responses from the AI.
 *
 * @param text - The message text to check
 * @returns true if the text contains a myth/fact pattern
 */
export function containsMythBlock(text: string): boolean {
  return (
    (text.includes('🚫') && text.includes('✅')) ||
    (text.toLowerCase().includes('myth:') && text.toLowerCase().includes('fact:'))
  )
}

/**
 * Parse a myth/fact block from AI response text.
 * Extracts myth, fact, and why sections.
 *
 * @param text - The full message text
 * @returns Parsed myth block or null if not found
 */
export function parseMythBlock(text: string): {
  myth: string
  fact: string
  why: string
  remainingText: string
} | null {
  // Match patterns like:
  // 🚫 MYTH: ... or 🚫 **MYTH:** ...
  // ✅ FACT: ... or ✅ **FACT:** ...
  // 💡 WHY: ... or 💡 **WHY:** ...
  const mythMatch = text.match(/🚫\s*\*{0,2}MYTH:?\*{0,2}\s*(.+?)(?=✅|$)/s)
  const factMatch = text.match(/✅\s*\*{0,2}FACT:?\*{0,2}\s*(.+?)(?=💡|$)/s)
  const whyMatch = text.match(/💡\s*\*{0,2}WHY:?\*{0,2}\s*(.+?)(?=\n\n|$)/s)

  if (!mythMatch || !factMatch) return null

  // Find where the myth block ends to extract remaining text
  const lastMatch = whyMatch || factMatch
  const blockEnd = text.indexOf(lastMatch[0]) + lastMatch[0].length
  const remainingText = text.slice(blockEnd).trim()

  return {
    myth: mythMatch[1].trim(),
    fact: factMatch[1].trim(),
    why: whyMatch ? whyMatch[1].trim() : '',
    remainingText,
  }
}

/**
 * Generate a unique ID for messages.
 *
 * @returns A unique string ID
 */
export function generateId(): string {
  return crypto.randomUUID()
}
