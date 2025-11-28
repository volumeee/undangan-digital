import { supabaseAdmin } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const body = await readBody(event)
  
  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Slug is required'
    })
  }
  
  try {
    const { data: invitation, error } = await supabaseAdmin
      .from('invitations')
      .upsert({
        ...body,
        slug,
        updated_at: new Date().toISOString()
      })
      .select()
      .single()
    
    if (error) throw error
    
    return invitation
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update invitation'
    })
  }
})