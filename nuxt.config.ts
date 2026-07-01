// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: ['~/assets/styles/globals.css'],

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    '@nuxtjs/i18n',
  ],

  i18n: {
    bundle: {
      optimizeTranslationDirective: false,
    },
    locales: [
      { code: 'en', language: 'en-US', file: 'en.json', dir: 'ltr', name: 'English' },
      { code: 'ar', language: 'ar-EG', file: 'ar.json', dir: 'rtl', name: 'العربية' },
    ],
    defaultLocale: 'en',
    restructureDir: 'i18n',
    langDir: 'locales/',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      redirectOn: 'root',
    },
  },

  supabase: {
    redirectOptions: {
      login: '/admin/login',
      callback: '/confirm',
      exclude: ['/', '/portfolio', '/projects/*', '/contact', '/about', '/ar', '/ar/*', '/api/*', '/sitemap.xml'],
    },
  },

  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://emera-developments.vercel.app',
    },
  },

  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'gsap',
        'gsap/ScrollTrigger',
        'pinia',
      ],
    },
  },

  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Premium construction and real estate development projects.' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/logo.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;600;700&family=Cairo:wght@300;400;500;600;700&display=swap',
        },
      ],
    },
  },
})
