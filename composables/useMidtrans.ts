export const useMidtrans = () => {
  const createPaymentToken = async (invitationData: any) => {
    const { data, error } = await $fetch('/api/payment/token', {
      method: 'POST',
      body: invitationData
    })
    
    if (error) throw error
    return data
  }
  
  const processPayment = (token: string) => {
    return new Promise((resolve, reject) => {
      // @ts-ignore
      window.snap.pay(token, {
        onSuccess: (result: any) => resolve(result),
        onPending: (result: any) => resolve(result),
        onError: (result: any) => reject(result),
        onClose: () => reject(new Error('Payment cancelled'))
      })
    })
  }
  
  return {
    createPaymentToken,
    processPayment
  }
}