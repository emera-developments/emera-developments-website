<template>
  <form class="space-y-5" @submit.prevent="handleSubmit" novalidate>
    <!-- Success state -->
    <div v-if="store.submitted" class="rounded-2xl bg-emerald-50 border border-emerald-200 p-6 text-center">
      <div class="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3">
        <svg class="w-7 h-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
      </div>
      <p class="font-semibold text-emerald-800 text-lg">{{ t('contact.success') }}</p>
      <button type="button" class="mt-4 text-sm text-emerald-600 underline" @click="store.reset()">
        Send another
      </button>
    </div>

    <template v-else>
      <!-- Name + Email -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">{{ t('contact.name') }} *</label>
          <input
            v-model="form.name"
            type="text"
            required
            :placeholder="t('contact.name')"
            class="field"
            :class="{ 'field-error': errors.name }"
          />
          <p v-if="errors.name" class="mt-1 text-xs text-red-500">{{ errors.name }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">{{ t('contact.email') }} *</label>
          <input
            v-model="form.email"
            type="email"
            required
            :placeholder="t('contact.email')"
            class="field"
            :class="{ 'field-error': errors.email }"
          />
          <p v-if="errors.email" class="mt-1 text-xs text-red-500">{{ errors.email }}</p>
        </div>
      </div>

      <!-- Phone + Project -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">{{ t('contact.phone') }}</label>
          <input
            v-model="form.phone"
            type="tel"
            :placeholder="t('contact.phone')"
            class="field"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">{{ t('contact.project') }}</label>
          <select v-model="form.project_id" class="field">
            <option value="">{{ t('contact.project') }}</option>
            <option v-for="p in projects" :key="p.id" :value="p.id">
              {{ isAr && p.title_ar ? p.title_ar : p.title }}
            </option>
          </select>
        </div>
      </div>

      <!-- Message -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1.5">{{ t('contact.message') }} *</label>
        <textarea
          v-model="form.message"
          rows="4"
          :placeholder="t('contact.message')"
          class="field resize-none"
          :class="{ 'field-error': errors.message }"
        />
        <p v-if="errors.message" class="mt-1 text-xs text-red-500">{{ errors.message }}</p>
      </div>

      <!-- Error -->
      <p v-if="store.error" class="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
        {{ store.error }}
      </p>

      <!-- Submit -->
      <button
        type="submit"
        :disabled="store.submitting"
        class="w-full py-3.5 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <svg v-if="store.submitting" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
        {{ store.submitting ? '…' : t('contact.submit') }}
      </button>
    </template>
  </form>
</template>

<script setup lang="ts">
import { useInquiriesStore } from '~/stores/inquiries'
import { useProjectsStore } from '~/stores/projects'

const props = defineProps<{ preselectedProjectId?: string }>()

const { t, locale } = useI18n()
const store = useInquiriesStore()
const projectsStore = useProjectsStore()

const isAr = computed(() => locale.value === 'ar')
const projects = computed(() => projectsStore.projects)

const form = reactive({
  name: '',
  email: '',
  phone: '',
  message: '',
  project_id: props.preselectedProjectId ?? '',
})

const errors = reactive({ name: '', email: '', message: '' })

function validate() {
  errors.name = form.name.trim() ? '' : 'Required'
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? '' : 'Valid email required'
  errors.message = form.message.trim() ? '' : 'Required'
  return !errors.name && !errors.email && !errors.message
}

async function handleSubmit() {
  if (!validate()) return
  await store.submit({
    name: form.name,
    email: form.email,
    phone: form.phone || undefined,
    message: form.message,
    project_id: form.project_id || undefined,
  })
}

onMounted(() => {
  if (!projectsStore.projects.length) projectsStore.fetchProjects()
})
</script>

<style scoped>
.field {
  @apply w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400
         focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent
         bg-gray-50 transition-colors duration-150;
}
.field-error {
  @apply border-red-400 focus:ring-red-400;
}
</style>
