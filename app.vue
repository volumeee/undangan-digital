<template>
  <div class="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()

onMounted(async () => {
  await authStore.initialize()
})

useHead({
  title: 'UndanganKu - Undangan Digital Premium',
  meta: [
    { name: 'description', content: 'Buat undangan digital premium dengan fitur lengkap dan desain yang menawan' }
  ]
})
</script>