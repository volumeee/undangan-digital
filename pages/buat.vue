<template>
  <div class="min-h-screen bg-gradient-primary">
    <!-- Header -->
    <nav class="glass-card sticky top-0 z-50 px-6 py-4 m-4 animate-slide-down">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <NuxtLink to="/" class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-r from-rose-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
            <Icon name="heroicons-heart" class="w-6 h-6 text-white" />
          </div>
          <h1 class="text-2xl font-bold text-gradient">
            UndanganKu
          </h1>
        </NuxtLink>
        <NuxtLink to="/" class="btn-ghost">
          <Icon name="heroicons-arrow-left" class="w-5 h-5 inline mr-2" />
          Kembali
        </NuxtLink>
      </div>
    </nav>

    <div class="container mx-auto px-4 py-12">
      <div class="text-center mb-12 animate-fade-in">
        <h1 class="text-5xl md:text-6xl font-bold mb-4 text-gradient">
          Pilih Tema Undangan
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Pilih tema yang sesuai dengan acara spesial Anda
        </p>
      </div>

      <!-- Event Type Selection -->
      <div class="mb-16 animate-slide-up">
        <h2 class="text-3xl font-bold mb-8 text-center text-gray-900">
          <Icon name="heroicons-calendar" class="w-8 h-8 inline mr-2 text-rose-600" />
          Jenis Acara
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
          <button
            v-for="type in eventTypes"
            :key="type.value"
            @click="selectedEventType = type.value"
            :class="[
              'p-6 rounded-xl border-3 transition-all text-center group',
              selectedEventType === type.value
                ? 'border-rose-500 bg-gradient-to-br from-rose-50 to-purple-50 text-rose-700 shadow-xl scale-105'
                : 'border-gray-200 bg-white hover:border-rose-300 hover:shadow-lg hover:scale-105'
            ]"
          >
            <Icon 
              :name="type.icon" 
              :class="[
                'w-10 h-10 mx-auto mb-3 transition-transform group-hover:scale-110',
                selectedEventType === type.value ? 'text-rose-600' : 'text-gray-600'
              ]" 
            />
            <div class="font-semibold">{{ type.label }}</div>
          </button>
        </div>
      </div>

      <!-- Theme Templates -->
      <div class="mb-16 animate-slide-up" style="animation-delay: 0.1s">
        <h2 class="text-3xl font-bold mb-8 text-center text-gray-900">
          <Icon name="heroicons-sparkles" class="w-8 h-8 inline mr-2 text-purple-600" />
          Pilih Tema
        </h2>
        <div class="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div
            v-for="(theme, index) in themes"
            :key="theme.id"
            class="glass-card overflow-hidden card-hover group"
            :style="`animation-delay: ${index * 0.1}s`"
            @click="selectTheme(theme)"
          >
            <div class="relative h-64 bg-gradient-to-br overflow-hidden" :style="theme.preview">
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
              <div class="absolute top-4 right-4">
                <span class="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-700">
                  {{ theme.category }}
                </span>
              </div>
            </div>
            <div class="p-6 bg-white">
              <h3 class="text-2xl font-bold mb-2 text-gray-900 group-hover:text-rose-600 transition-colors">{{ theme.name }}</h3>
              <p class="text-gray-600 mb-4 leading-relaxed">{{ theme.description }}</p>
              <button class="btn-primary w-full">
                <Icon name="heroicons-arrow-right" class="w-5 h-5 inline mr-2" />
                Pilih Tema Ini
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Custom Theme Option -->
      <div class="text-center animate-slide-up" style="animation-delay: 0.2s">
        <div class="glass-card p-10 max-w-2xl mx-auto">
          <div class="w-20 h-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Icon name="heroicons-sparkles" class="w-10 h-10 text-white" />
          </div>
          <h3 class="text-2xl font-bold mb-3 text-gray-900">Atau Buat Tema Kustom</h3>
          <p class="text-gray-600 mb-6">Mulai dari awal dan buat desain unik sesuai keinginan Anda</p>
          <button
            @click="createCustomTheme"
            class="btn-primary text-lg px-12 py-4"
          >
            <Icon name="heroicons-paint-brush" class="w-5 h-5 inline mr-2" />
            Buat Tema Kustom
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { EventType } from '~/types'

type ThemeOption = {
  id: string
  name: string
  description: string
  category: string
  preview: string
}

const selectedEventType = ref<EventType>('wedding')

const eventTypes: Array<{ value: EventType; label: string; icon: string }> = [
  { value: 'wedding', label: 'Pernikahan', icon: 'heroicons-heart' },
  { value: 'engagement', label: 'Lamaran', icon: 'heroicons-gift' },
  { value: 'aqiqah', label: 'Aqiqah', icon: 'heroicons-star' },
  { value: 'birthday', label: 'Ulang Tahun', icon: 'heroicons-cake' },
  { value: 'corporate', label: 'Corporate', icon: 'heroicons-briefcase' }
]

const themes: ThemeOption[] = [
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

const selectTheme = (theme: ThemeOption) => {
  const slug = generateSlug()
  navigateTo(`/builder/${slug}?theme=${theme.id}&type=${selectedEventType.value}`)
}

const createCustomTheme = () => {
  const slug = generateSlug()
  navigateTo(`/builder/${slug}?type=${selectedEventType.value}&custom=true`)
}

const generateSlug = () => {
  return `${selectedEventType.value}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 11)}`
}

useSeoMeta({
  title: 'Pilih Tema - UndanganKu',
  description: 'Pilih tema undangan digital yang sesuai dengan acara spesial Anda'
})
</script>
