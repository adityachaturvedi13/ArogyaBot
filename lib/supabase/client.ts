/**
 * Supabase browser client for ArogyaBot.
 * Uses the public anon key — safe to expose to the client.
 * No auth — all operations are anonymous.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js'

/** Singleton browser client instance */
let supabaseClient: SupabaseClient | null = null

/**
 * Get or create the Supabase browser client.
 * Uses NEXT_PUBLIC_ environment variables which are available in the browser.
 *
 * @returns Supabase client instance
 */
export function getSupabaseBrowserClient(): SupabaseClient {
  if (supabaseClient) return supabaseClient

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing Supabase environment variables. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local'
    )
  }

  supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  })

  return supabaseClient
}
