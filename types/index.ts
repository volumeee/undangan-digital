export type EventType = 'wedding' | 'engagement' | 'aqiqah' | 'birthday' | 'corporate'

export type ThemeConfig = {
  color: {
    primary: string
    secondary: string
    background: string
  }
  typography: {
    headingFont: string
    bodyFont: string
  }
  background: {
    type: 'color' | 'pattern' | 'upload'
    value?: string
  }
  music: {
    enabled: boolean
    autoplay: boolean
    showPlayer: boolean
    startVolume: number
    url: string
  }
  sections: Record<string, boolean>
  labels: Record<string, string>
  animation: 'slow' | 'fast'
  customCss?: string
  locale: 'id' | 'en'
}

export type Person = {
  name: string
  father: string
  mother: string
  photo: string
}

export type EventDate = {
  akad?: Date
  resepsi?: Date
}

export type EventLocation = {
  akad?: string
  resepsi?: string
  mapUrl?: string
}

export type InvitationData = {
  id?: number
  slug: string
  eventType: EventType
  ownerId: string
  title: string
  groom?: Person
  bride?: Person
  date: EventDate
  location: EventLocation
  story?: string
  gallery: string[]
  themeConfig: ThemeConfig
  guestCount: number
  activeDays: number
  totalPrice: number
  status: 'draft' | 'published' | 'paid' | 'expired'
  createdAt?: Date
  updatedAt?: Date
}

export type Guest = {
  id?: number
  invitationId: number
  name: string
  phone: string
  email?: string
  group: string
  status: 'pending' | 'sent' | 'opened' | 'rsvp-yes' | 'rsvp-no'
  uniqueLink: string
  createdAt?: Date
}

export type GuestBookEntry = {
  id?: number
  invitationId: number
  guestName: string
  message: string
  photo?: string
  reaction?: string
  isVisible: boolean
  createdAt?: string | Date
}

export type PaymentData = {
  id: string
  invitationId: number
  amount: number
  status: 'pending' | 'success' | 'failed' | 'expired'
  paymentType: string
  transactionId?: string
  createdAt: Date
}