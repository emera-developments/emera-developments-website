<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div v-for="stat in stats" :key="stat.label" class="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <p class="text-3xl font-bold text-brand-600">{{ stat.value }}</p>
        <p class="text-sm text-gray-500 mt-1">{{ stat.label }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const stats = [
  { label: 'Total Projects', value: '—' },
  { label: 'Available Listings', value: '—' },
  { label: 'Unread Inquiries', value: '—' },
]
</script>
