<template>
  <div class="space-y-4">
    <!-- Color Palette -->
    <div>
      <button
        @click="activeSection = 'color'"
        :class="[
          'w-full text-left p-3 rounded-lg flex justify-between items-center',
          activeSection === 'color' ? 'bg-rose-50 text-rose-700' : 'bg-gray-50 hover:bg-gray-100'
        ]"
      >
        <span class="font-medium">Warna Tema</span>
        <Icon name="heroicons-chevron-down" :class="{ 'rotate-180': activeSection === 'color' }" />
      </button>
      
      <div v-if="activeSection === 'color'" class="mt-3 space-y-3">
        <div>
          <label class="block text-sm font-medium mb-2">Warna Utama</label>
          <div class="flex gap-2">
            <input
              v-model="builderStore.invitation!.themeConfig.color.primary"
              type="color"
              class="w-16 h-10 rounded cursor-pointer"
            />
            <input
              v-model="builderStore.invitation!.themeConfig.color.primary"
              type="text"
              class="flex-1 px-3 py-2 border rounded-lg text-sm"
              placeholder="#d4a574"
            />
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium mb-2">Warna Sekunder</label>
          <div class="flex gap-2">
            <input
              v-model="builderStore.invitation!.themeConfig.color.secondary"
              type="color"
              class="w-16 h-10 rounded cursor-pointer"
            />
            <input
              v-model="builderStore.invitation!.themeConfig.color.secondary"
              type="text"
              class="flex-1 px-3 py-2 border rounded-lg text-sm"
              placeholder="#8b7355"
            />
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium mb-2">Warna Background</label>
          <div class="flex gap-2">
            <input
              v-model="builderStore.invitation!.themeConfig.color.background"
              type="color"
              class="w-16 h-10 rounded cursor-pointer"
            />
            <input
              v-model="builderStore.invitation!.themeConfig.color.background"
              type="text"
              class="flex-1 px-3 py-2 border rounded-lg text-sm"
              placeholder="#faf8f5"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Typography -->
    <div>
      <button
        @click="activeSection = 'typography'"
        :class="[
          'w-full text-left p-3 rounded-lg flex justify-between items-center',
          activeSection === 'typography' ? 'bg-rose-50 text-rose-700' : 'bg-gray-50 hover:bg-gray-100'
        ]"
      >
        <span class="font-medium">Tipografi</span>
        <Icon name="heroicons-chevron-down" :class="{ 'rotate-180': activeSection === 'typography' }" />
      </button>
      
      <div v-if="activeSection === 'typography'" class="mt-3 space-y-3">
        <div>
          <label class="block text-sm font-medium mb-2">Font Heading</label>
          <select
            v-model="builderStore.invitation!.themeConfig.typography.headingFont"
            class="w-full px-3 py-2 border rounded-lg text-sm"
          >
            <option value="Playfair Display">Playfair Display</option>
            <option value="Dancing Script">Dancing Script</option>
            <option value="Montserrat">Montserrat</option>
            <option value="Lato">Lato</option>
            <option value="Roboto">Roboto</option>
            <option value="Poppins">Poppins</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium mb-2">Font Body</label>
          <select
            v-model="builderStore.invitation!.themeConfig.typography.bodyFont"
            class="w-full px-3 py-2 border rounded-lg text-sm"
          >
            <option value="Montserrat">Montserrat</option>
            <option value="Lato">Lato</option>
            <option value="Roboto">Roboto</option>
            <option value="Poppins">Poppins</option>
            <option value="Inter">Inter</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Background -->
    <div>
      <button
        @click="activeSection = 'background'"
        :class="[
          'w-full text-left p-3 rounded-lg flex justify-between items-center',
          activeSection === 'background' ? 'bg-rose-50 text-rose-700' : 'bg-gray-50 hover:bg-gray-100'
        ]"
      >
        <span class="font-medium">Background</span>
        <Icon name="heroicons-chevron-down" :class="{ 'rotate-180': activeSection === 'background' }" />
      </button>
      
      <div v-if="activeSection === 'background'" class="mt-3 space-y-3">
        <div>
          <label class="block text-sm font-medium mb-2">Tipe Background</label>
          <select
            v-model="builderStore.invitation!.themeConfig.background.type"
            class="w-full px-3 py-2 border rounded-lg text-sm"
          >
            <option value="color">Warna Solid</option>
            <option value="pattern">Pola</option>
            <option value="upload">Upload Gambar</option>
          </select>
        </div>
        
        <div v-if="builderStore.invitation?.themeConfig.background.type === 'color'">
          <input
            v-model="builderStore.invitation.themeConfig.background.value"
            type="color"
            class="w-full h-10 rounded cursor-pointer"
          />
        </div>
        
        <div v-if="builderStore.invitation?.themeConfig.background.type === 'upload'">
          <input
            type="file"
            accept="image/*"
            @change="handleBackgroundUpload"
            class="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100"
          />
        </div>
      </div>
    </div>

    <!-- Animation -->
    <div>
      <button
        @click="activeSection = 'animation'"
        :class="[
          'w-full text-left p-3 rounded-lg flex justify-between items-center',
          activeSection === 'animation' ? 'bg-rose-50 text-rose-700' : 'bg-gray-50 hover:bg-gray-100'
        ]"
      >
        <span class="font-medium">Animasi</span>
        <Icon name="heroicons-chevron-down" :class="{ 'rotate-180': activeSection === 'animation' }" />
      </button>
      
      <div v-if="activeSection === 'animation'" class="mt-3">
        <label class="block text-sm font-medium mb-2">Kecepatan Animasi</label>
        <select
          v-model="builderStore.invitation!.themeConfig.animation"
          class="w-full px-3 py-2 border rounded-lg text-sm"
        >
          <option value="slow">Lambat & Romantis</option>
          <option value="fast">Cepat & Dinamis</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBuilderStore } from '~/stores/builder'
import { useUpload } from '~/composables/useUpload'

const builderStore = useBuilderStore()
const { uploadFile } = useUpload()

const activeSection = ref('color')

const handleBackgroundUpload = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file || !builderStore.invitation) return
  
  try {
    const path = `backgrounds/${builderStore.invitation.slug}-${Date.now()}`
    const url = await uploadFile(file, path)
    builderStore.invitation.themeConfig.background.value = url
  } catch (error) {
    console.error('Failed to upload background:', error)
  }
}
</script>