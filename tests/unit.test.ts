import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useBuilderStore } from '~/stores/builder'
import { usePrice } from '~/composables/usePrice'

describe('Price Calculator', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should calculate base price correctly', () => {
    const { calculatePrice, formatPrice } = usePrice()
    
    const result = calculatePrice(75000, 100, 2500, 30, 1000)
    
    expect(result.basePrice).toBe(75000)
    expect(result.guestTotal).toBe(250000)
    expect(result.dayTotal).toBe(30000)
    expect(result.totalPrice).toBe(355000)
  })

  it('should format price correctly in Indonesian Rupiah', () => {
    const { formatPrice } = usePrice()
    
    expect(formatPrice(75000)).toBe('Rp 75.000')
    expect(formatPrice(355000)).toBe('Rp 355.000')
    expect(formatPrice(1000000)).toBe('Rp 1.000.000')
  })

  it('should update invitation price when guest count changes', () => {
    const builderStore = useBuilderStore()
    
    builderStore.createInvitation('wedding', 'test-slug')
    
    expect(builderStore.invitation?.guestCount).toBe(100)
    expect(builderStore.totalPrice).toBe(325000) // 75000 + (100*2500) + (30*1000)
    
    builderStore.updateInvitation({ guestCount: 200 })
    
    expect(builderStore.invitation?.guestCount).toBe(200)
    expect(builderStore.totalPrice).toBe(575000) // 75000 + (200*2500) + (30*1000)
  })

  it('should update invitation price when active days changes', () => {
    const builderStore = useBuilderStore()
    
    builderStore.createInvitation('wedding', 'test-slug')
    
    expect(builderStore.invitation?.activeDays).toBe(30)
    expect(builderStore.totalPrice).toBe(325000) // 75000 + (100*2500) + (30*1000)
    
    builderStore.updateInvitation({ activeDays: 60 })
    
    expect(builderStore.invitation?.activeDays).toBe(60)
    expect(builderStore.totalPrice).toBe(355000) // 75000 + (100*2500) + (60*1000)
  })
})

describe('Theme Configuration', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should update theme configuration', () => {
    const builderStore = useBuilderStore()
    
    builderStore.createInvitation('wedding', 'test-slug')
    
    const newColor = {
      primary: '#ff0000',
      secondary: '#00ff00',
      background: '#0000ff'
    }
    
    builderStore.updateThemeConfig({
      color: newColor
    })
    
    expect(builderStore.invitation?.themeConfig.color).toEqual(newColor)
    expect(builderStore.isDirty).toBe(true)
  })

  it('should update typography configuration', () => {
    const builderStore = useBuilderStore()
    
    builderStore.createInvitation('wedding', 'test-slug')
    
    builderStore.updateThemeConfig({
      typography: {
        headingFont: 'Dancing Script',
        bodyFont: 'Inter'
      }
    })
    
    expect(builderStore.invitation?.themeConfig.typography.headingFont).toBe('Dancing Script')
    expect(builderStore.invitation?.themeConfig.typography.bodyFont).toBe('Inter')
  })
})

describe('Event Types', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should create wedding invitation with default sections', () => {
    const builderStore = useBuilderStore()
    
    builderStore.createInvitation('wedding', 'test-wedding')
    
    expect(builderStore.invitation?.eventType).toBe('wedding')
    expect(builderStore.invitation?.themeConfig.sections.akad).toBe(true)
    expect(builderStore.invitation?.themeConfig.sections.resepsi).toBe(true)
    expect(builderStore.invitation?.themeConfig.sections.loveStory).toBe(true)
  })

  it('should create corporate invitation without wedding-specific sections', () => {
    const builderStore = useBuilderStore()
    
    builderStore.createInvitation('corporate', 'test-corporate')
    
    expect(builderStore.invitation?.eventType).toBe('corporate')
    expect(builderStore.invitation?.themeConfig.sections.loveStory).toBe(false)
    expect(builderStore.invitation?.themeConfig.sections.gift).toBe(false)
  })
})