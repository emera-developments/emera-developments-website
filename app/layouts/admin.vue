<template>
  <div class="min-h-screen flex bg-gray-100 font-sans" dir="ltr">
    <AdminSidebar />
    <div class="flex-1 flex flex-col min-w-0">
      <AdminNav />
      <main class="flex-1 p-4 sm:p-6 overflow-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const sidebarOpen = ref(false)
provide('adminSidebar', {
  sidebarOpen,
  toggle: () => { sidebarOpen.value = !sidebarOpen.value },
  close: () => { sidebarOpen.value = false },
})
</script>
