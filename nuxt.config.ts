export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    '@nuxtjs/supabase'
  ],
  css: ['~/assets/css/tailwind.css'],
  googleFonts: {
    families: {
      'Playfair+Display': [400, 700],
      'Montserrat': [300, 400, 600, 700],
      'Dancing+Script': [400, 700],
      'Lato': [300, 400, 700],
      'Roboto': [300, 400, 700],
      'Poppins': [300, 400, 600, 700]
    },
    display: 'swap'
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    viewer: true,
  },

  runtimeConfig: {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_ANON_KEY,
    supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY,
    midtransServerKey: process.env.MIDTRANS_SERVER_KEY,
    midtransClientKey: process.env.MIDTRANS_CLIENT_KEY,
    fonnteApiKey: process.env.FONNTE_API_KEY,
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_ANON_KEY,
      midtransClientKey: process.env.MIDTRANS_CLIENT_KEY
    }
  },
  typescript: {
    strict: true,
    typeCheck: true
  },
  nitro: {
    preset: 'cloudflare-pages'
  }
})