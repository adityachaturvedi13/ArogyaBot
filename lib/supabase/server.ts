/**
 * Supabase server client for ArogyaBot.
 * Uses the SERVICE_ROLE key — NEVER expose this to the client.
 * Used only in API routes for privileged operations (logging, etc).
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js'

/** Singleton server client instance */
let supabaseServer: SupabaseClient | null = null

/**
 * Get or create the Supabase server client.
 * Uses SUPABASE_SERVICE_ROLE_KEY which is only available server-side.
 *
 * @returns Supabase client instance with service role privileges
 */
export function getSupabaseServerClient(): SupabaseClient {
  if (supabaseServer) return supabaseServer

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      'Missing Supabase server environment variables. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local'
    )
  }

  supabaseServer = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  })

  return supabaseServer
}
