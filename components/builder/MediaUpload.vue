<template>
  <div class="space-y-4">
    <!-- Photo Upload -->
    <div>
      <h4 class="font-medium mb-3">Foto Mempelai</h4>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Foto Mempelai Pria</label>
          <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            <input
              type="file"
              accept="image/*"
              @change="handleGroomPhotoUpload"
              class="hidden"
              ref="groomPhotoInput"
            />
            <div
              v-if="!builderStore.invitation?.groom?.photo"
              @click="groomPhotoInput?.click()"
              class="cursor-pointer"
            >
              <Icon name="heroicons-photo" class="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p class="text-sm text-gray-500">Klik untuk upload</p>
            </div>
            <div v-else class="relative">
              <img
                :src="builderStore.invitation.groom.photo"
                alt="Groom"
                class="w-full h-32 object-cover rounded"
              />
              <button
                @click="removeGroomPhoto"
                class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
              >
                <Icon name="heroicons-x-mark" class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Foto Mempelai Wanita</label>
          <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            <input
              type="file"
              accept="image/*"
              @change="handleBridePhotoUpload"
              class="hidden"
              ref="bridePhotoInput"
            />
            <div
              v-if="!builderStore.invitation?.bride?.photo"
              @click="bridePhotoInput?.click()"
              class="cursor-pointer"
            >
              <Icon name="heroicons-photo" class="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p class="text-sm text-gray-500">Klik untuk upload</p>
            </div>
            <div v-else class="relative">
              <img
                :src="builderStore.invitation.bride.photo"
                alt="Bride"
                class="w-full h-32 object-cover rounded"
              />
              <button
                @click="removeBridePhoto"
                class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
              >
                <Icon name="heroicons-x-mark" class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Gallery Upload -->
    <div>
      <h4 class="font-medium mb-3">Galeri Foto</h4>
      <div class="border-2 border-dashed border-gray-300 rounded-lg p-4">
        <input
          type="file"
          accept="image/*"
          multiple
          @change="handleGalleryUpload"
          class="hidden"
          ref="galleryInput"
        />
        <div @click="galleryInput?.click()" class="cursor-pointer text-center">
          <Icon name="heroicons-photo" class="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p class="text-sm text-gray-500">Upload foto galeri (maksimal 10 foto)</p>
        </div>
        
        <div v-if="builderStore.invitation?.gallery?.length" class="mt-4">
          <div class="grid grid-cols-3 gap-2">
            <div
              v-for="(photo, index) in builderStore.invitation.gallery"
              :key="index"
              class="relative"
            >
              <img
                :src="photo"
                :alt="`Gallery ${index + 1}`"
                class="w-full h-24 object-cover rounded"
              />
              <button
                @click="removeGalleryPhoto(index)"
                class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
              >
                <Icon name="heroicons-x-mark" class="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Music Upload -->
    <div>
      <h4 class="font-medium mb-3">Musik Latar</h4>
      <div class="space-y-3">
        <div class="border-2 border-dashed border-gray-300 rounded-lg p-4">
          <input
            type="file"
            accept="audio/*"
            @change="handleMusicUpload"
            class="hidden"
            ref="musicInput"
          />
          <div
            v-if="!builderStore.invitation?.themeConfig.music.url"
            @click="musicInput?.click()"
            class="cursor-pointer text-center"
          >
            <Icon name="heroicons-musical-note" class="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p class="text-sm text-gray-500">Upload musik (MP3)</p>
          </div>
          <div v-else class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <Icon name="heroicons-musical-note" class="w-8 h-8 text-rose-600" />
              <span class="text-sm">Music uploaded</span>
            </div>
            <button
              @click="removeMusic"
              class="text-red-500 hover:text-red-700"
            >
              <Icon name="heroicons-trash" class="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div class="space-y-2">
          <label class="flex items-center gap-2">
            <input
              v-model="builderStore.invitation!.themeConfig.music.enabled"
              type="checkbox"
              class="rounded text-rose-600"
            />
            <span class="text-sm">Aktifkan musik</span>
          </label>
          
          <label class="flex items-center gap-2">
            <input
              v-model="builderStore.invitation!.themeConfig.music.autoplay"
              type="checkbox"
              class="rounded text-rose-600"
            />
            <span class="text-sm">Autoplay</span>
          </label>
          
          <label class="flex items-center gap-2">
            <input
              v-model="builderStore.invitation!.themeConfig.music.showPlayer"
              type="checkbox"
              class="rounded text-rose-600"
            />
            <span class="text-sm">Tampilkan player</span>
          </label>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Volume Awal: {{ Math.round(builderStore.invitation!.themeConfig.music.startVolume * 100) }}%
            </label>
            <input
              v-model.number="builderStore.invitation!.themeConfig.music.startVolume"
              type="range"
              min="0"
              max="1"
              step="0.1"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Person } from '~/types'
import { useBuilderStore } from '~/stores/builder'
import { useUpload } from '~/composables/useUpload'

const builderStore = useBuilderStore()
const { uploadImage, uploadGalleryImage } = useUpload()

const groomPhotoInput = ref<HTMLInputElement | null>(null)
const bridePhotoInput = ref<HTMLInputElement | null>(null)
const galleryInput = ref<HTMLInputElement | null>(null)
const musicInput = ref<HTMLInputElement | null>(null)

const createEmptyPerson = (): Person => ({
  name: '',
  father: '',
  mother: '',
  photo: ''
})

const handleGroomPhotoUpload = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file || !builderStore.invitation) return
  
  try {
    const url = await uploadImage(file, builderStore.invitation.slug, 'groom')
    const groom = builderStore.invitation.groom ?? createEmptyPerson()
    builderStore.invitation.groom = {
      ...groom,
      photo: url
    }
  } catch (error) {
    console.error('Failed to upload groom photo:', error)
  }
}

const handleBridePhotoUpload = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file || !builderStore.invitation) return
  
  try {
    const url = await uploadImage(file, builderStore.invitation.slug, 'bride')
    const bride = builderStore.invitation.bride ?? createEmptyPerson()
    builderStore.invitation.bride = {
      ...bride,
      photo: url
    }
  } catch (error) {
    console.error('Failed to upload bride photo:', error)
  }
}

const handleGalleryUpload = async (event: Event) => {
  const files = (event.target as HTMLInputElement).files
  if (!files || !builderStore.invitation) return
  
  const maxPhotos = 10
  const currentCount = builderStore.invitation.gallery.length
  const availableSlots = maxPhotos - currentCount
  
  if (availableSlots <= 0) {
    alert('Maksimal 10 foto galeri')
    return
  }
  
  const filesToUpload = Array.from(files).slice(0, availableSlots)
  
  try {
    const uploadPromises = filesToUpload.map((file, index) =>
      uploadGalleryImage(file, builderStore.invitation!.slug, currentCount + index)
    )
    
    const urls = await Promise.all(uploadPromises)
    builderStore.invitation.gallery = [...builderStore.invitation.gallery, ...urls]
  } catch (error) {
    console.error('Failed to upload gallery photos:', error)
  }
}

const handleMusicUpload = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file || !builderStore.invitation) return
  
  try {
    const fileName = `${builderStore.invitation.slug}/music-${Date.now()}.${file.name.split('.').pop()}`
    const url = await uploadImage(file, builderStore.invitation.slug, 'music')
    builderStore.invitation.themeConfig.music.url = url
  } catch (error) {
    console.error('Failed to upload music:', error)
  }
}

const removeGroomPhoto = () => {
  if (builderStore.invitation?.groom) {
    builderStore.invitation.groom.photo = ''
  }
}

const removeBridePhoto = () => {
  if (builderStore.invitation?.bride) {
    builderStore.invitation.bride.photo = ''
  }
}

const removeGalleryPhoto = (index: number) => {
  if (builderStore.invitation?.gallery) {
    builderStore.invitation.gallery.splice(index, 1)
  }
}

const removeMusic = () => {
  if (builderStore.invitation?.themeConfig.music) {
    builderStore.invitation.themeConfig.music.url = ''
  }
}
</script>