import type { EventType, InvitationData, ThemeConfig } from '~/types'

export const useBuilderStore = defineStore('builder', () => {
  const invitation = ref<InvitationData | null>(null)
  const isDirty = ref(false)
  const saving = ref(false)
  const lastSaved = ref<Date | null>(null)
  
  const basePrice = ref(75000)
  const costPerPax = ref(2500)
  const costPerDay = ref(1000)
  
  const totalPrice = computed(() => {
    if (!invitation.value) return 0
    return basePrice.value + 
           (invitation.value.guestCount * costPerPax.value) + 
           (invitation.value.activeDays * costPerDay.value)
  })
  
  const updateInvitation = (updates: Partial<InvitationData>) => {
    if (invitation.value) {
      Object.assign(invitation.value, updates)
      invitation.value.totalPrice = totalPrice.value
      isDirty.value = true
    }
  }
  
  const updateThemeConfig = (config: Partial<ThemeConfig>) => {
    if (invitation.value) {
      invitation.value.themeConfig = {
        ...invitation.value.themeConfig,
        ...config
      }
      isDirty.value = true
    }
  }
  
  const saveDraft = async () => {
    if (!invitation.value || !isDirty.value) return
    
    saving.value = true
    try {
      await $fetch(`/api/invitation/${invitation.value.slug}`, {
        method: 'PATCH',
        body: {
          ...invitation.value,
          status: 'draft'
        }
      })
      
      isDirty.value = false
      lastSaved.value = new Date()
      return { success: true }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Gagal menyimpan draft'
      return { success: false, error: errorMessage }
    } finally {
      saving.value = false
    }
  }
  
  const createInvitation = async (eventType: EventType, slug: string) => {
    const defaultTheme: ThemeConfig = {
      color: {
        primary: '#d4a574',
        secondary: '#8b7355',
        background: '#faf8f5'
      },
      typography: {
        headingFont: 'Playfair Display',
        bodyFont: 'Montserrat'
      },
      background: {
        type: 'color',
        value: '#faf8f5'
      },
      music: {
        enabled: true,
        autoplay: true,
        showPlayer: true,
        startVolume: 0.3,
        url: ''
      },
      sections: {
        akad: true,
        resepsi: true,
        loveStory: true,
        gallery: true,
        gift: true,
        protocol: true,
        liveStream: false
      },
      labels: {
        akad: 'Akad Nikah',
        resepsi: 'Resepsi',
        loveStory: 'Love Story',
        gallery: 'Galeri',
        gift: 'Hadiah',
        protocol: 'Protokol Kesehatan',
        liveStream: 'Live Stream'
      },
      animation: 'slow',
      locale: 'id'
    }
    
    const newInvitation: InvitationData = {
      slug,
      eventType,
      ownerId: '',
      title: '',
      date: {},
      location: {},
      gallery: [],
      themeConfig: defaultTheme,
      guestCount: 100,
      activeDays: 30,
      totalPrice: totalPrice.value,
      status: 'draft'
    }
    
    invitation.value = newInvitation
    return newInvitation
  }
  
  return {
    invitation,
    isDirty,
    saving,
    lastSaved,
    totalPrice,
    basePrice,
    costPerPax,
    costPerDay,
    updateInvitation,
    updateThemeConfig,
    saveDraft,
    createInvitation
  }
})