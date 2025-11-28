<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200 px-6 py-4">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div class="flex items-center gap-4">
          <span class="text-sm text-gray-600">{{ authStore.user?.user_metadata?.name || 'User' }}</span>
          <button
            @click="handleLogout"
            class="text-gray-600 hover:text-gray-900"
          >
            <Icon name="heroicons-arrow-right-on-rectangle" class="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>

    <div class="container mx-auto px-6 py-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-sm font-medium text-gray-600">Total Undangan</h3>
            <Icon name="heroicons-document-text" class="w-8 h-8 text-blue-500" />
          </div>
          <p class="text-2xl font-bold text-gray-900">{{ stats.totalInvitations }}</p>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-sm font-medium text-gray-600">Terpublikasi</h3>
            <Icon name="heroicons-globe-americas" class="w-8 h-8 text-green-500" />
          </div>
          <p class="text-2xl font-bold text-gray-900">{{ stats.publishedInvitations }}</p>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-sm font-medium text-gray-600">Total Tamu</h3>
            <Icon name="heroicons-users" class="w-8 h-8 text-purple-500" />
          </div>
          <p class="text-2xl font-bold text-gray-900">{{ stats.totalGuests }}</p>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-sm font-medium text-gray-600">Total Revenue</h3>
            <Icon name="heroicons-banknotes" class="w-8 h-8 text-rose-500" />
          </div>
          <p class="text-2xl font-bold text-gray-900">{{ formatPrice(stats.totalRevenue) }}</p>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <h2 class="text-lg font-semibold mb-4">Aksi Cepat</h2>
        <div class="flex flex-wrap gap-4">
          <NuxtLink
            to="/buat"
            class="bg-gradient-to-r from-rose-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
          >
            <Icon name="heroicons-plus" class="w-5 h-5 inline mr-2" />
            Buat Undangan Baru
          </NuxtLink>
          <button class="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
            <Icon name="heroicons-clipboard-document-list" class="w-5 h-5 inline mr-2" />
            Import Tamu
          </button>
          <button class="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
            <Icon name="heroicons-chart-bar" class="w-5 h-5 inline mr-2" />
            Lihat Statistik
          </button>
        </div>
      </div>

      <!-- Recent Invitations -->
      <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-semibold">Undangan Terbaru</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Judul
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jenis
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tamu
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dibuat
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="invitation in invitations" :key="invitation.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ invitation.title }}</div>
                  <div class="text-sm text-gray-500">{{ invitation.slug }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {{ getEventTypeLabel(invitation.eventType) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                      getStatusColor(invitation.status)
                    ]"
                  >
                    {{ getStatusLabel(invitation.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ invitation.guestCount }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(invitation.createdAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <NuxtLink
                    :to="`/builder/${invitation.slug}`"
                    class="text-rose-600 hover:text-rose-900 mr-3"
                  >
                    Edit
                  </NuxtLink>
                  <a
                    :href="`/inv/${invitation.slug}`"
                    target="_blank"
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    Preview
                  </a>
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