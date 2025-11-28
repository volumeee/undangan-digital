import type { InvitationData } from '~/types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<any>(null)
  const loading = ref(false)
  
  const supabase = useSupabaseClient()
  
  const login = async (email: string, password: string) => {
    loading.value = true
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) throw error
      
      user.value = data.user
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    } finally {
      loading.value = false
    }
  }
  
  const register = async (email: string, password: string, name: string) => {
    loading.value = true
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name
          }
        }
      })
      
      if (error) throw error
      
      user.value = data.user
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    } finally {
      loading.value = false
    }
  }
  
  const logout = async () => {
    await supabase.auth.signOut()
    user.value = null
  }
  
  const initialize = async () => {
    const { data: { user: authUser } } = await supabase.auth.getUser()
    user.value = authUser
  }
  
  return {
    user,
    loading,
    login,
    register,
    logout,
    initialize
  }
})