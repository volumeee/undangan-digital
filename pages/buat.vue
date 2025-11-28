<template>
  <div class="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
        Pilih Tema Undangan
      </h1>

      <!-- Event Type Selection -->
      <div class="mb-12">
        <h2 class="text-2xl font-semibold mb-6 text-center">Jenis Acara</h2>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
          <button
            v-for="type in eventTypes"
            :key="type.value"
            @click="selectedEventType = type.value"
            :class="[
              'p-4 rounded-lg border-2 transition-all text-center',
              selectedEventType === type.value
                ? 'border-rose-500 bg-rose-50 text-rose-700'
                : 'border-gray-200 hover:border-gray-300'
            ]"
          >
            <Icon :name="type.icon" class="w-8 h-8 mx-auto mb-2" />
            <div class="font-medium">{{ type.label }}</div>
          </button>
        </div>
      </div>

      <!-- Theme Templates -->
      <div class="mb-12">
        <h2 class="text-2xl font-semibold mb-6 text-center">Pilih Tema</h2>
        <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div
            v-for="theme in themes"
            :key="theme.id"
            class="glass-card overflow-hidden hover:scale-105 transition-transform cursor-pointer"
            @click="selectTheme(theme)"
          >
            <div class="h-48 bg-gradient-to-br" :style="theme.preview"></div>
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-2">{{ theme.name }}</h3>
              <p class="text-gray-600 mb-4">{{ theme.description }}</p>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500">{{ theme.category }}</span>
                <button class="bg-gradient-to-r from-rose-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:shadow-lg transition-all">
                  Pilih
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Custom Theme Option -->
      <div class="text-center">
        <button
          @click="createCustomTheme"
          class="glass-button bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-medium hover:shadow-xl transition-all"
        >
          <Icon name="heroicons-sparkles" class="w-5 h-5 inline mr-2" />
          Buat Tema Kustom
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const selectedEventType = ref('wedding')

const eventTypes = [
  { value: 'wedding', label: 'Pernikahan', icon: 'heroicons-heart' },
  { value: 'engagement', label: 'Lamaran', icon: 'heroicons-gift' },
  { value: 'aqiqah', label: 'Aqiqah', icon: 'heroicons-star' },
  { value: 'birthday', label: 'Ulang Tahun', icon: 'heroicons-cake' },
  { value: 'corporate', label: 'Corporate', icon: 'heroicons-briefcase' }
]

const themes = [
  {
    id: 'elegant-rose',
    name: 'Elegant Rose',
    description: 'Tema klasik dengan sentuhan mawar yang romantis',
    category: 'Klasik',
    preview: 'background: linear-gradient(135deg, #ffeaa7 0%, #dfe6e9 50%, #fab1a0 100%)'
  },
  {
    id: 'minimal-floral',
    name: 'Minimal Floral',
    description: 'Desain minimalis dengan aksen floral yang elegan',
    category: 'Minimalis',
    preview: 'background: linear-gradient(135deg, #a8e6cf 0%, #dcedc1 50%, #ffd3b6 100%)'
  },
  {
    id: 'royal-gold',
    name: 'Royal Gold',
    description: 'Tema mewah dengan sentuhan emas yang berkelas',
    category: 'Mewah',
    preview: 'background: linear-gradient(135deg, #f6e05e 0%, #ed8936 50%, #9f7aea 100%)'
  },
  {
    id: 'rustic-wood',
    name: 'Rustic Wood',
    description: 'Gaya rustic dengan nuansa alam yang hangat',
    category: 'Rustic',
    preview: 'background: linear-gradient(135deg, #8b7355 0%, #d4a574 50%, #f4e4d4 100%)'
  },
  {
    id: 'modern-geometric',
    name: 'Modern Geometric',
    description: 'Desain modern dengan pola geometris yang trendi',
    category: 'Modern',
    preview: 'background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
  },
  {
    id: 'vintage-lace',
    name: 'Vintage Lace',
    description: 'Tema vintage dengan detail lace yang anggun',
    category: 'Vintage',
    preview: 'background: linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 50%, #e17055 100%)'
  }
]

const selectTheme = (theme: any) => {
  const slug = generateSlug()
  navigateTo(`/builder/${slug}?theme=${theme.id}&type=${selectedEventType.value}`)
}

const createCustomTheme = () => {
  const slug = generateSlug()
  navigateTo(`/builder/${slug}?type=${selectedEventType.value}&custom=true`)
}

const generateSlug = () => {
  return `${selectedEventType.value}-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 9)}`
}

useSeoMeta({
  title: 'Pilih Tema - UndanganKu',
  description: 'Pilih tema undangan digital yang sesuai dengan acara spesial Anda'
})
</script>