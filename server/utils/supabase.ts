import { createClient } from '@supabase/supabase-js'

const supabaseUrl = useRuntimeConfig().supabaseUrl
const supabaseKey = useRuntimeConfig().supabaseKey

export const supabase = createClient(supabaseUrl, supabaseKey)

export const supabaseAdmin = createClient(
  supabaseUrl,
  useRuntimeConfig().supabaseServiceKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)