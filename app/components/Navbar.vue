<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="isTransparent ? 'bg-transparent' : 'bg-white/95 backdrop-blur shadow-md'"
  >
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 lg:h-20">
        <!-- Logo -->
        <NuxtLink :to="localePath('/')" class="flex items-center gap-3 shrink-0">
          <img src="/logo.png" alt="Emera Developments" class="h-10 w-auto" />
          <span
            class="font-display font-semibold text-lg hidden sm:block transition-colors duration-300"
            :class="isTransparent ? 'text-white' : 'text-gray-900'"
          >
            EMERA DEVELOPMENTS
          </span>
        </NuxtLink>

        <!-- Desktop links (lg+) -->
        <ul class="hidden lg:flex items-center gap-8">
          <li v-for="link in navLinks" :key="link.key">
            <NuxtLink
              :to="localePath(link.to)"
              class="text-sm font-medium tracking-wide transition-colors duration-200"
              :class="isTransparent ? 'text-white/90 hover:text-gold-400' : 'text-gray-700 hover:text-gold-500'"
              active-class="!text-gold-500 font-semibold"
            >
              {{ t(link.key) }}
            </NuxtLink>
          </li>

          <!-- Language switcher -->
          <li>
            <button
              class="text-sm font-medium transition-colors duration-200 px-3 py-1 rounded-full border"
              :class="isTransparent
                ? 'text-white/80 border-white/30 hover:text-white hover:border-white'
                : 'text-gray-600 border-gray-300 hover:border-gold-500 hover:text-gold-500'"
              @click="toggleLocale"
            >
              {{ otherLocaleLabel }}
            </button>
          </li>

          <li>
            <NuxtLink
              :to="localePath('/contact')"
              class="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
              :class="isTransparent
                ? 'bg-gold-500/20 text-white border border-gold-400/60 hover:bg-gold-500/40'
                : 'bg-gold-500 text-white hover:bg-gold-600'"
            >
              {{ t('nav.inquire') }}
            </NuxtLink>
          </li>
        </ul>

        <!-- Mobile / Tablet right side (< lg) -->
        <div class="lg:hidden flex items-center gap-2">
          <button
            class="text-xs font-medium px-2.5 py-1 rounded-full border transition-colors duration-150"
            :class="isTransparent
              ? 'text-white/80 border-white/30'
              : 'text-gray-600 border-gray-300'"
            @click="toggleLocale"
          >
            {{ otherLocaleLabel }}
          </button>
          <button
            class="p-2 rounded-lg transition-colors duration-200"
            :class="isTransparent ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'"
            aria-label="Toggle menu"
            @click="mobileOpen = !mobileOpen"
          >
            <svg v-if="!mobileOpen" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile / Tablet menu -->
      <Transition name="slide-down">
        <div v-if="mobileOpen" class="lg:hidden bg-white border-t border-gray-100 shadow-lg rounded-b-2xl">
          <ul class="flex flex-col py-4 px-2">
            <li v-for="link in navLinks" :key="link.key">
              <NuxtLink
                :to="localePath(link.to)"
                class="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-gold-500 hover:bg-amber-50 rounded-xl transition-colors duration-150"
                active-class="!text-gold-500 bg-amber-50 font-semibold"
                @click="mobileOpen = false"
              >
                {{ t(link.key) }}
              </NuxtLink>
            </li>
            <li class="px-4 pt-2">
              <NuxtLink
                :to="localePath('/contact')"
                class="block text-center px-5 py-2.5 bg-gold-500 text-white rounded-full text-sm font-semibold hover:bg-gold-600 transition-colors duration-150"
                @click="mobileOpen = false"
              >
                {{ t('nav.inquire') }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </Transition>
    </nav>
  </header>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const router = useRouter()
const route = useRoute()

const scrolled = ref(false)
const mobileOpen = ref(false)

const navLinks = [
  { to: '/', key: 'nav.home' },
  { to: '/portfolio', key: 'nav.portfolio' },
  { to: '/about', key: 'nav.about' },
  { to: '/contact', key: 'nav.contact' },
]

const otherLocale = computed(() => locale.value === 'en' ? 'ar' : 'en')
const otherLocaleLabel = computed(() => locale.value === 'en' ? 'عربي' : 'EN')

// Only show transparent navbar on home page when not scrolled
const isHome = computed(() => route.path === '/' || route.path === '/ar')
const isTransparent = computed(() => isHome.value && !scrolled.value)

function toggleLocale() {
  const path = switchLocalePath(otherLocale.value)
  if (path) router.push(path)
}

onMounted(() => {
  const onScroll = () => { scrolled.value = window.scrollY > 40 }
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.2s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
