/**
 * ArogyaBot Logging API Route — /api/log
 * Fire-and-forget anonymous session and message logging to Supabase.
 * Logging failures NEVER affect the user experience.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { LogRequest } from '@/types'

/**
 * POST /api/log
 * Logs a message and upserts the anonymous session.
 * Called fire-and-forget from the chat API route.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: LogRequest = await request.json()
    const {
      sessionId,
      role,
      content,
      intentCategory,
      moduleUsed,
      isEmergency,
      city,
    } = body

    // Validate required fields
    if (!sessionId || !role || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: sessionId, role, content' },
        { status: 400 }
      )
    }

    const supabase = getSupabaseServerClient()

    // ─── Step 1: Upsert session ──────────────────────────────────────────
    // Insert the session if it doesn't exist, or update last_active and message_count
    const { error: sessionError } = await supabase
      .from('sessions')
      .upsert(
        {
          id: sessionId,
          last_active: new Date().toISOString(),
          ...(city ? { city } : {}),
        },
        {
          onConflict: 'id',
        }
      )

    if (sessionError) {
      console.error('[/api/log] Session upsert error:', sessionError)
      // Continue — don't fail the whole log because of session upsert
    }

    // Increment message count separately
    if (!sessionError) {
      const { error: rpcError } = await supabase.rpc('increment_message_count', {
        session_uuid: sessionId,
      })

      if (rpcError) {
        // If the RPC fails (e.g., doesn't exist yet), update manually
        const { data } = await supabase
          .from('sessions')
          .select('message_count')
          .eq('id', sessionId)
          .single()

        if (data) {
          await supabase
            .from('sessions')
            .update({ message_count: (data.message_count || 0) + 1 })
            .eq('id', sessionId)
        }
      }
    }

    // ─── Step 2: Insert message ──────────────────────────────────────────
    const { error: messageError } = await supabase.from('messages').insert({
      session_id: sessionId,
      role,
      content: content.slice(0, 10000), // Truncate to prevent excessively long messages
      intent_category: intentCategory || null,
      module_used: moduleUsed || null,
      is_emergency: isEmergency || false,
    })

    if (messageError) {
      console.error('[/api/log] Message insert error:', messageError)
    }

    // ─── Step 3: Update city if provided ─────────────────────────────────
    if (city && role === 'user') {
      await supabase
        .from('sessions')
        .update({ city })
        .eq('id', sessionId)
    }

    // Always return 200 — logging must never affect UX
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('[/api/log] Error:', error)
    // Return 200 even on error — logging failures are silent
    return NextResponse.json({ success: false }, { status: 200 })
  }
}
