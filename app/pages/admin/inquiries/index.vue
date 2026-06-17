<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-gray-900">
        Inquiries
        <span v-if="unreadCount" class="ms-2 px-2.5 py-0.5 rounded-full bg-gold-500 text-white text-xs font-bold">
          {{ unreadCount }} new
        </span>
      </h2>
      <button
        v-if="inquiries?.some(i => !i.read)"
        class="text-sm text-gray-500 hover:text-gray-800 font-medium transition-colors"
        @click="markAllRead"
      >
        Mark all as read
      </button>
    </div>

    <!-- Loading -->
    <div v-if="pending" class="space-y-3">
      <div v-for="i in 5" :key="i" class="h-24 bg-gray-200 rounded-xl animate-pulse" />
    </div>

    <!-- Empty -->
    <div v-else-if="!inquiries?.length" class="text-center py-20 text-gray-400">
      <p class="text-5xl mb-4">📩</p>
      <p class="font-medium">No inquiries yet.</p>
    </div>

    <!-- List -->
    <div v-else class="space-y-3">
      <div
        v-for="inq in inquiries"
        :key="inq.id"
        class="bg-white rounded-2xl border shadow-sm p-5 transition-colors"
        :class="inq.read ? 'border-gray-100' : 'border-gold-300 bg-gold-50/30'"
      >
        <div class="flex items-start justify-between gap-4">
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap mb-1">
              <span class="font-semibold text-gray-900">{{ inq.name }}</span>
              <span v-if="!inq.read" class="px-2 py-0.5 rounded-full bg-gold-500 text-white text-xs font-semibold">New</span>
              <span v-if="inq.projects?.title" class="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs">
                re: {{ inq.projects.title }}
              </span>
            </div>
            <div class="flex items-center gap-4 text-sm text-gray-500 mb-3 flex-wrap">
              <a :href="`mailto:${inq.email}`" class="hover:text-gold-600 transition-colors">{{ inq.email }}</a>
              <a v-if="inq.phone" :href="`tel:${inq.phone}`" class="hover:text-gold-600 transition-colors">{{ inq.phone }}</a>
              <span>{{ formatDate(inq.created_at) }}</span>
            </div>
            <p class="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{{ inq.message }}</p>
          </div>

          <div class="flex items-center gap-1 shrink-0">
            <button
              :title="inq.read ? 'Mark as unread' : 'Mark as read'"
              class="p-2 rounded-lg transition-colors"
              :class="inq.read ? 'text-gray-400 hover:text-gold-500 hover:bg-gold-50' : 'text-gold-500 hover:text-gold-600 hover:bg-gold-50'"
              @click="toggleRead(inq)"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path v-if="inq.read" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <a
              :href="`mailto:${inq.email}?subject=Re: Your Emera Developments inquiry`"
              title="Reply by email"
              class="p-2 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
            </a>
            <button
              title="Delete"
              class="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              @click="confirmDelete(inq)"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete confirmation -->
    <Teleport to="body">
      <div v-if="deleting" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
        <div class="bg-white rounded-2xl p-6 shadow-2xl max-w-sm w-full">
          <h3 class="font-bold text-gray-900 text-lg mb-2">Delete Inquiry?</h3>
          <p class="text-gray-500 text-sm mb-6">From <span class="font-medium text-gray-700">{{ deleting.name }}</span>. This cannot be undone.</p>
          <div class="flex gap-3">
            <button class="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors" @click="deleting = null">Cancel</button>
            <button class="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors disabled:opacity-50" :disabled="deleteLoading" @click="doDelete">
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

const { data: inquiries, pending, refresh } = useAsyncData('admin-inquiries',
  () => $fetch<any[]>('/api/admin/inquiries'),
  { server: false },
)

const unreadCount = computed(() => inquiries.value?.filter(i => !i.read).length ?? 0)
const deleting = ref<any>(null)
const deleteLoading = ref(false)

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('en-EG', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(iso))
}

async function toggleRead(inq: any) {
  inq.read = !inq.read
  await $fetch(`/api/admin/inquiries/${inq.id}`, { method: 'PATCH', body: { read: inq.read } })
}

async function markAllRead() {
  const unread = inquiries.value?.filter(i => !i.read) ?? []
  await Promise.all(unread.map(i => {
    i.read = true
    return $fetch(`/api/admin/inquiries/${i.id}`, { method: 'PATCH', body: { read: true } })
  }))
}

function confirmDelete(inq: any) { deleting.value = inq }

async function doDelete() {
  if (!deleting.value) return
  deleteLoading.value = true
  try {
    await $fetch(`/api/admin/inquiries/${deleting.value.id}`, { method: 'DELETE' })
    deleting.value = null
    await refresh()
  } finally {
    deleteLoading.value = false
  }
}
</script>
