// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    '@nuxtjs/supabase',
    '@vee-validate/nuxt',
    '@nuxt/image',
  ],

  shadcn:{
    prefix: '',
    componentDir: './components/ui',
  },

  imports:{
    dirs:[
      'composables/api/**',
      'composables/**',
    ]
  },

  runtimeConfig: {
    public: {
      supabaseRedirectUrl: '',
      backendUrl: '',
      mediaUrl:''
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

  pinia: {
    storesDirs: ['./state/**'],
  },
})