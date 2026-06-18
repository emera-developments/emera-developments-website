<template>
  <header class="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center gap-3">
    <!-- Hamburger (mobile / tablet) -->
    <button
      class="lg:hidden p-2 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
      aria-label="Open menu"
      @click="toggle"
    >
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>

    <h1 class="flex-1 text-base sm:text-lg font-semibold text-gray-800">{{ pageTitle }}</h1>

    <div class="flex items-center gap-2 sm:gap-3">
      <span class="hidden sm:block text-sm text-gray-500 truncate max-w-[180px]">{{ user?.email }}</span>
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

const { toggle } = inject('adminSidebar') as { toggle: () => void }

const pageTitle = computed(() => {
  if (route.path.startsWith('/admin/projects/') && route.path !== '/admin/projects/new') return 'Edit Project'
  const map: Record<string, string> = {
    '/admin/dashboard': 'Dashboard',
    '/admin/projects': 'Projects',
    '/admin/projects/new': 'New Project',
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
