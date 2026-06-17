import { defineStore } from 'pinia'

export interface InquiryPayload {
  name: string
  email: string
  phone?: string
  message: string
  project_id?: string
}

export const useInquiriesStore = defineStore('inquiries', () => {
  const submitting = ref(false)
  const submitted = ref(false)
  const error = ref<string | null>(null)

  async function submit(payload: InquiryPayload) {
    submitting.value = true
    submitted.value = false
    error.value = null
    try {
      // Phase 3: replace with $fetch('/api/inquiries/create', { method: 'POST', body: payload })
      await new Promise(r => setTimeout(r, 600))
      submitted.value = true
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Failed to submit inquiry'
    } finally {
      submitting.value = false
    }
  }

  function reset() {
    submitted.value = false
    error.value = null
  }

  return { submitting, submitted, error, submit, reset }
})
