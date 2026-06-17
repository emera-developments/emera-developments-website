<template>
  <header class="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
    <h1 class="text-lg font-semibold text-gray-800">{{ pageTitle }}</h1>
    <div class="flex items-center gap-3">
      <span class="text-sm text-gray-500">{{ user?.email }}</span>
      <button
        class="px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        @click="logout"
      >
        Logout
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()
const user = useSupabaseUser()

const pageTitle = computed(() => {
  const map: Record<string, string> = {
    '/admin/dashboard': 'Dashboard',
    '/admin/projects': 'Projects',
    '/admin/projects/create': 'New Project',
    '/admin/inquiries': 'Inquiries',
  }
  return map[route.path] ?? 'Admin'
})

async function logout() {
  const supabase = useSupabaseClient()
  await supabase.auth.signOut()
  navigateTo('/admin/login')
}
</script>
