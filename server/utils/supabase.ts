import { createClient } from '@supabase/supabase-js'
import type { Database } from '~/types/supabase'

// Get Supabase credentials from environment
const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_KEY || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || ''

if (!supabaseUrl || !supabaseKey) {
  console.warn('Missing Supabase credentials. Make sure SUPABASE_URL and SUPABASE_KEY are set.')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export const supabaseAdmin = createClient<Database>(
  supabaseUrl,
  supabaseServiceKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)