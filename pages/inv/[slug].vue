<template>
  <div
    class="min-h-screen invitation-container"
    :style="invitationStyles"
  >
    <!-- Music Player -->
    <div
      v-if="themeConfig.music.enabled && themeConfig.music.showPlayer"
      class="fixed bottom-4 right-4 z-50 glass-card p-3"
    >
      <audio
        ref="audioPlayer"
        :src="themeConfig.music.url"
        :autoplay="themeConfig.music.autoplay"
        :volume="themeConfig.music.startVolume"
        controls
        class="w-48"
      />
    </div>

    <!-- Header Section -->
    <section class="section-container invitation-section text-center">
      <div class="mb-8">
        <h1 class="text-4xl md:text-6xl font-bold mb-4" :style="headingStyles">
          {{ title }}
        </h1>
        <div class="text-xl md:text-2xl" :style="bodyStyles">
          {{ eventTypeLabel }}
        </div>
      </div>

      <!-- Bride & Groom -->
      <div v-if="groom && bride" class="mb-12">
        <div class="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          <div class="text-center">
            <div v-if="groom.photo" class="mb-4">
              <img
                :src="groom.photo"
                :alt="groom.name"
                class="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover mx-auto border-4"
                :style="{ borderColor: themeConfig.color.primary }"
              />
            </div>
            <h3 class="text-2xl font-semibold mb-2" :style="headingStyles">
              {{ groom.name }}
            </h3>
            <p class="text-gray-600" :style="bodyStyles">
              {{ groom.father }} & {{ groom.mother }}
            </p>
          </div>
          
          <div class="text-3xl md:text-4xl" :style="{ color: themeConfig.color.primary }">
            &
          </div>
          
          <div class="text-center">
            <div v-if="bride.photo" class="mb-4">
              <img
                :src="bride.photo"
                :alt="bride.name"
                class="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover mx-auto border-4"
                :style="{ borderColor: themeConfig.color.primary }"
              />
            </div>
            <h3 class="text-2xl font-semibold mb-2" :style="headingStyles">
              {{ bride.name }}
            </h3>
            <p class="text-gray-600" :style="bodyStyles">
              {{ bride.father }} & {{ bride.mother }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Event Details -->
    <section v-if="themeConfig.sections.akad || themeConfig.sections.resepsi" class="section-container invitation-section">
      <div class="max-w-2xl mx-auto">
        <!-- Akad -->
        <div v-if="themeConfig.sections.akad && date.akad" class="mb-12 text-center">
          <h2 class="text-3xl font-bold mb-6" :style="headingStyles">
            {{ themeConfig.labels.akad }}
          </h2>
          <div class="glass-card p-8">
            <div class="text-xl mb-2" :style="bodyStyles">
              {{ formatDate(date.akad) }}
            </div>
            <div class="text-lg text-gray-600 mb-4" :style="bodyStyles">
              {{ formatTime(date.akad) }}
            </div>
            <div v-if="location.akad" class="text-gray-700" :style="bodyStyles">
              {{ location.akad }}
            </div>
          </div>
        </div>

        <!-- Resepsi -->
        <div v-if="themeConfig.sections.resepsi && date.resepsi" class="mb-12 text-center">
          <h2 class="text-3xl font-bold mb-6" :style="headingStyles">
            {{ themeConfig.labels.resepsi }}
          </h2>
          <div class="glass-card p-8">
            <div class="text-xl mb-2" :style="bodyStyles">
              {{ formatDate(date.resepsi) }}
            </div>
            <div class="text-lg text-gray-600 mb-4" :style="bodyStyles">
              {{ formatTime(date.resepsi) }}
            </div>
            <div v-if="location.resepsi" class="text-gray-700 mb-4" :style="bodyStyles">
              {{ location.resepsi }}
            </div>
            <a
              v-if="location.mapUrl"
              :href="location.mapUrl"
              target="_blank"
              class="inline-block glass-button text-gray-700 hover:text-rose-600"
            >
              <Icon name="heroicons-map-pin" class="w-5 h-5 inline mr-2" />
              Lihat Peta
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Love Story -->
    <section
      v-if="themeConfig.sections.loveStory && story"
      class="section-container invitation-section"
    >
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-3xl font-bold mb-8" :style="headingStyles">
          {{ themeConfig.labels.loveStory }}
        </h2>
        <div class="glass-card p-8">
          <p class="text-lg leading-relaxed" :style="bodyStyles">
            {{ story }}
          </p>
        </div>
      </div>
    </section>

    <!-- Gallery -->
    <section
      v-if="themeConfig.sections.gallery && gallery.length"
      class="section-container invitation-section"
    >
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold" :style="headingStyles">
          {{ themeConfig.labels.gallery }}
        </h2>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="(photo, index) in gallery"
          :key="index"
          class="relative group overflow-hidden rounded-lg"
        >
          <img
            :src="photo"
            :alt="`Gallery ${index + 1}`"
            class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </div>
    </section>

    <!-- Guest Book -->
    <section class="section-container invitation-section">
      <GuestBook :invitation-id="id" />
    </section>

    <!-- Footer -->
    <footer class="section-container text-center">
      <p class="text-gray-600" :style="bodyStyles">
        Dibuat dengan ❤️ oleh UndanganKu
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import type { InvitationData, ThemeConfig } from '~/types'

const props = defineProps<{
  slug: string
}>()

const { slug } = toRefs(props)

const createDefaultThemeConfig = (): ThemeConfig => ({
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
})

const createDefaultInvitation = (): InvitationData => ({
  id: 0,
  slug: '',
  eventType: 'wedding',
  ownerId: '',
  title: '',
  date: {},
  location: {},
  story: '',
  gallery: [],
  themeConfig: createDefaultThemeConfig(),
  guestCount: 0,
  activeDays: 0,
  totalPrice: 0,
  status: 'draft'
})

// Get invitation data
const { data: invitation } = await useFetch<InvitationData>(
  `/api/invitation/${slug.value}`,
  {
    key: `invitation-${slug.value}`
  }
)

const invitationData = computed<InvitationData>(() => invitation.value ?? createDefaultInvitation())

const id = computed(() => invitationData.value.id ?? 0)
const title = computed(() => invitationData.value.title)
const eventType = computed(() => invitationData.value.eventType)
const groom = computed(() => invitationData.value.groom)
const bride = computed(() => invitationData.value.bride)
const date = computed(() => invitationData.value.date)
const location = computed(() => invitationData.value.location)
const story = computed(() => invitationData.value.story ?? '')
const gallery = computed(() => invitationData.value.gallery ?? [])
const themeConfig = computed(() => invitationData.value.themeConfig)

// Computed styles
const invitationStyles = computed(() => {
  if (!themeConfig?.value) return {}
  
  return {
    fontFamily: `${themeConfig.value.typography.bodyFont}, sans-serif`,
    backgroundColor: themeConfig.value.color.background,
    color: themeConfig.value.color.secondary
  }
})

const headingStyles = computed(() => {
  if (!themeConfig?.value) return {}
  
  return {
    fontFamily: `${themeConfig.value.typography.headingFont}, serif`,
    color: themeConfig.value.color.primary
  }
})

const bodyStyles = computed(() => {
  if (!themeConfig?.value) return {}
  
  return {
    fontFamily: `${themeConfig.value.typography.bodyFont}, sans-serif`
  }
})

// Event type label
const eventTypeLabel = computed(() => {
  const labels = {
    wedding: 'Pernikahan',
    engagement: 'Lamaran',
    aqiqah: 'Aqiqah',
    birthday: 'Ulang Tahun',
    corporate: 'Acara Corporate'
  }
  return labels[eventType?.value as keyof typeof labels] || 'Acara Spesial'
})

// Date formatting
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(date))
}

const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date))
}

// Listen for updates from builder iframe
onMounted(() => {
  window.addEventListener('message', (event) => {
    if (event.data.type === 'invitation-data') {
      if (invitation.value) {
        Object.assign(invitation.value, event.data.data)
      } else {
        invitation.value = event.data.data as InvitationData
      }
    }
  })
})

// SEO
useSeoMeta({
  title: () => `${title.value || 'Undangan Digital'} - UndanganKu`,
  description: () => `Undangan digital ${eventTypeLabel.value} untuk ${title.value}`,
  ogTitle: () => `${title.value || 'Undangan Digital'} - UndanganKu`,
  ogDescription: () => `Undangan digital ${eventTypeLabel.value} untuk ${title.value}`,
  ogImage: () => gallery.value?.[0] || '/og-image.jpg'
})
</script>

<style scoped>
.invitation-container {
  min-height: 100vh;
}

.invitation-section {
  opacity: 0;
  animation: fadeIn 0.8s ease-out forwards;
}

.invitation-section:nth-child(1) { animation-delay: 0.2s; }
.invitation-section:nth-child(2) { animation-delay: 0.4s; }
.invitation-section:nth-child(3) { animation-delay: 0.6s; }
.invitation-section:nth-child(4) { animation-delay: 0.8s; }
.invitation-section:nth-child(5) { animation-delay: 1s; }

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>