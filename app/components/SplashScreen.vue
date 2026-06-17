<template>
  <div ref="splashEl" class="fixed inset-0 z-[100] flex items-center justify-center bg-black">
    <div ref="logoEl" class="flex flex-col items-center gap-6 opacity-0">
      <img src="/logo.png" alt="Emera Developments" class="w-48 h-auto sm:w-64" />
      <div ref="lineEl" class="h-0.5 w-0 bg-gold-400" />
      <p ref="taglineEl" class="text-white/0 font-display text-xl sm:text-2xl tracking-widest uppercase text-center">
        {{ t('splash.tagline') }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const emit = defineEmits<{ done: [] }>()

const splashEl = ref<HTMLElement | null>(null)
const logoEl = ref<HTMLElement | null>(null)
const lineEl = ref<HTMLElement | null>(null)
const taglineEl = ref<HTMLElement | null>(null)

onMounted(async () => {
  const { gsap } = await import('gsap')

  const tl = gsap.timeline({
    onComplete: () => {
      sessionStorage.setItem('splash-shown', '1')
      emit('done')
    },
  })

  tl.to(logoEl.value, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' })
    .to(lineEl.value, { width: '120px', duration: 0.6, ease: 'power2.inOut' }, '-=0.2')
    .to(taglineEl.value, { color: 'rgba(255,255,255,0.85)', duration: 0.5, ease: 'power1.out' }, '-=0.1')
    .to({}, { duration: 1.2 })
    .to(splashEl.value, { opacity: 0, duration: 0.6, ease: 'power2.in' })
})
</script>
