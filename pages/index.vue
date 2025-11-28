<template>
  <div class="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
    <!-- Navigation -->
    <nav class="glass-card sticky top-0 z-50 px-6 py-4 m-4">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
          UndanganKu
        </h1>
        <div class="flex gap-4">
          <button
            @click="showLogin = true"
            class="glass-button text-gray-700 hover:text-rose-600"
          >
            Masuk
          </button>
          <NuxtLink
            to="/buat"
            class="bg-gradient-to-r from-rose-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all hover:scale-105"
          >
            Buat Undangan
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="section-container">
      <div class="text-center mb-16 animate-fade-in">
        <h2 class="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
          Undangan Digital Premium
        </h2>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Buat undangan pernikahan, lamaran, aqiqah, dan acara spesial lainnya dengan desain yang menawan dan fitur lengkap
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink
            to="/buat"
            class="bg-gradient-to-r from-rose-600 to-purple-600 text-white px-8 py-4 rounded-lg font-medium hover:shadow-xl transition-all hover:scale-105"
          >
            Mulai Sekarang
          </NuxtLink>
          <button class="glass-button text-gray-700 px-8 py-4">
            Lihat Demo
          </button>
        </div>
      </div>

      <!-- Features -->
      <div class="grid md:grid-cols-3 gap-8 mb-16">
        <div class="glass-card p-8 text-center hover:scale-105 transition-transform">
          <div class="w-16 h-16 bg-gradient-to-r from-rose-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="heroicons-paint-brush" class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-xl font-semibold mb-2">Desain Kustomisasi</h3>
          <p class="text-gray-600">Kustomisasi warna, font, musik, dan layout sesuai keinginan Anda</p>
        </div>
        
        <div class="glass-card p-8 text-center hover:scale-105 transition-transform">
          <div class="w-16 h-16 bg-gradient-to-r from-rose-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="heroicons-users" class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-xl font-semibold mb-2">Manajemen Tamu</h3>
          <p class="text-gray-600">Kelola daftar tamu, RSVP, dan buku tamu digital dengan mudah</p>
        </div>
        
        <div class="glass-card p-8 text-center hover:scale-105 transition-transform">
          <div class="w-16 h-16 bg-gradient-to-r from-rose-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="heroicons-bolt" class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-xl font-semibold mb-2">WhatsApp Blast</h3>
          <p class="text-gray-600">Kirim undangan ke ribuan tamu melalui WhatsApp dengan satu klik</p>
        </div>
      </div>
    </section>

    <!-- Pricing -->
    <section class="section-container">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold mb-4">Harga Terjangkau</h2>
        <p class="text-gray-600">Bayar sesuai kebutuhan Anda</p>
      </div>
      
      <div class="max-w-4xl mx-auto">
        <div class="glass-card p-8">
          <div class="text-center mb-8">
            <div class="text-4xl font-bold text-rose-600 mb-2">
              Mulai dari Rp 75.000
            </div>
            <p class="text-gray-600">
              + Rp 2.500 per tamu + Rp 1.000 per hari aktif
            </p>
          </div>
          
          <div class="space-y-4 text-center">
            <div class="flex items-center justify-center gap-2">
              <Icon name="heroicons-check-circle" class="w-5 h-5 text-green-500" />
              <span>Kustomisasi tema penuh</span>
            </div>
            <div class="flex items-center justify-center gap-2">
              <Icon name="heroicons-check-circle" class="w-5 h-5 text-green-500" />
              <span>Manajemen tamu tak terbatas</span>
            </div>
            <div class="flex items-center justify-center gap-2">
              <Icon name="heroicons-check-circle" class="w-5 h-5 text-green-500" />
              <span>WhatsApp Gateway</span>
            </div>
            <div class="flex items-center justify-center gap-2">
              <Icon name="heroicons-check-circle" class="w-5 h-5 text-green-500" />
              <span>Galeri foto & musik</span>
            </div>
            <div class="flex items-center justify-center gap-2">
              <Icon name="heroicons-check-circle" class="w-5 h-5 text-green-500" />
              <span>RSVP & buku tamu digital</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Login Modal -->
    <div
      v-if="showLogin"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      @click="showLogin = false"
    >
      <div
        class="bg-white rounded-xl p-8 max-w-md w-full"
        @click.stop
      >
        <h3 class="text-2xl font-bold mb-6">Masuk ke Akun Anda</h3>
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Email</label>
            <input
              v-model="loginForm.email"
              type="email"
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              required
            />
          </div>
          <div class="mb-6">
            <label class="block text-sm font-medium mb-2">Password</label>
            <input
              v-model="loginForm.password"
              type="password"
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full bg-gradient-to-r from-rose-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all"
          >
            Masuk
          </button>
        </form>
        <p class="text-center mt-4 text-gray-600">
          Belum punya akun? 
          <button @click="showLogin = false; showRegister = true" class="text-rose-600 hover:underline">
            Daftar
          </button>
        </p>
      </div>
    </div>

    <!-- Register Modal -->
    <div
      v-if="showRegister"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      @click="showRegister = false"
    >
      <div
        class="bg-white rounded-xl p-8 max-w-md w-full"
        @click.stop
      >
        <h3 class="text-2xl font-bold mb-6">Buat Akun Baru</h3>
        <form @submit.prevent="handleRegister">
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Nama Lengkap</label>
            <input
              v-model="registerForm.name"
              type="text"
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Email</label>
            <input
              v-model="registerForm.email"
              type="email"
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              required
            />
          </div>
          <div class="mb-6">
            <label class="block text-sm font-medium mb-2">Password</label>
            <input
              v-model="registerForm.password"
              type="password"
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full bg-gradient-to-r from-rose-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all"
          >
            Daftar
          </button>
        </form>
        <p class="text-center mt-4 text-gray-600">
          Sudah punya akun? 
          <button @click="showRegister = false; showLogin = true" class="text-rose-600 hover:underline">
            Masuk
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const showLogin = ref(false)
const showRegister = ref(false)

const loginForm = ref({
  email: '',
  password: ''
})

const registerForm = ref({
  name: '',
  email: '',
  password: ''
})

const handleLogin = async () => {
  const result = await authStore.login(loginForm.value.email, loginForm.value.password)
  if (result.success) {
    showLogin.value = false
    await navigateTo('/dashboard')
  } else {
    alert(result.error)
  }
}

const handleRegister = async () => {
  const result = await authStore.register(registerForm.value.email, registerForm.value.password, registerForm.value.name)
  if (result.success) {
    showRegister.value = false
    await navigateTo('/dashboard')
  } else {
    alert(result.error)
  }
}

useSeoMeta({
  title: 'UndanganKu - Undangan Digital Premium Indonesia',
  description: 'Buat undangan digital premium untuk pernikahan, lamaran, aqiqah dengan desain kustom dan fitur lengkap',
  ogTitle: 'UndanganKu - Undangan Digital Premium',
  ogDescription: 'Buat undangan digital premium dengan kustomisasi penuh, WhatsApp Gateway, dan manajemen tamu',
  ogImage: '/og-image.jpg'
})
</script>