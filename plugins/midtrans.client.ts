export default defineNuxtPlugin(() => {
  // Load Midtrans Snap script
  const script = document.createElement('script')
  script.src = 'https://app.sandbox.midtrans.com/snap/snap.js'
  script.setAttribute('data-client-key', useRuntimeConfig().public.midtransClientKey)
  script.async = true
  
  document.head.appendChild(script)
  
  return {
    provide: {
      midtrans: {
        isReady: ref(false)
      }
    }
  }
})