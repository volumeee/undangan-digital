export const usePrice = () => {
  const calculatePrice = (
    basePrice: number,
    guestCount: number,
    costPerPax: number,
    activeDays: number,
    costPerDay: number
  ) => {
    const guestTotal = guestCount * costPerPax
    const dayTotal = activeDays * costPerDay
    
    return {
      basePrice,
      guestTotal,
      dayTotal,
      totalPrice: basePrice + guestTotal + dayTotal
    }
  }
  
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }
  
  return {
    calculatePrice,
    formatPrice
  }
}