export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()
  
  try {
    const response = await $fetch('https://app.sandbox.midtrans.com/snap/v1/transactions', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(config.midtransServerKey + ':').toString('base64')}`
      },
      body: {
        transaction_details: {
          order_id: `INV-${Date.now()}`,
          gross_amount: body.amount
        },
        credit_card: {
          secure: true
        },
        customer_details: {
          first_name: body.customerName,
          email: body.customerEmail,
          phone: body.customerPhone
        },
        item_details: [
          {
            id: `INV-${body.invitationId}`,
            price: body.basePrice,
            quantity: 1,
            name: `Undangan Digital - ${body.eventType}`
          },
          {
            id: 'GUESTS',
            price: body.costPerPax,
            quantity: body.guestCount,
            name: 'Biaya per Tamu'
          },
          {
            id: 'DAYS',
            price: body.costPerDay,
            quantity: body.activeDays,
            name: 'Biaya per Hari'
          }
        ]
      }
    })
    
    return {
      success: true,
      token: response.token
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Failed to create payment token'
    })
  }
})