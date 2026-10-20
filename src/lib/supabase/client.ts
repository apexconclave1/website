import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Client-side Supabase client using the anonymous (public) key.
 * Safe for browser usage — used for file uploads to Supabase Storage.
 * All data mutations go through server-side Route Handlers.
 */

let browserClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (browserClient) return browserClient;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !anonKey) {
    throw new Error(
      'Missing Supabase client credentials. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local'
    );
  }

  browserClient = createClient(supabaseUrl, anonKey);
  return browserClient;
}
