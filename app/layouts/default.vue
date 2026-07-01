<template>
  <div
    class="min-h-screen flex flex-col bg-white text-gray-900"
    :dir="dir"
    :lang="locale"
    :class="isRtl ? 'font-arabic' : 'font-sans'"
  >
    <Navbar />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
const { locale, locales } = useI18n()

const currentLocale = computed(() =>
  locales.value.find((l: { code: string; dir?: string }) => l.code === locale.value)
)
const dir = computed(() => currentLocale.value?.dir ?? 'ltr')
const isRtl = computed(() => dir.value === 'rtl')

useHead(computed(() => ({
  htmlAttrs: { lang: locale.value, dir: dir.value },
})))

useSeoMeta({ ogSiteName: 'Emera Developments' })
</script>
