<template>
  <div>
    <!-- Main image -->
    <div class="relative overflow-hidden rounded-2xl aspect-video bg-gray-100 cursor-zoom-in" @click="lightboxIndex = activeIndex">
      <img
        :src="images[activeIndex]"
        :alt="`${alt} ${activeIndex + 1}`"
        class="w-full h-full object-cover transition-opacity duration-300"
      />
      <!-- Arrows -->
      <button
        v-if="images.length > 1"
        class="absolute start-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
        @click.stop="prev"
        aria-label="Previous"
      >
        <svg class="w-5 h-5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <button
        v-if="images.length > 1"
        class="absolute end-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
        @click.stop="next"
        aria-label="Next"
      >
        <svg class="w-5 h-5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
      <!-- Counter -->
      <span class="absolute bottom-3 end-3 px-2.5 py-1 rounded-full bg-black/50 text-white text-xs">
        {{ activeIndex + 1 }} / {{ images.length }}
      </span>
    </div>

    <!-- Thumbnails -->
    <div v-if="images.length > 1" class="flex gap-3 mt-3 overflow-x-auto pb-1">
      <button
        v-for="(img, i) in images"
        :key="i"
        class="shrink-0 w-20 h-16 rounded-xl overflow-hidden border-2 transition-colors duration-150"
        :class="i === activeIndex ? 'border-brand-600' : 'border-transparent hover:border-gray-300'"
        @click="activeIndex = i"
      >
        <img :src="img" :alt="`Thumbnail ${i + 1}`" class="w-full h-full object-cover" loading="lazy" />
      </button>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="lightboxIndex !== null"
          class="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4"
          @click.self="lightboxIndex = null"
        >
          <button
            class="absolute top-4 end-4 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            @click="lightboxIndex = null"
            aria-label="Close"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          <img
            :src="images[lightboxIndex]"
            :alt="`${alt} ${lightboxIndex + 1}`"
            class="max-w-full max-h-[90vh] object-contain rounded-xl"
          />
          <button
            class="absolute start-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            @click="lightboxIndex = (lightboxIndex - 1 + images.length) % images.length"
          >
            <svg class="w-6 h-6 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <button
            class="absolute end-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            @click="lightboxIndex = (lightboxIndex + 1) % images.length"
          >
            <svg class="w-6 h-6 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  images: string[]
  alt: string
}>()

const activeIndex = ref(0)
const lightboxIndex = ref<number | null>(null)

function prev() { activeIndex.value = (activeIndex.value - 1 + props.images.length) % props.images.length }
function next() { activeIndex.value = (activeIndex.value + 1) % props.images.length }

// Keyboard nav in lightbox
onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if (lightboxIndex.value === null) return
    if (e.key === 'Escape') lightboxIndex.value = null
    if (e.key === 'ArrowLeft') lightboxIndex.value = (lightboxIndex.value - 1 + props.images.length) % props.images.length
    if (e.key === 'ArrowRight') lightboxIndex.value = (lightboxIndex.value + 1) % props.images.length
  })
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
