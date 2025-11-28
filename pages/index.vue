<template>
  <div class="min-h-screen bg-gradient-primary">
    <!-- Navigation -->
    <nav class="glass-card sticky top-0 z-50 px-6 py-4 m-4 animate-slide-down">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-r from-rose-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
            <Icon name="heroicons-heart" class="w-6 h-6 text-white" />
          </div>
          <h1 class="text-2xl font-bold text-gradient">
            UndanganKu
          </h1>
        </div>
        <div class="flex gap-3">
          <button
            @click="showLogin = true"
            class="btn-ghost hidden sm:block"
          >
            Masuk
          </button>
          <NuxtLink
            to="/buat"
            class="btn-primary"
          >
            Buat Undangan
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="section-container">
      <div class="text-center mb-16 animate-fade-in">
        <div class="inline-block mb-4 px-6 py-2 bg-rose-100 text-rose-600 rounded-full text-sm font-semibold animate-slide-up">
          ✨ Platform Undangan Digital Terpercaya
        </div>
        <h2 class="text-5xl md:text-7xl font-bold mb-6 text-gradient leading-tight">
          Undangan Digital<br />Premium Indonesia
        </h2>
        <p class="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
          Buat undangan pernikahan, lamaran, aqiqah, dan acara spesial lainnya dengan desain yang menawan dan fitur lengkap
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
          <NuxtLink
            to="/buat"
            class="btn-primary text-lg px-10 py-4 shadow-glow"
          >
            <Icon name="heroicons-sparkles" class="w-5 h-5 inline mr-2" />
            Mulai Sekarang Gratis
          </NuxtLink>
          <button 
            @click="scrollToDemo"
            class="btn-secondary text-lg px-10 py-4"
          >
            <Icon name="heroicons-play-circle" class="w-5 h-5 inline mr-2" />
            Lihat Demo
          </button>
        </div>
        
        <!-- Social Proof -->
        <div class="mt-12 flex flex-wrap justify-center items-center gap-8 text-gray-600">
          <div class="flex items-center gap-2">
            <Icon name="heroicons-check-badge" class="w-6 h-6 text-green-500" />
            <span class="font-medium">1000+ Undangan Dibuat</span>
          </div>
          <div class="flex items-center gap-2">
            <Icon name="heroicons-star" class="w-6 h-6 text-yellow-500" />
            <span class="font-medium">Rating 4.9/5</span>
          </div>
          <div class="flex items-center gap-2">
            <Icon name="heroicons-users" class="w-6 h-6 text-blue-500" />
            <span class="font-medium">500+ Pengguna Aktif</span>
          </div>
        </div>
      </div>

      <!-- Features -->
      <div class="grid md:grid-cols-3 gap-8 mb-16">
        <div class="glass-card p-8 text-center card-hover animate-slide-up" style="animation-delay: 0.1s">
          <div class="w-20 h-20 bg-gradient-to-r from-rose-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl transform hover:rotate-6 transition-transform">
            <Icon name="heroicons-paint-brush" class="w-10 h-10 text-white" />
          </div>
          <h3 class="text-2xl font-bold mb-3 text-gray-900">Desain Kustomisasi</h3>
          <p class="text-gray-600 leading-relaxed">Kustomisasi warna, font, musik, dan layout sesuai keinginan Anda dengan editor drag & drop</p>
        </div>
        
        <div class="glass-card p-8 text-center card-hover animate-slide-up" style="animation-delay: 0.2s">
          <div class="w-20 h-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl transform hover:rotate-6 transition-transform">
            <Icon name="heroicons-users" class="w-10 h-10 text-white" />
          </div>
          <h3 class="text-2xl font-bold mb-3 text-gray-900">Manajemen Tamu</h3>
          <p class="text-gray-600 leading-relaxed">Kelola daftar tamu, RSVP, dan buku tamu digital dengan mudah dalam satu dashboard</p>
        </div>
        
        <div class="glass-card p-8 text-center card-hover animate-slide-up" style="animation-delay: 0.3s">
          <div class="w-20 h-20 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl transform hover:rotate-6 transition-transform">
            <Icon name="heroicons-bolt" class="w-10 h-10 text-white" />
          </div>
          <h3 class="text-2xl font-bold mb-3 text-gray-900">WhatsApp Blast</h3>
          <p class="text-gray-600 leading-relaxed">Kirim undangan ke ribuan tamu melalui WhatsApp dengan satu klik tanpa ribet</p>
        </div>
      </div>
    </section>

    <!-- Pricing -->
    <section class="section-container" id="pricing">
      <div class="text-center mb-16 animate-fade-in">
        <h2 class="text-4xl md:text-5xl font-bold mb-4 text-gradient">Harga Terjangkau</h2>
        <p class="text-xl text-gray-600">Bayar sesuai kebutuhan Anda, tanpa biaya tersembunyi</p>
      </div>
      
      <div class="max-w-4xl mx-auto">
        <div class="glass-card p-10 md:p-12 animate-scale-in shadow-glow">
          <div class="text-center mb-10">
            <div class="inline-block px-4 py-1 bg-rose-100 text-rose-600 rounded-full text-sm font-semibold mb-4">
              💰 Harga Spesial
            </div>
            <div class="text-5xl md:text-6xl font-bold text-gradient mb-3">
              Rp 75.000
            </div>
            <p class="text-gray-600 text-lg">
              + Rp 2.500/tamu + Rp 1.000/hari aktif
            </p>
          </div>
          
          <div class="grid md:grid-cols-2 gap-6 mb-8">
            <div class="flex items-start gap-3 p-4 bg-white/50 rounded-lg">
              <div class="flex-shrink-0">
                <Icon name="heroicons-check-circle" class="w-7 h-7 text-green-500" />
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-1">Kustomisasi tema penuh</h4>
                <p class="text-sm text-gray-600">Ubah warna, font, dan layout sesuka hati</p>
              </div>
            </div>
            <div class="flex items-start gap-3 p-4 bg-white/50 rounded-lg">
              <div class="flex-shrink-0">
                <Icon name="heroicons-check-circle" class="w-7 h-7 text-green-500" />
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-1">Manajemen tamu unlimited</h4>
                <p class="text-sm text-gray-600">Tidak ada batasan jumlah tamu</p>
              </div>
            </div>
            <div class="flex items-start gap-3 p-4 bg-white/50 rounded-lg">
              <div class="flex-shrink-0">
                <Icon name="heroicons-check-circle" class="w-7 h-7 text-green-500" />
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-1">WhatsApp Gateway</h4>
                <p class="text-sm text-gray-600">Kirim undangan via WhatsApp otomatis</p>
              </div>
            </div>
            <div class="flex items-start gap-3 p-4 bg-white/50 rounded-lg">
              <div class="flex-shrink-0">
                <Icon name="heroicons-check-circle" class="w-7 h-7 text-green-500" />
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-1">Galeri foto & musik</h4>
                <p class="text-sm text-gray-600">Upload foto dan musik favorit Anda</p>
              </div>
            </div>
            <div class="flex items-start gap-3 p-4 bg-white/50 rounded-lg">
              <div class="flex-shrink-0">
                <Icon name="heroicons-check-circle" class="w-7 h-7 text-green-500" />
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-1">RSVP & buku tamu digital</h4>
                <p class="text-sm text-gray-600">Kelola konfirmasi kehadiran dengan mudah</p>
              </div>
            </div>
            <div class="flex items-start gap-3 p-4 bg-white/50 rounded-lg">
              <div class="flex-shrink-0">
                <Icon name="heroicons-check-circle" class="w-7 h-7 text-green-500" />
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-1">Support 24/7</h4>
                <p class="text-sm text-gray-600">Bantuan kapan saja Anda butuhkan</p>
              </div>
            </div>
          </div>

          <div class="text-center">
            <NuxtLink
              to="/buat"
              class="btn-primary text-lg px-12 py-4 inline-block"
            >
              <Icon name="heroicons-rocket-launch" class="w-5 h-5 inline mr-2" />
              Mulai Buat Undangan
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Login Modal -->
    <Transition name="modal">
      <div
        v-if="showLogin"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        @click="showLogin = false"
      >
        <div
          class="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-scale-in"
          @click.stop
        >
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-3xl font-bold text-gradient">Masuk</h3>
            <button 
              @click="showLogin = false"
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Icon name="heroicons-x-mark" class="w-6 h-6" />
            </button>
          </div>
          
          <div v-if="loginError" class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {{ loginError }}
          </div>

          <form @submit.prevent="handleLogin" class="space-y-5">
            <div>
              <label class="block text-sm font-semibold mb-2 text-gray-700">Email</label>
              <input
                v-model="loginForm.email"
                type="email"
                class="input-field"
                placeholder="nama@email.com"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-semibold mb-2 text-gray-700">Password</label>
              <input
                v-model="loginForm.password"
                type="password"
                class="input-field"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              :disabled="isLoggingIn"
              class="btn-primary w-full"
            >
              <span v-if="!isLoggingIn">Masuk</span>
              <span v-else class="flex items-center justify-center gap-2">
                <div class="loading-spinner h-5 w-5 border-2"></div>
                Memproses...
              </span>
            </button>
          </form>
          
          <div class="mt-6 text-center">
            <p class="text-gray-600">
              Belum punya akun? 
              <button 
                @click="showLogin = false; showRegister = true" 
                class="text-rose-600 font-semibold hover:underline"
              >
                Daftar Sekarang
              </button>
            </p>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Register Modal -->
    <Transition name="modal">
      <div
        v-if="showRegister"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        @click="showRegister = false"
      >
        <div
          class="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-scale-in"
          @click.stop
        >
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-3xl font-bold text-gradient">Daftar</h3>
            <button 
              @click="showRegister = false"
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Icon name="heroicons-x-mark" class="w-6 h-6" />
            </button>
          </div>
          
          <div v-if="registerError" class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {{ registerError }}
          </div>

          <form @submit.prevent="handleRegister" class="space-y-5">
            <div>
              <label class="block text-sm font-semibold mb-2 text-gray-700">Nama Lengkap</label>
              <input
                v-model="registerForm.name"
                type="text"
                class="input-field"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-semibold mb-2 text-gray-700">Email</label>
              <input
                v-model="registerForm.email"
                type="email"
                class="input-field"
                placeholder="nama@email.com"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-semibold mb-2 text-gray-700">Password</label>
              <input
                v-model="registerForm.password"
                type="password"
                class="input-field"
                placeholder="Minimal 6 karakter"
                minlength="6"
                required
              />
            </div>
            <button
              type="submit"
              :disabled="isRegistering"
              class="btn-primary w-full"
            >
              <span v-if="!isRegistering">Daftar</span>
              <span v-else class="flex items-center justify-center gap-2">
                <div class="loading-spinner h-5 w-5 border-2"></div>
                Memproses...
              </span>
            </button>
          </form>
          
          <div class="mt-6 text-center">
            <p class="text-gray-600">
              Sudah punya akun? 
              <button 
                @click="showRegister = false; showLogin = true" 
                class="text-rose-600 font-semibold hover:underline"
              >
                Masuk
              </button>
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const showLogin = ref(false)
const showRegister = ref(false)
const isLoggingIn = ref(false)
const isRegistering = ref(false)
const loginError = ref('')
const registerError = ref('')

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
  loginError.value = ''
  isLoggingIn.value = true
  
  try {
    const result = await authStore.login(loginForm.value.email, loginForm.value.password)
    if (result.success) {
      showLogin.value = false
      await navigateTo('/dashboard')
    } else {
      loginError.value = result.error || 'Terjadi kesalahan saat login'
    }
  } catch (error) {
    loginError.value = 'Terjadi kesalahan saat login'
  } finally {
    isLoggingIn.value = false
  }
}

const handleRegister = async () => {
  registerError.value = ''
  isRegistering.value = true
  
  try {
    const result = await authStore.register(registerForm.value.email, registerForm.value.password, registerForm.value.name)
    if (result.success) {
      showRegister.value = false
      await navigateTo('/dashboard')
    } else {
      registerError.value = result.error || 'Terjadi kesalahan saat mendaftar'
    }
  } catch (error) {
    registerError.value = 'Terjadi kesalahan saat mendaftar'
  } finally {
    isRegistering.value = false
  }
}

const scrollToDemo = () => {
  const pricingSection = document.getElementById('pricing')
  if (pricingSection) {
    pricingSection.scrollIntoView({ behavior: 'smooth' })
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

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>