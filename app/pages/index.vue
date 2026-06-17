<template>
  <div>
    <!-- ─── HERO ─────────────────────────────────────────────────── -->
    <section ref="heroSection" class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950">
      <!-- Background gradient with parallax -->
      <div ref="heroBg" class="absolute inset-0 bg-gradient-to-br from-brand-950 via-gray-900 to-gray-950" />

      <!-- Decorative circles -->
      <div class="absolute top-1/4 start-1/4 w-96 h-96 rounded-full bg-brand-600/10 blur-3xl pointer-events-none" />
      <div class="absolute bottom-1/4 end-1/4 w-72 h-72 rounded-full bg-gold-500/10 blur-3xl pointer-events-none" />

      <div ref="heroContent" class="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p class="text-gold-400 text-sm font-semibold tracking-[0.3em] uppercase mb-4 opacity-0" ref="heroBadge">
          {{ t('hero.badge') }}
        </p>
        <h1 class="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6 opacity-0" ref="heroTitle">
          {{ t('hero.title') }}<br />
          <span class="text-gold-400">{{ t('hero.titleAccent') }}</span>
        </h1>
        <p class="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10 opacity-0" ref="heroSubtitle">
          {{ t('hero.subtitle') }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center opacity-0" ref="heroCta">
          <NuxtLink
            :to="localePath('/portfolio')"
            class="px-8 py-4 bg-gold-500 text-white font-semibold rounded-full hover:bg-gold-600 transition-colors duration-200"
          >
            {{ t('hero.cta_portfolio') }}
          </NuxtLink>
          <NuxtLink
            :to="localePath('/contact')"
            class="px-8 py-4 bg-white/10 text-white font-semibold rounded-full border border-white/30 hover:bg-white/20 transition-colors duration-200"
          >
            {{ t('hero.cta_contact') }}
          </NuxtLink>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 opacity-0" ref="scrollIndicator">
        <span class="text-xs uppercase tracking-widest">Scroll</span>
        <div class="w-px h-10 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
      </div>
    </section>

    <!-- ─── STATS ─────────────────────────────────────────────────── -->
    <section class="bg-gray-950 border-t border-white/5 py-14">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref="statsGrid" class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div v-for="stat in stats" :key="stat.label" class="space-y-1">
            <p class="text-3xl sm:text-4xl font-display font-bold text-gold-400">{{ stat.value }}</p>
            <p class="text-sm text-gray-400">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── FEATURED PROJECTS ─────────────────────────────────────── -->
    <section class="py-20 lg:py-28 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref="featuredHeader" class="text-center mb-12">
          <p class="text-brand-600 text-sm font-semibold tracking-widest uppercase mb-2">{{ t('portfolio.title') }}</p>
          <h2 class="section-title">{{ t('hero.cta_portfolio') }}</h2>
          <p class="section-subtitle mx-auto mt-3">{{ t('portfolio.subtitle') }}</p>
        </div>

        <div v-if="store.loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="n in 3" :key="n" class="rounded-2xl bg-gray-100 animate-pulse h-80" />
        </div>

        <div v-else ref="featuredGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProjectCard
            v-for="project in featuredProjects"
            :key="project.id"
            :project="project"
          />
        </div>

        <div class="text-center mt-10">
          <NuxtLink :to="localePath('/portfolio')" class="btn-primary inline-block">
            {{ t('hero.cta_portfolio') }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ─── WHY US ─────────────────────────────────────────────────── -->
    <section class="py-20 lg:py-28 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref="whyHeader" class="text-center mb-14">
          <h2 class="section-title">{{ isAr ? 'لماذا عميرة؟' : 'Why Emera?' }}</h2>
        </div>
        <div ref="whyGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="item in whyItems"
            :key="item.icon"
            class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div class="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mb-5 text-2xl">
              {{ item.icon }}
            </div>
            <h3 class="font-display font-semibold text-lg text-gray-900 mb-2">{{ item.title }}</h3>
            <p class="text-gray-500 text-sm leading-relaxed">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── CTA BANNER ─────────────────────────────────────────────── -->
    <section ref="ctaBanner" class="bg-brand-900 py-16 lg:py-20">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h2 class="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
          {{ isAr ? 'هل أنت مستعد للعثور على منزل أحلامك؟' : 'Ready to Find Your Dream Property?' }}
        </h2>
        <p class="text-brand-200 text-lg mb-8">
          {{ isAr ? 'تواصل مع فريقنا اليوم ودعنا نرشدك.' : 'Get in touch with our team today and let us guide you.' }}
        </p>
        <NuxtLink :to="localePath('/contact')" class="inline-block px-8 py-4 bg-gold-500 text-white font-semibold rounded-full hover:bg-gold-600 transition-colors duration-200">
          {{ t('nav.inquire') }}
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useProjectsStore } from '~/stores/projects'
import { initScrollAnimations, killScrollTriggers } from '~/utils/animations'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const store = useProjectsStore()

const isAr = computed(() => locale.value === 'ar')

// Refs for GSAP
const heroBg = ref<HTMLElement | null>(null)
const heroBadge = ref<HTMLElement | null>(null)
const heroTitle = ref<HTMLElement | null>(null)
const heroSubtitle = ref<HTMLElement | null>(null)
const heroCta = ref<HTMLElement | null>(null)
const scrollIndicator = ref<HTMLElement | null>(null)
const statsGrid = ref<HTMLElement | null>(null)
const featuredHeader = ref<HTMLElement | null>(null)
const featuredGrid = ref<HTMLElement | null>(null)
const whyHeader = ref<HTMLElement | null>(null)
const whyGrid = ref<HTMLElement | null>(null)
const ctaBanner = ref<HTMLElement | null>(null)

const featuredProjects = computed(() => store.projects.slice(0, 3))

const stats = computed(() => [
  { value: '5+', label: isAr.value ? 'سنة خبرة' : 'Years of Experience' },
  { value: '80+', label: isAr.value ? 'وحدة مسلّمة' : 'Units Delivered' },
  { value: '5', label: isAr.value ? 'مشروع مكتمل' : 'Completed Projects' },
  { value: '98%', label: isAr.value ? 'رضا العملاء' : 'Client Satisfaction' },
])

const whyItems = computed(() => isAr.value ? [
  { icon: '🏆', title: 'جودة لا تُضاهى', desc: 'نستخدم أجود المواد ونوظّف أمهر المهندسين لضمان تشطيبات تدوم.' },
  { icon: '📍', title: 'مواقع استراتيجية', desc: 'مشاريعنا في أكثر المناطق طلباً في مصر بما يضمن قيمة استثمارية متنامية.' },
  { icon: '🤝', title: 'شراكة حقيقية', desc: 'نرافقك من الاختيار حتى التسليم وما بعده بخدمة عملاء استثنائية.' },
] : [
  { icon: '🏆', title: 'Unmatched Quality', desc: 'We use the finest materials and employ the most skilled engineers to ensure finishes that last.' },
  { icon: '📍', title: 'Prime Locations', desc: 'Our developments sit in the most sought-after areas in Egypt, guaranteeing long-term investment value.' },
  { icon: '🤝', title: 'True Partnership', desc: 'We walk with you from selection to handover and beyond with exceptional after-sales service.' },
])

onMounted(async () => {
  await store.fetchProjects()

  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  // Hero entrance sequence
  const tl = gsap.timeline({ delay: 0.1 })
  tl.to(heroBadge.value, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
    .to(heroTitle.value, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.3')
    .to(heroSubtitle.value, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
    .to(heroCta.value, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
    .to(scrollIndicator.value, { opacity: 1, duration: 0.4 }, '-=0.1')

  // Hero parallax
  gsap.to(heroBg.value, {
    yPercent: 30,
    ease: 'none',
    scrollTrigger: { trigger: 'body', start: 'top top', end: '30% top', scrub: true },
  })

  // Stats counter feel
  if (statsGrid.value) {
    gsap.fromTo(
      statsGrid.value.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: statsGrid.value, start: 'top 85%' },
      }
    )
  }

  // Scroll animations for other sections
  await initScrollAnimations({
    fadeUp: [featuredHeader.value, whyHeader.value, ctaBanner.value].filter(Boolean) as Element[],
    stagger: [featuredGrid.value, whyGrid.value].filter(Boolean) as Element[],
  })
})

onUnmounted(killScrollTriggers)

useHead({ title: 'Emera Developments — Premium Real Estate Egypt' })
</script>
