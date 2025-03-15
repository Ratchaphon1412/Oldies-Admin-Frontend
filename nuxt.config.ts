// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/supabase',
    '@nuxt/image',
  ],

  shadcn:{
    prefix: '',
    componentDir: './components/ui',
  },

  runtimeConfig: {
    public: {
      supabaseRedirectUrl: '',
    },
  },

  supabase:{
    redirectOptions: {
      login: '/*',
      callback: '/auth/oauth/callback',
      include: undefined,
      exclude: [],
      cookieRedirect: false,
    }
  },
})