<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200 px-6 py-4">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <div class="flex items-center gap-4">
          <NuxtLink to="/buat" class="text-gray-600 hover:text-gray-900">
            <Icon name="heroicons-arrow-left" class="w-6 h-6" />
          </NuxtLink>
          <h1 class="text-xl font-semibold">Undangan Builder</h1>
        </div>
        <div class="flex items-center gap-4">
          <span class="text-sm text-gray-500">
            {{ builderStore.isDirty ? 'Perubahan belum disimpan' : 'Tersimpan' }}
          </span>
          <button
            :disabled="!builderStore.isDirty || builderStore.saving"
            class="bg-rose-600 text-white px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-rose-700 transition-colors"
            @click="saveDraft"
          >
            {{ builderStore.saving ? 'Menyimpan...' : 'Simpan Draft' }}
          </button>
          <button
            class="bg-gradient-to-r from-rose-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all"
            @click="publish"
          >
            Publikasikan
          </button>
        </div>
      </div>
    </header>

    <div class="flex h-screen pt-16">
      <!-- Left Sidebar - Editor -->
      <div class="w-96 bg-white border-r border-gray-200 overflow-y-auto">
        <div class="p-6">
          <!-- Price Calculator -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold mb-4">Harga & Durasi</h3>
            <PriceCalculator />
          </div>

          <!-- Theme Customization -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold mb-4">Kustomisasi Tema</h3>
            <AccordionEditor />
          </div>

          <!-- Content Editor -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold mb-4">Konten Undangan</h3>
            <ContentEditor />
          </div>

          <!-- Media Upload -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold mb-4">Media</h3>
            <MediaUpload />
          </div>
        </div>
      </div>

      <!-- Right - Preview -->
      <div class="flex-1 bg-gray-100 overflow-y-auto">
        <div class="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
          <div class="flex justify-between items-center">
            <div class="flex gap-2">
              <button
                :class="[
                  'px-3 py-1 rounded-lg text-sm',
                  previewDevice === 'mobile' ? 'bg-rose-600 text-white' : 'bg-gray-200 text-gray-700'
                ]"
                @click="previewDevice = 'mobile'"
              >
                Mobile
              </button>
              <button
                :class="[
                  'px-3 py-1 rounded-lg text-sm',
                  previewDevice === 'tablet' ? 'bg-rose-600 text-white' : 'bg-gray-200 text-gray-700'
                ]"
                @click="previewDevice = 'tablet'"
              >
                Tablet
              </button>
              <button
                :class="[
                  'px-3 py-1 rounded-lg text-sm',
                  previewDevice === 'desktop' ? 'bg-rose-600 text-white' : 'bg-gray-200 text-gray-700'
                ]"
                @click="previewDevice = 'desktop'"
              >
                Desktop
              </button>
            </div>
            <button
              class="text-gray-600 hover:text-gray-900"
              @click="refreshPreview"
            >
              <Icon name="heroicons-arrow-path" class="w-5 h-5" />
            </button>
          </div>
        </div>

        <div class="p-8 flex justify-center">
          <div
            :class="[
              'bg-white rounded-lg shadow-xl overflow-hidden',
              previewDevice === 'mobile' ? 'w-96 h-[812px]' : '',
              previewDevice === 'tablet' ? 'w-[768px] h-[1024px]' : '',
              previewDevice === 'desktop' ? 'w-full max-w-4xl' : ''
            ]"
          >
            <iframe
              :src="previewUrl"
              class="w-full h-full border-0"
              @load="onPreviewLoad"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Publish Modal -->
    <div
      v-if="showPublishModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      @click="showPublishModal = false"
    >
      <div
        class="bg-white rounded-xl p-8 max-w-md w-full"
        @click.stop
      >
        <h3 class="text-2xl font-bold mb-6">Publikasikan Undangan</h3>
        
        <div class="mb-6">
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="text-2xl font-bold text-rose-600 mb-2">
              {{ formatPrice(builderStore.totalPrice) }}
            </div>
            <div class="text-sm text-gray-600">
              {{ builderStore.invitation?.guestCount }} tamu × {{ formatPrice(2500) }} + 
              {{ builderStore.invitation?.activeDays }} hari × {{ formatPrice(1000) }}
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <button
            class="w-full bg-gradient-to-r from-rose-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all"
            @click="processPayment"
          >
            Bayar & Publikasikan
          </button>
          <button
            class="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            @click="showPublishModal = false"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { EventType } from '~/types'
import { useBuilderStore } from '~/stores/builder'
import { useMidtrans } from '~/composables/useMidtrans'
import { usePrice } from '~/composables/usePrice'

const route = useRoute()
const router = useRouter()
const builderStore = useBuilderStore()
const { createPaymentToken, processPayment: processMidtransPayment } = useMidtrans()
const { formatPrice } = usePrice()

const previewDevice = ref<'mobile' | 'tablet' | 'desktop'>('mobile')
const showPublishModal = ref(false)

const slug = route.params.slug as string
const previewUrl = computed(() => `/inv/${slug}?preview=true`)

const initialEventType = (route.query.type as EventType | undefined) ?? 'wedding'

onMounted(async () => {
  await builderStore.createInvitation(
    initialEventType,
    slug
  )
  
  if (route.query.theme) {
    // Apply theme preset
    await applyThemePreset(route.query.theme as string)
  }
})

const saveDraft = async () => {
  const result = await builderStore.saveDraft()
  if (result && !result.success && result.error) {
    alert(result.error)
  }
}

const publish = () => {
  showPublishModal.value = true
}

const processPayment = async () => {
  if (!builderStore.invitation) return
  
  try {
    const tokenData = await createPaymentToken({
      amount: builderStore.totalPrice,
      invitationId: builderStore.invitation.id ?? 0,
      eventType: builderStore.invitation.eventType,
      customerName: 'User Name', // Get from auth store
      customerEmail: 'user@example.com',
      customerPhone: '+628123456789',
      basePrice: builderStore.basePrice,
      guestCount: builderStore.invitation.guestCount,
      costPerPax: builderStore.costPerPax,
      activeDays: builderStore.invitation.activeDays,
      costPerDay: builderStore.costPerDay
    })
    
    await processMidtransPayment(tokenData.token)
    
    // Payment successful
    showPublishModal.value = false
    await router.push(`/dashboard`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan saat memproses pembayaran'
    alert(errorMessage)
  }
}

const refreshPreview = () => {
  const iframe = document.querySelector('iframe') as HTMLIFrameElement | null
  if (iframe?.contentWindow) {
    iframe.contentWindow.location.reload()
  }
}

const onPreviewLoad = () => {
  // Send invitation data to preview iframe
  const iframe = document.querySelector('iframe') as HTMLIFrameElement
  if (iframe?.contentWindow && builderStore.invitation) {
    iframe.contentWindow.postMessage({
      type: 'invitation-data',
      data: builderStore.invitation
    }, '*')
  }
}

const applyThemePreset = async (themeId: string) => {
  // Apply theme preset logic
  console.log('Applying theme:', themeId)
}

watch(
  () => builderStore.invitation,
  () => {
    onPreviewLoad()
  },
  { deep: true }
)

useSeoMeta({
  title: 'Builder - UndanganKu',
  description: 'Buat dan kustomisasi undangan digital Anda'
})
</script>