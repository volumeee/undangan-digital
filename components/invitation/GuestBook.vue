<template>
  <div class="section-container">
    <div class="max-w-2xl mx-auto">
      <h2 class="text-3xl font-bold mb-8 text-center" :style="headingStyles">
        Buku Tamu
      </h2>

      <!-- Guest Book Form -->
      <div class="glass-card p-6 mb-8">
        <form @submit.prevent="submitEntry" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">Nama</label>
            <input
              v-model="form.guestName"
              type="text"
              required
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              placeholder="Nama Anda"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-2">Ucapan & Doa</label>
            <textarea
              v-model="form.message"
              required
              rows="3"
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              placeholder="Tulis ucapan dan doa..."
            ></textarea>
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-2">Foto (opsional)</label>
            <input
              type="file"
              accept="image/*"
              @change="handlePhotoUpload"
              class="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-2">Reaksi</label>
            <div class="flex gap-2">
              <button
                v-for="emoji in emojis"
                :key="emoji"
                type="button"
                @click="form.reaction = emoji"
                :class="[
                  'text-2xl p-2 rounded-lg transition-all',
                  form.reaction === emoji ? 'bg-rose-100 scale-110' : 'hover:bg-gray-100'
                ]"
              >
                {{ emoji }}
              </button>
            </div>
          </div>
          
          <button
            type="submit"
            :disabled="submitting"
            class="w-full bg-gradient-to-r from-rose-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50"
          >
            {{ submitting ? 'Mengirim...' : 'Kirim Ucapan' }}
          </button>
        </form>
      </div>

      <!-- Guest Book Entries -->
      <div class="space-y-4">
        <div
          v-for="entry in entries"
          :key="entry.id"
          class="glass-card p-6"
        >
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0">
              <div
                v-if="entry.photo"
                class="w-12 h-12 rounded-full overflow-hidden"
              >
                <img
                  :src="entry.photo"
                  :alt="entry.guestName"
                  class="w-full h-full object-cover"
                />
              </div>
              <div
                v-else
                class="w-12 h-12 rounded-full bg-gradient-to-r from-rose-400 to-purple-400 flex items-center justify-center text-white font-semibold"
              >
                {{ entry.guestName.charAt(0).toUpperCase() }}
              </div>
            </div>
            
            <div class="flex-1">
              <div class="flex items-center justify-between mb-2">
                <h4 class="font-semibold">{{ entry.guestName }}</h4>
                <div class="flex items-center gap-2">
                  <span v-if="entry.reaction" class="text-xl">{{ entry.reaction }}</span>
                  <span class="text-sm text-gray-500">
                    {{ formatDate(entry.createdAt) }}
                  </span>
                </div>
              </div>
              <p class="text-gray-700">{{ entry.message }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!entries.length" class="text-center py-12">
        <Icon name="heroicons-chat-bubble-left-right" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p class="text-gray-500">Belum ada ucapan. Jadilah yang pertama!</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GuestBookEntry } from '~/types'

const props = defineProps<{
  invitationId: number
}>()

const { invitationId } = toRefs(props)

const supabase = useSupabaseClient()

// Reactive data
const entries = ref<GuestBookEntry[]>([])
const submitting = ref(false)
const form = ref({
  guestName: '',
  message: '',
  photo: '',
  reaction: ''
})

const emojis = ['❤️', '🎉', '🙏', '💕', '✨', '🌹', '💐', '🎊']

// Computed styles (inherited from parent)
const headingStyles = computed(() => ({
  fontFamily: 'Playfair Display, serif',
  color: '#d4a574'
}))

// Fetch guest book entries
const fetchEntries = async () => {
  try {
    const { data, error } = await supabase
      .from('guest_book')
      .select('*')
      .eq('invitation_id', invitationId.value)
      .eq('is_visible', true)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    entries.value = data || []
  } catch (error) {
    console.error('Failed to fetch guest book entries:', error)
  }
}

// Submit new entry
const submitEntry = async () => {
  submitting.value = true
  
  try {
    let photoUrl = ''
    
    if (form.value.photo) {
      // Upload photo logic here
      photoUrl = form.value.photo
    }
    
    const { error } = await supabase
      .from('guest_book')
      .insert({
        invitation_id: invitationId.value,
        guest_name: form.value.guestName,
        message: form.value.message,
        photo: photoUrl,
        reaction: form.value.reaction,
        is_visible: true
      })
    
    if (error) throw error
    
    // Reset form
    form.value = {
      guestName: '',
      message: '',
      photo: '',
      reaction: ''
    }
    
    // Refresh entries
    await fetchEntries()
  } catch (error) {
    console.error('Failed to submit guest book entry:', error)
    alert('Gagal mengirim ucapan. Silakan coba lagi.')
  } finally {
    submitting.value = false
  }
}

// Handle photo upload
const handlePhotoUpload = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  
  try {
    const fileName = `guest-book/${invitationId.value}-${Date.now()}.${file.name.split('.').pop()}`
    const { data, error } = await supabase.storage
      .from('invitations')
      .upload(fileName, file)
    
    if (error) throw error
    
    const { data: { publicUrl } } = supabase.storage
      .from('invitations')
      .getPublicUrl(data.path)
    
    form.value.photo = publicUrl
  } catch (error) {
    console.error('Failed to upload photo:', error)
    alert('Gagal mengupload foto')
  }
}

// Format date
const formatDate = (date: string) => {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date))
}

// Real-time subscription
onMounted(() => {
  fetchEntries()
  
  // Subscribe to real-time updates
  const channel = supabase
    .channel('guest_book_changes')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'guest_book',
        filter: `invitation_id=eq.${invitationId.value}`
      },
      (payload) => {
        if (payload.new.is_visible) {
          entries.value.unshift(payload.new as GuestBookEntry)
        }
      }
    )
    .subscribe()
  
  onUnmounted(() => {
    supabase.removeChannel(channel)
  })
})
</script>