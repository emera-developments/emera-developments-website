<template>
  <div>
    <NuxtRouteAnnouncer />
    <SplashScreen v-if="showSplash" @done="showSplash = false" />
    <NuxtLayout v-else>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const showSplash = ref(false)

onMounted(() => {
  if (!sessionStorage.getItem('splash-shown')) {
    showSplash.value = true
  }
})
</script>
