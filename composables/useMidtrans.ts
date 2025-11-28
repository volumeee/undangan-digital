import type { EventType } from '~/types'

type PaymentTokenPayload = {
  amount: number
  invitationId: number
  eventType: EventType
  customerName: string
  customerEmail: string
  customerPhone: string
  basePrice: number
  guestCount: number
  costPerPax: number
  activeDays: number
  costPerDay: number
}

type PaymentTokenResponse = {
  success: boolean
  token: string
}

type MidtransPaymentResult = {
  transaction_id: string
  order_id: string
  status_code: string
  transaction_status: string
  payment_type: string
  gross_amount: string
  [key: string]: unknown
}

type SnapCallbacks = {
  onSuccess?: (result: MidtransPaymentResult) => void
  onPending?: (result: MidtransPaymentResult) => void
  onError?: (result: MidtransPaymentResult) => void
  onClose?: () => void
}

declare global {
  interface Window {
    snap?: {
      pay: (token: string, callbacks: SnapCallbacks) => void
    }
  }
}

export const useMidtrans = () => {
  const createPaymentToken = async (payload: PaymentTokenPayload) => {
    const response = await $fetch<PaymentTokenResponse>('/api/payment/token', {
      method: 'POST',
      body: payload
    })
    
    if (!response.success) {
      throw new Error('Failed to create payment token')
    }
    
    return response
  }
  
  const processPayment = (token: string) => {
    return new Promise<MidtransPaymentResult>((resolve, reject) => {
      if (typeof window === 'undefined' || !window.snap) {
        reject(new Error('Midtrans Snap is not available'))
        return
      }
      
      window.snap.pay(token, {
        onSuccess: resolve,
        onPending: resolve,
        onError: reject,
        onClose: () => reject(new Error('Payment cancelled'))
      })
    })
  }
  
  return {
    createPaymentToken,
    processPayment
  }
}
