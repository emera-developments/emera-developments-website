<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-gray-900">Projects</h2>
      <NuxtLink to="/admin/projects/new" class="inline-flex items-center gap-2 px-4 py-2 bg-gold-500 text-white text-sm font-semibold rounded-xl hover:bg-gold-600 transition-colors duration-150">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        New Project
      </NuxtLink>
    </div>

    <!-- Loading -->
    <div v-if="pending" class="space-y-3">
      <div v-for="i in 4" :key="i" class="h-20 bg-gray-200 rounded-xl animate-pulse" />
    </div>

    <!-- Empty -->
    <div v-else-if="!projects?.length" class="text-center py-20 text-gray-400">
      <p class="text-5xl mb-4">🏗️</p>
      <p class="font-medium">No projects yet.</p>
      <NuxtLink to="/admin/projects/new" class="mt-4 inline-block text-gold-500 hover:underline text-sm">Add your first project →</NuxtLink>
    </div>

    <!-- Table -->
    <div v-else class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-gray-100 bg-gray-50 text-left">
            <th class="px-5 py-3 font-semibold text-gray-600">Project</th>
            <th class="px-5 py-3 font-semibold text-gray-600 hidden sm:table-cell">Location</th>
            <th class="px-5 py-3 font-semibold text-gray-600 hidden md:table-cell">Status</th>
            <th class="px-5 py-3 font-semibold text-gray-600 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="project in projects"
            :key="project.id"
            class="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
          >
            <td class="px-5 py-4">
              <div class="flex items-center gap-3">
                <img
                  v-if="project.images?.[0]"
                  :src="project.images[0]"
                  class="w-10 h-10 rounded-lg object-cover shrink-0 bg-gray-100"
                />
                <div v-else class="w-10 h-10 rounded-lg bg-gray-100 shrink-0 flex items-center justify-center text-gray-300">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-gray-900">{{ project.title }}</p>
                  <p v-if="project.title_ar" class="text-xs text-gray-400 font-arabic">{{ project.title_ar }}</p>
                </div>
              </div>
            </td>
            <td class="px-5 py-4 text-gray-500 hidden sm:table-cell">{{ project.location ?? '—' }}</td>
            <td class="px-5 py-4 hidden md:table-cell">
              <span class="px-2.5 py-1 rounded-full text-xs font-semibold" :class="statusClass(project.status)">
                {{ statusLabel(project.status) }}
              </span>
            </td>
            <td class="px-5 py-4 text-right">
              <div class="flex items-center justify-end gap-2">
                <NuxtLink
                  :to="`/admin/projects/${project.id}`"
                  class="p-2 rounded-lg text-gray-500 hover:text-gold-600 hover:bg-gold-50 transition-colors"
                  title="Edit"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </NuxtLink>
                <button
                  class="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="Delete"
                  @click="confirmDelete(project)"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Delete confirmation modal -->
    <Teleport to="body">
      <div v-if="deleting" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
        <div class="bg-white rounded-2xl p-6 shadow-2xl max-w-sm w-full">
          <h3 class="font-bold text-gray-900 text-lg mb-2">Delete Project?</h3>
          <p class="text-gray-500 text-sm mb-6">
            "<span class="font-medium text-gray-700">{{ deleting.title }}</span>" will be permanently deleted.
          </p>
          <div class="flex gap-3">
            <button
              class="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              @click="deleting = null"
            >
              Cancel
            </button>
            <button
              class="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
              :disabled="deleteLoading"
              @click="doDelete"
            >
              {{ deleteLoading ? 'Deleting…' : 'Delete' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const { data: projects, pending, refresh } = useAsyncData('admin-projects',
  () => $fetch<any[]>('/api/projects'),
  { server: false },
)

const deleting = ref<{ id: string; title: string } | null>(null)
const deleteLoading = ref(false)

function statusClass(status: string) {
  return {
    available: 'bg-emerald-100 text-emerald-700',
    sold: 'bg-gray-200 text-gray-600',
    coming_soon: 'bg-amber-100 text-amber-700',
  }[status] ?? 'bg-gray-100 text-gray-500'
}

function statusLabel(status: string) {
  return { available: 'Available', sold: 'Sold', coming_soon: 'Coming Soon' }[status] ?? status
}

function confirmDelete(project: { id: string; title: string }) {
  deleting.value = project
}

async function doDelete() {
  if (!deleting.value) return
  deleteLoading.value = true
  try {
    await $fetch(`/api/admin/projects/${deleting.value.id}`, { method: 'DELETE' })
    deleting.value = null
    await refresh()
  } finally {
    deleteLoading.value = false
  }
}
</script>
