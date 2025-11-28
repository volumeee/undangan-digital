<template>
  <div class="space-y-4">
    <!-- Event Details -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Judul Undangan</label>
      <input
        v-model="builderStore.invitation!.title"
        type="text"
        class="w-full px-3 py-2 border rounded-lg text-sm"
        placeholder="Contoh: Pernikahan John & Jane"
      />
    </div>

    <!-- Bride & Groom Info -->
    <div v-if="showBrideGroom">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Nama Mempelai Pria</label>
          <input
            v-model="builderStore.invitation!.groom!.name"
            type="text"
            class="w-full px-3 py-2 border rounded-lg text-sm"
            placeholder="Nama lengkap"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Nama Mempelai Wanita</label>
          <input
            v-model="builderStore.invitation!.bride!.name"
            type="text"
            class="w-full px-3 py-2 border rounded-lg text-sm"
            placeholder="Nama lengkap"
          />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Ayah Mempelai Pria</label>
          <input
            v-model="builderStore.invitation!.groom!.father"
            type="text"
            class="w-full px-3 py-2 border rounded-lg text-sm"
            placeholder="Nama ayah"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Ibu Mempelai Pria</label>
          <input
            v-model="builderStore.invitation!.groom!.mother"
            type="text"
            class="w-full px-3 py-2 border rounded-lg text-sm"
            placeholder="Nama ibu"
          />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Ayah Mempelai Wanita</label>
          <input
            v-model="builderStore.invitation!.bride!.father"
            type="text"
            class="w-full px-3 py-2 border rounded-lg text-sm"
            placeholder="Nama ayah"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Ibu Mempelai Wanita</label>
          <input
            v-model="builderStore.invitation!.bride!.mother"
            type="text"
            class="w-full px-3 py-2 border rounded-lg text-sm"
            placeholder="Nama ibu"
          />
        </div>
      </div>
    </div>

    <!-- Event Date & Time -->
    <div>
      <h4 class="font-medium mb-3">Tanggal & Waktu</h4>
      <div class="space-y-3">
        <div v-if="builderStore.invitation!.themeConfig.sections.akad">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ builderStore.invitation!.themeConfig.labels.akad }}
          </label>
          <input
            v-model="akadDateTime"
            type="datetime-local"
            class="w-full px-3 py-2 border rounded-lg text-sm"
          />
        </div>
        
        <div v-if="builderStore.invitation!.themeConfig.sections.resepsi">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ builderStore.invitation!.themeConfig.labels.resepsi }}
          </label>
          <input
            v-model="resepsiDateTime"
            type="datetime-local"
            class="w-full px-3 py-2 border rounded-lg text-sm"
          />
        </div>
      </div>
    </div>

    <!-- Event Location -->
    <div>
      <h4 class="font-medium mb-3">Lokasi</h4>
      <div class="space-y-3">
        <div v-if="builderStore.invitation!.themeConfig.sections.akad">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Lokasi {{ builderStore.invitation!.themeConfig.labels.akad }}
          </label>
          <textarea
            v-model="builderStore.invitation!.location.akad"
            class="w-full px-3 py-2 border rounded-lg text-sm"
            rows="2"
            placeholder="Alamat lengkap"
          ></textarea>
        </div>
        
        <div v-if="builderStore.invitation!.themeConfig.sections.resepsi">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Lokasi {{ builderStore.invitation!.themeConfig.labels.resepsi }}
          </label>
          <textarea
            v-model="builderStore.invitation!.location.resepsi"
            class="w-full px-3 py-2 border rounded-lg text-sm"
            rows="2"
            placeholder="Alamat lengkap"
          ></textarea>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Google Maps URL</label>
          <input
            v-model="builderStore.invitation!.location.mapUrl"
            type="url"
            class="w-full px-3 py-2 border rounded-lg text-sm"
            placeholder="https://maps.google.com/..."
          />
        </div>
      </div>
    </div>

    <!-- Love Story -->
    <div v-if="showBrideGroom && builderStore.invitation!.themeConfig.sections.loveStory">
      <label class="block text-sm font-medium text-gray-700 mb-2">
        {{ builderStore.invitation!.themeConfig.labels.loveStory }}
      </label>
      <textarea
        v-model="builderStore.invitation!.story"
        class="w-full px-3 py-2 border rounded-lg text-sm"
        rows="4"
        placeholder="Cerita perjalanan cinta kalian..."
      ></textarea>
    </div>

    <!-- Section Toggles -->
    <div>
      <h4 class="font-medium mb-3">Seksi yang Ditampilkan</h4>
      <div class="space-y-2">
        <label
          v-for="(enabled, section) in builderStore.invitation!.themeConfig.sections"
          :key="section"
          class="flex items-center gap-2"
        >
          <input
            v-model="builderStore.invitation!.themeConfig.sections[section]"
            type="checkbox"
            class="rounded text-rose-600"
          />
          <span class="text-sm">{{ builderStore.invitation!.themeConfig.labels[section] }}</span>
        </label>
      </div>
    </div>

    <!-- Custom Labels -->
    <div>
      <h4 class="font-medium mb-3">Label Kustom</h4>
      <div class="space-y-2">
        <div v-for="(label, key) in builderStore.invitation!.themeConfig.labels" :key="key">
          <input
            v-model="builderStore.invitation!.themeConfig.labels[key]"
            type="text"
            class="w-full px-3 py-1 border rounded text-sm"
            maxlength="50"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBuilderStore } from '~/stores/builder'

const builderStore = useBuilderStore()

const showBrideGroom = computed(() => {
  return !['corporate', 'birthday'].includes(builderStore.invitation?.eventType || '')
})

const akadDateTime = computed({
  get: () => {
    if (!builderStore.invitation?.date.akad) return ''
    return new Date(builderStore.invitation.date.akad).toISOString().slice(0, 16)
  },
  set: (value) => {
    if (builderStore.invitation) {
      builderStore.invitation.date.akad = new Date(value)
    }
  }
})

const resepsiDateTime = computed({
  get: () => {
    if (!builderStore.invitation?.date.resepsi) return ''
    return new Date(builderStore.invitation.date.resepsi).toISOString().slice(0, 16)
  },
  set: (value) => {
    if (builderStore.invitation) {
      builderStore.invitation.date.resepsi = new Date(value)
    }
  }
})
</script>