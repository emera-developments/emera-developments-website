<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Overview</h2>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
      <div v-for="stat in stats" :key="stat.label" class="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <p class="text-3xl font-bold" :class="stat.color">
          {{ pending ? '…' : stat.value }}
        </p>
        <p class="text-sm text-gray-500 mt-1">{{ stat.label }}</p>
      </div>
    </div>

    <!-- Quick links -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <NuxtLink
        to="/admin/projects/new"
        class="flex items-center gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-gold-300 hover:shadow-md transition-all duration-150 group"
      >
        <div class="w-12 h-12 rounded-xl bg-gold-50 flex items-center justify-center shrink-0 group-hover:bg-gold-100 transition-colors">
          <svg class="w-6 h-6 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <div>
          <p class="font-semibold text-gray-900 group-hover:text-gold-600 transition-colors">Add New Project</p>
          <p class="text-sm text-gray-400">Create a listing with photos and details</p>
        </div>
      </NuxtLink>

      <NuxtLink
        to="/admin/inquiries"
        class="flex items-center gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-gold-300 hover:shadow-md transition-all duration-150 group"
      >
        <div class="w-12 h-12 rounded-xl bg-gold-50 flex items-center justify-center shrink-0 group-hover:bg-gold-100 transition-colors">
          <svg class="w-6 h-6 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <p class="font-semibold text-gray-900 group-hover:text-gold-600 transition-colors">View Inquiries</p>
          <p class="text-sm text-gray-400">
            <span v-if="data?.unreadInquiries" class="text-gold-600 font-semibold">{{ data.unreadInquiries }} unread · </span>
            Read and reply to messages
          </p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const { data, pending } = await useAsyncData('admin-stats',
  () => $fetch<{ totalProjects: number; availableProjects: number; unreadInquiries: number }>('/api/admin/stats'),
)

const stats = computed(() => [
  { label: 'Total Projects', value: data.value?.totalProjects ?? 0, color: 'text-gray-900' },
  { label: 'Available Listings', value: data.value?.availableProjects ?? 0, color: 'text-emerald-600' },
  { label: 'Unread Inquiries', value: data.value?.unreadInquiries ?? 0, color: 'text-gold-500' },
])
</script>
