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
    const { data: invitation, error } = await supabaseAdmin
      .from('invitations')
      .select('*')
      .eq('slug', slug)
      .single()
    
    if (error) throw error
    
    return invitation
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Invitation not found'
    })
  }
})