<template>
  <div class="min-h-screen bg-gray-900">
    <!-- Header -->
    <header class="bg-gray-800 border-b border-gray-700 px-6 py-4 sticky top-0 z-50">
      <div class="max-w-full mx-auto flex justify-between items-center">
        <div class="flex items-center gap-4">
          <NuxtLink to="/dashboard" class="btn-ghost text-white hover:bg-gray-700">
            <Icon name="heroicons-arrow-left" class="w-5 h-5 inline mr-2" />
            Kembali
          </NuxtLink>
          <div class="h-8 w-px bg-gray-700"></div>
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-gradient-to-r from-rose-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Icon name="heroicons-paint-brush" class="w-5 h-5 text-white" />
            </div>
            <h1 class="text-lg font-bold text-white">Undangan Builder</h1>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg">
            <div 
              :class="[
                'w-2 h-2 rounded-full',
                builderStore.isDirty ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'
              ]"
            ></div>
            <span class="text-sm text-gray-300">
              {{ builderStore.isDirty ? 'Belum disimpan' : 'Tersimpan' }}
            </span>
          </div>
          <button
            :disabled="!builderStore.isDirty || builderStore.saving"
            class="btn-secondary text-white border-gray-600 hover:bg-gray-700 disabled:opacity-50"
            @click="saveDraft"
          >
            <Icon name="heroicons-cloud-arrow-up" class="w-5 h-5 inline mr-2" />
            {{ builderStore.saving ? 'Menyimpan...' : 'Simpan' }}
          </button>
          <button
            class="btn-primary"
            @click="publish"
          >
            <Icon name="heroicons-rocket-launch" class="w-5 h-5 inline mr-2" />
            Publikasikan
          </button>
        </div>
      </div>
    </header>

    <div class="flex h-[calc(100vh-73px)]">
      <!-- Left Sidebar - Editor -->
      <div class="w-96 bg-gray-800 border-r border-gray-700 overflow-y-auto">
        <div class="p-6 space-y-6">
          <!-- Price Calculator -->
          <div class="bg-gray-900 rounded-xl p-5 border border-gray-700">
            <h3 class="text-lg font-bold mb-4 text-white flex items-center gap-2">
              <Icon name="heroicons-calculator" class="w-5 h-5 text-rose-500" />
              Harga & Durasi
            </h3>
            <PriceCalculator />
          </div>

          <!-- Theme Customization -->
          <div class="bg-gray-900 rounded-xl p-5 border border-gray-700">
            <h3 class="text-lg font-bold mb-4 text-white flex items-center gap-2">
              <Icon name="heroicons-sparkles" class="w-5 h-5 text-purple-500" />
              Kustomisasi Tema
            </h3>
            <AccordionEditor />
          </div>

          <!-- Content Editor -->
          <div class="bg-gray-900 rounded-xl p-5 border border-gray-700">
            <h3 class="text-lg font-bold mb-4 text-white flex items-center gap-2">
              <Icon name="heroicons-document-text" class="w-5 h-5 text-blue-500" />
              Konten Undangan
            </h3>
            <ContentEditor />
          </div>

          <!-- Media Upload -->
          <div class="bg-gray-900 rounded-xl p-5 border border-gray-700">
            <h3 class="text-lg font-bold mb-4 text-white flex items-center gap-2">
              <Icon name="heroicons-photo" class="w-5 h-5 text-green-500" />
              Media
            </h3>
            <MediaUpload />
          </div>
        </div>
      </div>

      <!-- Right - Preview -->
      <div class="flex-1 bg-gray-900 overflow-hidden flex flex-col">
        <div class="bg-gray-800 border-b border-gray-700 p-4">
          <div class="flex justify-between items-center">
            <div class="flex gap-2">
              <button
                :class="[
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  previewDevice === 'mobile' 
                    ? 'bg-gradient-to-r from-rose-600 to-purple-600 text-white shadow-lg' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                ]"
                @click="previewDevice = 'mobile'"
              >
                <Icon name="heroicons-device-phone-mobile" class="w-4 h-4 inline mr-2" />
                Mobile
              </button>
              <button
                :class="[
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  previewDevice === 'tablet' 
                    ? 'bg-gradient-to-r from-rose-600 to-purple-600 text-white shadow-lg' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                ]"
                @click="previewDevice = 'tablet'"
              >
                <Icon name="heroicons-device-tablet" class="w-4 h-4 inline mr-2" />
                Tablet
              </button>
              <button
                :class="[
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  previewDevice === 'desktop' 
                    ? 'bg-gradient-to-r from-rose-600 to-purple-600 text-white shadow-lg' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                ]"
                @click="previewDevice = 'desktop'"
              >
                <Icon name="heroicons-computer-desktop" class="w-4 h-4 inline mr-2" />
                Desktop
              </button>
            </div>
            <button
              class="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-all"
              @click="refreshPreview"
              title="Refresh Preview"
            >
              <Icon name="heroicons-arrow-path" class="w-5 h-5" />
            </button>
          </div>
        </div>

        <div class="flex-1 p-6 overflow-y-auto flex justify-center items-start">
          <div
            :class="[
              'bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300',
              previewDevice === 'mobile' ? 'w-[375px] h-[812px]' : '',
              previewDevice === 'tablet' ? 'w-[768px] h-[1024px]' : '',
              previewDevice === 'desktop' ? 'w-full max-w-6xl h-[900px]' : ''
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
    <Transition name="modal">
      <div
        v-if="showPublishModal"
        class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        @click="showPublishModal = false"
      >
        <div
          class="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-scale-in"
          @click.stop
        >
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-3xl font-bold text-gradient">Publikasikan Undangan</h3>
            <button 
              @click="showPublishModal = false"
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Icon name="heroicons-x-mark" class="w-6 h-6" />
            </button>
          </div>
          
          <div class="mb-8">
            <div class="bg-gradient-to-br from-rose-50 to-purple-50 p-6 rounded-xl border-2 border-rose-200">
              <div class="text-center mb-4">
                <div class="text-sm font-semibold text-rose-600 mb-2">Total Pembayaran</div>
                <div class="text-5xl font-bold text-gradient">
                  {{ formatPrice(builderStore.totalPrice) }}
                </div>
              </div>
              <div class="space-y-2 text-sm text-gray-600">
                <div class="flex justify-between items-center p-2 bg-white/50 rounded-lg">
                  <span>Base Price</span>
                  <span class="font-semibold">{{ formatPrice(75000) }}</span>
                </div>
                <div class="flex justify-between items-center p-2 bg-white/50 rounded-lg">
                  <span>{{ builderStore.invitation?.guestCount }} Tamu × {{ formatPrice(2500) }}</span>
                  <span class="font-semibold">{{ formatPrice((builderStore.invitation?.guestCount || 0) * 2500) }}</span>
                </div>
                <div class="flex justify-between items-center p-2 bg-white/50 rounded-lg">
                  <span>{{ builderStore.invitation?.activeDays }} Hari × {{ formatPrice(1000) }}</span>
                  <span class="font-semibold">{{ formatPrice((builderStore.invitation?.activeDays || 0) * 1000) }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-3">
            <button
              class="btn-primary w-full text-lg py-4"
              @click="processPayment"
            >
              <Icon name="heroicons-credit-card" class="w-5 h-5 inline mr-2" />
              Bayar & Publikasikan
            </button>
            <button
              class="btn-secondary w-full py-3"
              @click="showPublishModal = false"
            >
              Batal
            </button>
          </div>

          <p class="text-xs text-gray-500 text-center mt-4">
            Pembayaran aman melalui Midtrans
          </p>
        </div>
      </div>
    </Transition>
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