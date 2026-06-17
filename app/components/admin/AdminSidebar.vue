<template>
  <aside class="hidden lg:flex flex-col w-64 bg-gray-900 text-white min-h-screen shrink-0">
    <div class="flex items-center gap-3 px-6 py-5 border-b border-gray-700">
      <img src="/logo.png" alt="Emera" class="h-8 w-auto brightness-0 invert" />
      <span class="font-semibold text-sm">Admin Panel</span>
    </div>
    <nav class="flex-1 px-3 py-4">
      <ul class="space-y-1">
        <li v-for="item in navItems" :key="item.to">
          <NuxtLink
            :to="item.to"
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-150"
            active-class="!text-white !bg-gray-700 font-medium"
          >
            <span class="text-base">{{ item.icon }}</span>
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <div class="px-3 py-4 border-t border-gray-700">
      <button
        class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors duration-150"
        @click="logout"
      >
        <span class="text-base">🚪</span> Logout
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/admin/projects', label: 'Projects', icon: '🏗️' },
  { to: '/admin/inquiries', label: 'Inquiries', icon: '📩' },
]

async function logout() {
  const supabase = useSupabaseClient()
  await supabase.auth.signOut()
  navigateTo('/admin/login')
}
</script>
