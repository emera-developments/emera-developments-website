<template>
  <div class="max-w-3xl">
    <div class="flex items-center gap-3 mb-6">
      <NuxtLink to="/admin/projects" class="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </NuxtLink>
      <h2 class="text-2xl font-bold text-gray-900">New Project</h2>
    </div>

    <form class="space-y-8" @submit.prevent="handleSubmit">
      <!-- English Info -->
      <section class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
        <h3 class="font-semibold text-gray-900 flex items-center gap-2">
          <span class="w-6 h-6 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center font-bold">1</span>
          English Content
        </h3>
        <div>
          <label class="label">Title <span class="text-red-500">*</span></label>
          <input v-model="form.title" type="text" class="field" placeholder="Project title" required />
        </div>
        <div>
          <label class="label">Description</label>
          <textarea v-model="form.description" rows="4" class="field resize-none" placeholder="Describe the project…" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="label">Location</label>
            <input v-model="form.location" type="text" class="field" placeholder="e.g. Tanta, Egypt" />
          </div>
          <div>
            <label class="label">Status</label>
            <select v-model="form.status" class="field">
              <option value="available">Available</option>
              <option value="coming_soon">Coming Soon</option>
              <option value="sold">Sold</option>
            </select>
          </div>
        </div>
      </section>

      <!-- Arabic Info -->
      <section class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
        <h3 class="font-semibold text-gray-900 flex items-center gap-2">
          <span class="w-6 h-6 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center font-bold">2</span>
          Arabic Translation
        </h3>
        <div dir="rtl">
          <label class="label text-right block">العنوان</label>
          <input v-model="form.title_ar" type="text" class="field font-arabic text-right" placeholder="اسم المشروع" />
        </div>
        <div dir="rtl">
          <label class="label text-right block">الوصف</label>
          <textarea v-model="form.description_ar" rows="4" class="field font-arabic text-right resize-none" placeholder="وصف المشروع…" />
        </div>
        <div dir="rtl">
          <label class="label text-right block">الموقع</label>
          <input v-model="form.location_ar" type="text" class="field font-arabic text-right" placeholder="مثال: طنطا، مصر" />
        </div>
      </section>

      <!-- Images -->
      <section class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <h3 class="font-semibold text-gray-900 flex items-center gap-2">
          <span class="w-6 h-6 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center font-bold">3</span>
          Photos
        </h3>
        <AdminImageUploader v-model="form.images" />
      </section>

      <!-- Specifications EN -->
      <section class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <h3 class="font-semibold text-gray-900 flex items-center gap-2">
          <span class="w-6 h-6 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center font-bold">4</span>
          Specifications (English)
        </h3>
        <div v-for="(row, i) in specsEn" :key="i" class="flex gap-2 items-center">
          <input v-model="row.key" type="text" class="field flex-1" placeholder="e.g. Units" />
          <input v-model="row.value" type="text" class="field flex-1" placeholder="e.g. 120" />
          <button type="button" class="p-2 text-gray-400 hover:text-red-500 transition-colors" @click="specsEn.splice(i, 1)">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <button type="button" class="text-sm text-gold-500 hover:text-gold-600 font-medium flex items-center gap-1" @click="specsEn.push({ key: '', value: '' })">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add row
        </button>
      </section>

      <!-- Specifications AR -->
      <section class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <h3 class="font-semibold text-gray-900 flex items-center gap-2">
          <span class="w-6 h-6 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center font-bold">5</span>
          Specifications (Arabic)
        </h3>
        <div v-for="(row, i) in specsAr" :key="i" class="flex gap-2 items-center" dir="rtl">
          <input v-model="row.key" type="text" class="field flex-1 font-arabic text-right" placeholder="مثال: الوحدات" />
          <input v-model="row.value" type="text" class="field flex-1 font-arabic text-right" placeholder="مثال: ١٢٠" />
          <button type="button" class="p-2 text-gray-400 hover:text-red-500 transition-colors" @click="specsAr.splice(i, 1)">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <button type="button" class="text-sm text-gold-500 hover:text-gold-600 font-medium flex items-center gap-1" @click="specsAr.push({ key: '', value: '' })">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add row
        </button>
      </section>

      <p v-if="error" class="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">{{ error }}</p>

      <div class="flex gap-3">
        <NuxtLink to="/admin/projects" class="px-6 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          Cancel
        </NuxtLink>
        <button
          type="submit"
          :disabled="loading"
          class="px-8 py-3 bg-gold-500 text-white rounded-xl text-sm font-semibold hover:bg-gold-600 disabled:opacity-50 transition-colors"
        >
          {{ loading ? 'Saving…' : 'Create Project' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const loading = ref(false)
const error = ref('')

const form = reactive({
  title: '',
  title_ar: '',
  description: '',
  description_ar: '',
  location: '',
  location_ar: '',
  status: 'available' as 'available' | 'coming_soon' | 'sold',
  images: [] as string[],
})

const specsEn = reactive<{ key: string; value: string }[]>([{ key: '', value: '' }])
const specsAr = reactive<{ key: string; value: string }[]>([{ key: '', value: '' }])

function specsToObject(rows: { key: string; value: string }[]) {
  return Object.fromEntries(rows.filter(r => r.key.trim()).map(r => [r.key.trim(), r.value.trim()]))
}

async function handleSubmit() {
  loading.value = true
  error.value = ''
  try {
    await $fetch('/api/admin/projects', {
      method: 'POST',
      body: {
        ...form,
        specifications: specsToObject(specsEn),
        specifications_ar: specsToObject(specsAr),
      },
    })
    await navigateTo('/admin/projects')
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : 'Failed to create project'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.label { @apply block text-sm font-medium text-gray-700 mb-1.5; }
.field { @apply w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-colors; }
</style>
