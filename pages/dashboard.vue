<template>
  <div class="min-h-screen bg-gradient-primary">
    <!-- Header -->
    <header class="glass-card m-4 px-6 py-4 animate-slide-down sticky top-0 z-50">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <div class="flex items-center gap-4">
          <NuxtLink to="/" class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-r from-rose-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <Icon name="heroicons-heart" class="w-6 h-6 text-white" />
            </div>
            <h1 class="text-2xl font-bold text-gradient">Dashboard</h1>
          </NuxtLink>
        </div>
        <div class="flex items-center gap-4">
          <div class="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/50 rounded-lg">
            <Icon name="heroicons-user-circle" class="w-5 h-5 text-rose-600" />
            <span class="text-sm font-medium text-gray-700">{{ authStore.user?.user_metadata?.name || 'User' }}</span>
          </div>
          <button
            @click="handleLogout"
            class="btn-ghost"
            title="Logout"
          >
            <Icon name="heroicons-arrow-right-on-rectangle" class="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>

    <div class="container mx-auto px-6 py-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="glass-card p-6 card-hover animate-slide-up" style="animation-delay: 0.1s">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Undangan</h3>
              <p class="text-4xl font-bold text-gray-900 mt-2">{{ stats.totalInvitations }}</p>
            </div>
            <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl">
              <Icon name="heroicons-document-text" class="w-8 h-8 text-white" />
            </div>
          </div>
          <div class="flex items-center gap-1 text-sm text-green-600 font-medium">
            <Icon name="heroicons-arrow-trending-up" class="w-4 h-4" />
            <span>Semua undangan</span>
          </div>
        </div>
        
        <div class="glass-card p-6 card-hover animate-slide-up" style="animation-delay: 0.2s">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-sm font-semibold text-gray-600 uppercase tracking-wide">Terpublikasi</h3>
              <p class="text-4xl font-bold text-gray-900 mt-2">{{ stats.publishedInvitations }}</p>
            </div>
            <div class="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl">
              <Icon name="heroicons-globe-americas" class="w-8 h-8 text-white" />
            </div>
          </div>
          <div class="flex items-center gap-1 text-sm text-green-600 font-medium">
            <Icon name="heroicons-check-circle" class="w-4 h-4" />
            <span>Aktif online</span>
          </div>
        </div>
        
        <div class="glass-card p-6 card-hover animate-slide-up" style="animation-delay: 0.3s">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Tamu</h3>
              <p class="text-4xl font-bold text-gray-900 mt-2">{{ stats.totalGuests }}</p>
            </div>
            <div class="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
              <Icon name="heroicons-users" class="w-8 h-8 text-white" />
            </div>
          </div>
          <div class="flex items-center gap-1 text-sm text-purple-600 font-medium">
            <Icon name="heroicons-user-group" class="w-4 h-4" />
            <span>Tamu terdaftar</span>
          </div>
        </div>
        
        <div class="glass-card p-6 card-hover animate-slide-up" style="animation-delay: 0.4s">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Revenue</h3>
              <p class="text-3xl font-bold text-gray-900 mt-2">{{ formatPrice(stats.totalRevenue) }}</p>
            </div>
            <div class="w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl">
              <Icon name="heroicons-banknotes" class="w-8 h-8 text-white" />
            </div>
          </div>
          <div class="flex items-center gap-1 text-sm text-rose-600 font-medium">
            <Icon name="heroicons-currency-dollar" class="w-4 h-4" />
            <span>Total pendapatan</span>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="glass-card p-8 mb-8 animate-slide-up" style="animation-delay: 0.5s">
        <h2 class="text-2xl font-bold mb-6 text-gray-900">
          <Icon name="heroicons-bolt" class="w-6 h-6 inline mr-2 text-rose-600" />
          Aksi Cepat
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <NuxtLink
            to="/buat"
            class="btn-primary flex items-center justify-center gap-2 py-4"
          >
            <Icon name="heroicons-plus-circle" class="w-6 h-6" />
            Buat Undangan Baru
          </NuxtLink>
          <button class="btn-secondary flex items-center justify-center gap-2 py-4">
            <Icon name="heroicons-clipboard-document-list" class="w-6 h-6" />
            Import Tamu
          </button>
          <button class="btn-secondary flex items-center justify-center gap-2 py-4">
            <Icon name="heroicons-chart-bar" class="w-6 h-6" />
            Lihat Statistik
          </button>
        </div>
      </div>

      <!-- Recent Invitations -->
      <div class="glass-card overflow-hidden animate-slide-up" style="animation-delay: 0.6s">
        <div class="px-6 py-5 border-b border-gray-200/50 bg-white/50">
          <h2 class="text-2xl font-bold text-gray-900">
            <Icon name="heroicons-document-duplicate" class="w-6 h-6 inline mr-2 text-purple-600" />
            Undangan Terbaru
          </h2>
        </div>
        
        <!-- Empty State -->
        <div v-if="invitations.length === 0" class="p-12 text-center">
          <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="heroicons-document-plus" class="w-12 h-12 text-gray-400" />
          </div>
          <h3 class="text-xl font-semibold text-gray-700 mb-2">Belum Ada Undangan</h3>
          <p class="text-gray-500 mb-6">Mulai buat undangan digital pertama Anda sekarang!</p>
          <NuxtLink
            to="/buat"
            class="btn-primary inline-flex items-center gap-2"
          >
            <Icon name="heroicons-sparkles" class="w-5 h-5" />
            Buat Undangan Pertama
          </NuxtLink>
        </div>

        <!-- Table -->
        <div v-else class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-white/70 backdrop-blur-sm">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Judul
                </th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Jenis
                </th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Tamu
                </th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Dibuat
                </th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody class="bg-white/50 divide-y divide-gray-200/50">
              <tr v-for="invitation in invitations" :key="invitation.id" class="hover:bg-white/80 transition-colors">
                <td class="px-6 py-4">
                  <div class="text-sm font-bold text-gray-900">{{ invitation.title }}</div>
                  <div class="text-xs text-gray-500 font-mono">{{ invitation.slug }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-blue-100 text-blue-700">
                    {{ getEventTypeLabel(invitation.eventType) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full',
                      getStatusColor(invitation.status)
                    ]"
                  >
                    {{ getStatusLabel(invitation.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center gap-2">
                    <Icon name="heroicons-user-group" class="w-4 h-4 text-purple-600" />
                    <span class="text-sm font-semibold text-gray-700">{{ invitation.guestCount }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {{ formatDate(invitation.createdAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex items-center gap-2">
                    <NuxtLink
                      :to="`/builder/${invitation.slug}`"
                      class="inline-flex items-center gap-1 text-rose-600 hover:text-rose-800 font-semibold hover:underline"
                    >
                      <Icon name="heroicons-pencil-square" class="w-4 h-4" />
                      Edit
                    </NuxtLink>
                    <a
                      :href="`/inv/${invitation.slug}`"
                      target="_blank"
                      class="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-semibold hover:underline"
                    >
                      <Icon name="heroicons-eye" class="w-4 h-4" />
                      Preview
                    </a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Database } from '~/types/supabase'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

type DashboardInvitation = {
  id: number
  slug: string
  title: string
  eventType: string
  status: 'draft' | 'published' | 'paid' | 'expired'
  guestCount: number
  createdAt: string
  totalPrice: number
}

// Reactive data
const invitations = ref<DashboardInvitation[]>([])
const stats = ref({
  totalInvitations: 0,
  publishedInvitations: 0,
  totalGuests: 0,
  totalRevenue: 0
})

// Fetch user invitations
const fetchInvitations = async () => {
  if (!authStore.user?.id) {
    invitations.value = []
    stats.value = {
      totalInvitations: 0,
      publishedInvitations: 0,
      totalGuests: 0,
      totalRevenue: 0
    }
    return
  }
  
  try {
    const supabase = useSupabaseClient<Database>()
    const { data, error } = await supabase
      .from('invitations')
      .select('*')
      .eq('owner_id', authStore.user.id)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    
    const normalized: DashboardInvitation[] = (data || []).map((invitation) => ({
      id: invitation.id,
      slug: invitation.slug,
      title: invitation.title,
      eventType: invitation.event_type,
      status: invitation.status,
      guestCount: invitation.guest_count,
      createdAt: invitation.created_at,
      totalPrice: invitation.total_price
    }))
    
    invitations.value = normalized
    
    stats.value.totalInvitations = normalized.length
    stats.value.publishedInvitations = normalized.filter(inv => 
      inv.status === 'published' || inv.status === 'paid'
    ).length
    stats.value.totalGuests = normalized.reduce((sum, inv) => sum + inv.guestCount, 0)
    stats.value.totalRevenue = normalized
      .filter(inv => inv.status === 'paid')
      .reduce((sum, inv) => sum + inv.totalPrice, 0)
  } catch (error) {
    console.error('Failed to fetch invitations:', error)
  }
}

// Helper functions
const getEventTypeLabel = (eventType: string) => {
  const labels = {
    wedding: 'Pernikahan',
    engagement: 'Lamaran',
    aqiqah: 'Aqiqah',
    birthday: 'Ulang Tahun',
    corporate: 'Corporate'
  }
  return labels[eventType as keyof typeof labels] || eventType
}

const getStatusLabel = (status: string) => {
  const labels = {
    draft: 'Draft',
    published: 'Terpublikasi',
    paid: 'Dibayar',
    expired: 'Kadaluarsa'
  }
  return labels[status as keyof typeof labels] || status
}

const getStatusColor = (status: string) => {
  const colors = {
    draft: 'bg-gray-100 text-gray-800',
    published: 'bg-green-100 text-green-800',
    paid: 'bg-blue-100 text-blue-800',
    expired: 'bg-red-100 text-red-800'
  }
  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
}

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(date))
}

const formatPrice = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount)
}

const handleLogout = async () => {
  await authStore.logout()
  await router.push('/')
}

// Load data on mount
onMounted(() => {
  fetchInvitations()
})
</script>