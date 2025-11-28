import { supabaseAdmin } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  
  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Slug is required'
    })
  }
  
  try {
    const { data: invitation, error: dbError } = await supabaseAdmin
      .from('invitations')
      .select('*')
      .eq('slug', slug)
      .single()
    
    if (dbError) throw dbError
    
    return invitation
  } catch {
    throw createError({
      statusCode: 404,
      statusMessage: 'Invitation not found'
    })
  }
})