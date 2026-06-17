<template>
  <NuxtLink
    :to="localePath(`/projects/${project.id}`)"
    class="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
  >
    <!-- Image -->
    <div class="relative overflow-hidden aspect-[4/3] bg-gray-100">
      <img
        :src="project.images[0]"
        :alt="displayTitle"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      <!-- Status badge -->
      <span
        class="absolute top-3 start-3 px-3 py-1 rounded-full text-xs font-semibold"
        :class="statusClasses"
      >
        {{ statusLabel }}
      </span>
    </div>

    <!-- Content -->
    <div class="p-5">
      <h3 class="font-display font-semibold text-lg text-gray-900 group-hover:text-brand-600 transition-colors duration-200 line-clamp-1">
        {{ displayTitle }}
      </h3>
      <p class="flex items-center gap-1.5 text-sm text-gray-500 mt-1.5">
        <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
        {{ displayLocation }}
      </p>
      <p class="text-sm text-gray-600 mt-2 line-clamp-2 leading-relaxed">
        {{ displayDescription }}
      </p>
      <div class="mt-4 flex justify-center">
        <span class="text-sm text-gold-500 font-medium flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
          {{ t('project.inquire') }}
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Project } from '~/stores/projects'

const props = defineProps<{ project: Project }>()

const { t, locale } = useI18n()
const localePath = useLocalePath()

const isAr = computed(() => locale.value === 'ar')

const displayTitle = computed(() =>
  isAr.value && props.project.title_ar ? props.project.title_ar : props.project.title
)
const displayLocation = computed(() =>
  isAr.value && props.project.location_ar ? props.project.location_ar : props.project.location
)
const displayDescription = computed(() =>
  isAr.value && props.project.description_ar ? props.project.description_ar : props.project.description
)

const formattedPrice = computed(() => {
  if (!props.project.price) return ''
  return new Intl.NumberFormat(isAr.value ? 'ar-EG' : 'en-EG', {
    style: 'currency',
    currency: 'EGP',
    maximumFractionDigits: 0,
  }).format(props.project.price)
})

const statusClasses = computed(() => ({
  'available': 'bg-emerald-100 text-emerald-700',
  'sold': 'bg-gray-200 text-gray-600',
  'coming_soon': 'bg-amber-100 text-amber-700',
}[props.project.status]))

const statusLabel = computed(() => ({
  'available': t('project.status_available'),
  'sold': t('project.status_sold'),
  'coming_soon': t('project.status_coming_soon'),
}[props.project.status]))
</script>
