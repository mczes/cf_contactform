// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  nitro: {
    preset: 'cloudflare-pages'
  },
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    public: {
      receiverEmail: process.env.NUXT_RECEIVER_EMAIL,
      senderEmail: process.env.NUXT_SENDER_EMAIL,
      apiEndpoint: process.env.NUXT_API_ENDPOINT,
    },
  },
})
