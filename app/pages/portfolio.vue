<template>
  <div class="pt-20 min-h-screen bg-gray-50">
    <!-- Header -->
    <section class="bg-gray-950 py-16 lg:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p class="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-3">Emera Developments</p>
        <h1 class="font-display text-4xl sm:text-5xl font-bold text-white mb-4">{{ t('portfolio.title') }}</h1>
        <p class="text-gray-300 text-lg max-w-2xl mx-auto">{{ t('portfolio.subtitle') }}</p>
      </div>
    </section>

    <!-- Filter tabs -->
    <div class="sticky top-16 lg:top-20 z-30 bg-white border-b border-gray-200 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex gap-1 py-3 overflow-x-auto">
          <button
            v-for="f in filters"
            :key="f.value"
            class="shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-150"
            :class="activeFilter === f.value
              ? 'bg-gold-500 text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-100'"
            @click="activeFilter = f.value"
          >
            {{ f.label }}
            <span class="ms-1.5 text-xs opacity-70">({{ countFor(f.value) }})</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div v-if="store.loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="n in 6" :key="n" class="rounded-2xl bg-gray-100 animate-pulse h-80" />
      </div>

      <TransitionGroup
        v-else
        ref="gridEl"
        tag="div"
        name="card"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <ProjectCard
          v-for="project in filteredProjects"
          :key="project.id"
          :project="project"
        />
      </TransitionGroup>

      <div v-if="!store.loading && filteredProjects.length === 0" class="text-center py-20">
        <p class="text-gray-400 text-lg">{{ isAr ? 'لا توجد مشاريع في هذا التصنيف' : 'No projects in this category' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProjectsStore } from '~/stores/projects'

const { t, locale } = useI18n()
const store = useProjectsStore()
const isAr = computed(() => locale.value === 'ar')

type FilterValue = 'all' | 'available' | 'sold' | 'coming_soon'
const activeFilter = ref<FilterValue>('all')

const filters = computed(() => [
  { value: 'all', label: t('portfolio.filter_all') },
  { value: 'available', label: t('portfolio.filter_available') },
  { value: 'sold', label: t('portfolio.filter_sold') },
  { value: 'coming_soon', label: t('portfolio.filter_coming') },
])

const filteredProjects = computed(() =>
  activeFilter.value === 'all'
    ? store.projects
    : store.projects.filter(p => p.status === activeFilter.value)
)

function countFor(filter: string) {
  if (filter === 'all') return store.projects.length
  return store.projects.filter(p => p.status === filter).length
}

onMounted(() => store.fetchProjects())

const { public: { siteUrl } } = useRuntimeConfig()
const portfolioUrl = computed(() => `${siteUrl}${isAr.value ? '/ar' : ''}/portfolio`)

useSeoMeta(computed(() => ({
  title: `${t('portfolio.title')} — Emera Developments`,
  description: t('seo.portfolioDescription'),
  ogTitle: `${t('portfolio.title')} — Emera Developments`,
  ogDescription: t('seo.portfolioDescription'),
  ogImage: `${siteUrl}/logo.png`,
  ogUrl: portfolioUrl.value,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: `${t('portfolio.title')} — Emera Developments`,
  twitterDescription: t('seo.portfolioDescription'),
  twitterImage: `${siteUrl}/logo.png`,
})))

useHead(computed(() => ({ link: [{ rel: 'canonical', href: portfolioUrl.value }] })))
</script>

<style scoped>
.card-enter-active, .card-leave-active { transition: all 0.3s ease; }
.card-enter-from { opacity: 0; transform: translateY(20px); }
.card-leave-to { opacity: 0; transform: scale(0.95); }
.card-move { transition: transform 0.3s ease; }
</style>
