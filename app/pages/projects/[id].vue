<template>
  <div class="pt-20 min-h-screen">
    <!-- Not found -->
    <div v-if="!store.loading && !project" class="flex flex-col items-center justify-center py-32 text-center px-4">
      <p class="text-5xl mb-4">🏗️</p>
      <h1 class="text-2xl font-bold text-gray-900 mb-2">{{ isAr ? 'المشروع غير موجود' : 'Project Not Found' }}</h1>
      <NuxtLink :to="localePath('/portfolio')" class="mt-4 btn-primary inline-block">
        {{ t('portfolio.title') }}
      </NuxtLink>
    </div>

    <!-- Loading -->
    <div v-else-if="store.loading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="animate-pulse space-y-6">
        <div class="h-10 bg-gray-200 rounded w-1/2" />
        <div class="aspect-video bg-gray-200 rounded-2xl" />
        <div class="h-4 bg-gray-200 rounded w-3/4" />
        <div class="h-4 bg-gray-200 rounded w-1/2" />
      </div>
    </div>

    <!-- Project detail -->
    <template v-else-if="project">
      <!-- Hero image strip -->
      <div ref="heroEl" class="relative h-[40vh] sm:h-[50vh] overflow-hidden bg-gray-900">
        <img
          :src="project.images[0]"
          :alt="displayTitle"
          class="w-full h-full object-cover opacity-70"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />
        <div class="absolute bottom-0 start-0 end-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <!-- Status badge -->
          <span class="inline-flex px-3 py-1 rounded-full text-xs font-semibold mb-3" :class="statusClasses">
            {{ statusLabel }}
          </span>
          <h1 class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white">{{ displayTitle }}</h1>
          <p class="flex items-center gap-2 text-gray-300 mt-2">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            {{ displayLocation }}
          </p>
        </div>
      </div>

      <!-- Body -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <!-- Main content -->
          <div class="lg:col-span-2 space-y-10">
            <!-- Gallery -->
            <div ref="galleryEl">
              <h2 class="text-lg font-semibold text-gray-900 mb-4">{{ t('project.gallery') }}</h2>
              <ProjectGallery :images="project.images" :alt="displayTitle" />
            </div>

            <!-- Description -->
            <div ref="descEl">
              <h2 class="text-lg font-semibold text-gray-900 mb-3">
                {{ isAr ? 'عن المشروع' : 'About This Project' }}
              </h2>
              <p class="text-gray-600 leading-relaxed text-base">{{ displayDescription }}</p>
            </div>

            <!-- Specifications -->
            <div ref="specsEl">
              <h2 class="text-lg font-semibold text-gray-900 mb-4">{{ t('project.specifications') }}</h2>
              <dl class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div
                  v-for="(value, key) in displaySpecs"
                  :key="key"
                  class="bg-gray-50 rounded-xl p-4 border border-gray-100"
                >
                  <dt class="text-xs text-gray-500 uppercase tracking-wide mb-1">{{ key }}</dt>
                  <dd class="font-semibold text-gray-900">{{ value }}</dd>
                </div>
              </dl>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Price card -->
            <div ref="priceCard" class="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sticky top-24 flex flex-col items-center gap-4">
              <p class="text-sm text-gray-500 text-center">
                {{ isAr ? 'للاستفسار عن السعر والتفاصيل، تواصل معنا مباشرة' : 'Contact us directly for pricing and availability details.' }}
              </p>
              <NuxtLink
                :to="localePath('/contact')"
                class="block text-center w-full py-3.5 bg-gold-500 text-white font-semibold rounded-xl hover:bg-gold-600 transition-colors duration-200"
              >
                {{ t('project.inquire') }}
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Related projects -->
        <div v-if="relatedProjects.length" ref="relatedEl" class="mt-16">
          <h2 class="section-title mb-8">{{ t('project.related') }}</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectCard v-for="p in relatedProjects" :key="p.id" :project="p" />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useProjectsStore } from '~/stores/projects'
import { initScrollAnimations, killScrollTriggers } from '~/utils/animations'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const store = useProjectsStore()

const isAr = computed(() => locale.value === 'ar')

const heroEl = ref<HTMLElement | null>(null)
const galleryEl = ref<HTMLElement | null>(null)
const descEl = ref<HTMLElement | null>(null)
const specsEl = ref<HTMLElement | null>(null)
const priceCard = ref<HTMLElement | null>(null)
const relatedEl = ref<HTMLElement | null>(null)

const project = computed(() => store.getById(String(route.params.id)))

const displayTitle = computed(() =>
  isAr.value && project.value?.title_ar ? project.value.title_ar : project.value?.title ?? ''
)
const displayLocation = computed(() =>
  isAr.value && project.value?.location_ar ? project.value.location_ar : project.value?.location ?? ''
)
const displayDescription = computed(() =>
  isAr.value && project.value?.description_ar ? project.value.description_ar : project.value?.description ?? ''
)
const displaySpecs = computed(() =>
  isAr.value && project.value?.specifications_ar
    ? project.value.specifications_ar
    : project.value?.specifications ?? {}
)

const formattedPrice = computed(() => {
  if (!project.value?.price) return ''
  return new Intl.NumberFormat(isAr.value ? 'ar-EG' : 'en-EG', {
    style: 'currency',
    currency: 'EGP',
    maximumFractionDigits: 0,
  }).format(project.value.price)
})

const statusClasses = computed(() => ({
  'available': 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
  'sold': 'bg-gray-500/20 text-gray-300 border border-gray-500/30',
  'coming_soon': 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
}[project.value?.status ?? 'available']))

const statusLabel = computed(() => ({
  'available': t('project.status_available'),
  'sold': t('project.status_sold'),
  'coming_soon': t('project.status_coming_soon'),
}[project.value?.status ?? 'available']))

const relatedProjects = computed(() =>
  store.projects
    .filter(p => p.id !== project.value?.id && p.status === project.value?.status)
    .slice(0, 3)
)

onMounted(async () => {
  if (!store.projects.length) await store.fetchProjects()

  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  // Hero parallax
  gsap.to(heroEl.value, {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: { trigger: heroEl.value, start: 'top top', end: 'bottom top', scrub: true },
  })

  await initScrollAnimations({
    fadeUp: [galleryEl.value, descEl.value, specsEl.value, priceCard.value, relatedEl.value].filter(Boolean) as Element[],
  })
})

onUnmounted(killScrollTriggers)

useHead({ title: `${displayTitle.value} — Emera Developments` })
</script>
