import { createHash } from 'node:crypto'
import { supabaseAdmin } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()
  
  try {
    // Verify Midtrans signature
    const hash = createHash('sha512')
      .update(`${body.order_id}${body.status_code}${body.gross_amount}${config.midtransServerKey}`)
      .digest('hex')
    
    if (hash !== body.signature_key) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid signature'
      })
    }
    
    // Update payment status in database
    const { error } = await supabaseAdmin
      .from('payments')
      .upsert({
        id: body.transaction_id,
        order_id: body.order_id,
        amount: body.gross_amount,
        status: body.transaction_status,
        payment_type: body.payment_type,
        created_at: new Date().toISOString()
      })
    
    if (error) throw error
    
    // Update invitation status if payment is successful
    if (body.transaction_status === 'capture' || body.transaction_status === 'settlement') {
      const orderId = body.order_id
      const invitationId = orderId.replace('INV-', '').split('-')[0]
      
      await supabaseAdmin
        .from('invitations')
        .update({ status: 'paid' })
        .eq('id', invitationId)
    }
    
    return {
      success: true,
      status: body.transaction_status
    }
  } catch (error) {
    const statusMessage = error instanceof Error ? error.message : 'Failed to process notification'
    throw createError({
      statusCode: 500,
      statusMessage
    })
  }
})