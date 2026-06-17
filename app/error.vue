<template>
  <div class="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-center px-4">
    <img src="/logo.png" alt="Emera Developments" class="h-16 w-auto brightness-0 invert mb-10 opacity-50" />

    <p class="font-display text-8xl sm:text-9xl font-bold text-gold-400 leading-none mb-4">
      {{ error?.statusCode ?? 404 }}
    </p>

    <h1 class="text-white text-2xl font-semibold mb-3">
      {{ error?.statusCode === 500 ? 'Something went wrong' : 'Page not found' }}
    </h1>
    <p class="text-gray-400 max-w-sm mb-10 leading-relaxed">
      {{ error?.statusCode === 500
        ? 'We\'re experiencing technical difficulties. Please try again shortly.'
        : 'The page you\'re looking for doesn\'t exist or has been moved.' }}
    </p>

    <div class="flex flex-col sm:flex-row gap-3">
      <a
        href="/"
        class="px-7 py-3 bg-gold-500 text-white font-semibold rounded-full hover:bg-gold-600 transition-colors duration-200"
      >
        Back to Home
      </a>
      <a
        href="/portfolio"
        class="px-7 py-3 bg-white/10 text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-colors duration-200"
      >
        View Portfolio
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ error: { statusCode: number; message?: string } | null }>()
useHead({ title: `${props.error?.statusCode ?? 404} — Emera Developments` })
</script>
