<template>
  <div class="space-y-3">
    <!-- Current images -->
    <div v-if="modelValue.length" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      <div
        v-for="(url, i) in modelValue"
        :key="url"
        class="relative group aspect-video bg-gray-100 rounded-xl overflow-hidden border border-gray-200"
      >
        <img :src="url" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center gap-2">
          <!-- Move left -->
          <button
            v-if="i > 0"
            type="button"
            class="p-1.5 bg-white/90 rounded-lg text-gray-700 hover:bg-white transition-colors"
            title="Move left"
            @click="move(i, -1)"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <!-- Remove -->
          <button
            type="button"
            class="p-1.5 bg-red-500 rounded-lg text-white hover:bg-red-600 transition-colors"
            title="Remove"
            @click="remove(i)"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <!-- Move right -->
          <button
            v-if="i < modelValue.length - 1"
            type="button"
            class="p-1.5 bg-white/90 rounded-lg text-gray-700 hover:bg-white transition-colors"
            title="Move right"
            @click="move(i, 1)"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <span v-if="i === 0" class="absolute top-1.5 start-1.5 text-xs bg-gold-500 text-white px-2 py-0.5 rounded-full font-medium">
          Cover
        </span>
      </div>
    </div>

    <!-- Upload zone -->
    <label
      class="flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-6 cursor-pointer transition-colors duration-150"
      :class="uploading
        ? 'border-gold-300 bg-gold-50 cursor-wait'
        : 'border-gray-300 hover:border-gold-400 hover:bg-gray-50'"
    >
      <input
        ref="inputEl"
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        multiple
        class="sr-only"
        :disabled="uploading"
        @change="onFilesSelected"
      />
      <svg v-if="!uploading" class="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <svg v-else class="w-6 h-6 text-gold-500 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
      </svg>
      <span class="text-sm text-gray-500">
        {{ uploading ? `Uploading ${uploadProgress}…` : 'Click to upload images (jpg, png, webp · max 5MB each)' }}
      </span>
    </label>

    <p v-if="uploadError" class="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
      {{ uploadError }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: string[] }>()
const emit = defineEmits<{ 'update:modelValue': [urls: string[]] }>()

const uploading = ref(false)
const uploadProgress = ref('')
const uploadError = ref('')
const inputEl = ref<HTMLInputElement | null>(null)

async function onFilesSelected(e: Event) {
  const files = Array.from((e.target as HTMLInputElement).files ?? [])
  if (!files.length) return

  uploading.value = true
  uploadError.value = ''
  const urls = [...props.modelValue]

  for (let i = 0; i < files.length; i++) {
    uploadProgress.value = `${i + 1} / ${files.length}`
    const fd = new FormData()
    fd.append('file', files[i])
    try {
      const res = await $fetch<{ url: string }>('/api/admin/upload', { method: 'POST', body: fd })
      urls.push(res.url)
    } catch (err: unknown) {
      uploadError.value = err instanceof Error ? err.message : 'Upload failed'
    }
  }

  emit('update:modelValue', urls)
  uploading.value = false
  uploadProgress.value = ''
  if (inputEl.value) inputEl.value.value = ''
}

function remove(index: number) {
  const urls = props.modelValue.filter((_, i) => i !== index)
  emit('update:modelValue', urls)
}

function move(index: number, dir: -1 | 1) {
  const urls = [...props.modelValue]
  const target = index + dir
  ;[urls[index], urls[target]] = [urls[target], urls[index]]
  emit('update:modelValue', urls)
}
</script>
