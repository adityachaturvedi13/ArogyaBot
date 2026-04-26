/**
 * ArogyaBot Chat API Route — /api/chat
 * The most critical file in the application.
 *
 * Handles:
 * 1. Emergency detection (synchronous, before any AI call)
 * 2. System prompt construction with language + city context
 * 3. Gemini AI streaming response
 * 4. Fire-and-forget logging to Supabase
 */

import { NextRequest, NextResponse } from 'next/server'
import { getGeminiModel } from '@/lib/ai/gemini'
import { buildSystemPrompt } from '@/lib/ai/systemPrompt'
import { isEmergency, EMERGENCY_RESPONSE } from '@/lib/ai/emergencyDetector'
import { classifyIntent, intentToModule } from '@/lib/ai/classifier'
import { ChatRequest, LanguageCode } from '@/types'

/**
 * POST /api/chat
 * Accepts a chat request with conversation history and streams the AI response.
 */
export async function POST(request: NextRequest): Promise<Response> {
  try {
    // Parse the request body
    const body: ChatRequest = await request.json()
    const { messages, language, city, sessionId, userMessage } = body

    // Validate required fields
    if (!userMessage || !sessionId) {
      return NextResponse.json(
        { error: 'Missing required fields: userMessage and sessionId are required.' },
        { status: 400 }
      )
    }

    // ─── STEP 1: Emergency Detection (synchronous, no API call) ──────────
    if (isEmergency(userMessage)) {
      // Return emergency response immediately as a stream — do NOT call Gemini
      const encoder = new TextEncoder()
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode(EMERGENCY_RESPONSE))
          controller.close()
        },
      })

      // Fire-and-forget: log the emergency
      logMessage(sessionId, 'user', userMessage, 'emergency', 'EMERGENCY', true, city).catch(
        () => {
          // Logging failure should never affect UX
        }
      )
      logMessage(
        sessionId,
        'assistant',
        EMERGENCY_RESPONSE,
        'emergency',
        'EMERGENCY',
        true,
        city
      ).catch(() => {})

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'X-Content-Type-Options': 'nosniff',
          'X-Emergency': 'true',
        },
      })
    }

    // ─── STEP 2: Build system prompt ──────────────────────────────────────
    const systemPrompt = buildSystemPrompt(
      (language || 'en') as LanguageCode,
      city || undefined
    )

    // ─── STEP 3: Initialize Gemini chat with history ──────────────────────
    const model = getGeminiModel(systemPrompt)

    const chat = model.startChat({
      history: messages || [],
    })

    // ─── STEP 4: Stream the response ──────────────────────────────────────
    const result = await chat.sendMessageStream(userMessage)

    let fullResponse = ''
    const encoder = new TextEncoder()

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text()
            if (text) {
              fullResponse += text
              controller.enqueue(encoder.encode(text))
            }
          }
          controller.close()

          // ─── STEP 5: Fire-and-forget logging ────────────────────────
          const intentCategory = classifyIntent(userMessage)
          const moduleUsed = intentToModule(intentCategory)

          // Log user message
          logMessage(
            sessionId,
            'user',
            userMessage,
            intentCategory,
            moduleUsed,
            false,
            city
          ).catch(() => {})

          // Log assistant response
          logMessage(
            sessionId,
            'assistant',
            fullResponse,
            intentCategory,
            moduleUsed,
            false,
            city
          ).catch(() => {})
        } catch (streamError) {
          const errorMessage =
            streamError instanceof Error
              ? streamError.message
              : 'An error occurred while generating the response.'
          controller.enqueue(
            encoder.encode(
              `\n\nI apologize, but I encountered an issue: ${errorMessage}. Please try again.`
            )
          )
          controller.close()
        }
      },
    })

    // ─── STEP 6: Return streaming response ──────────────────────────────
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    })
  } catch (error) {
    console.error('[/api/chat] Error:', error)

    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred.'

    return NextResponse.json({ error: message }, { status: 500 })
  }
}

/**
 * Fire-and-forget function to log a message to Supabase via the /api/log endpoint.
 * Failures are silently ignored — logging must never affect the user experience.
 *
 * @param sessionId - The anonymous session UUID
 * @param role - 'user' or 'assistant'
 * @param content - The message content
 * @param intentCategory - Classified intent
 * @param moduleUsed - AI module that handled the request
 * @param isEmergencyMsg - Whether this was an emergency
 * @param city - User's city (optional)
 */
async function logMessage(
  sessionId: string,
  role: 'user' | 'assistant',
  content: string,
  intentCategory: string,
  moduleUsed: string,
  isEmergencyMsg: boolean,
  city?: string
): Promise<void> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    await fetch(`${baseUrl}/api/log`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        role,
        content,
        intentCategory,
        moduleUsed,
        isEmergency: isEmergencyMsg,
        city,
      }),
    })
  } catch {
    // Silently ignore logging errors — never affect UX
  }
}
