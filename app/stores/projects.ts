import { defineStore } from 'pinia'

export interface Project {
  id: string
  title: string
  title_ar?: string
  description: string
  description_ar?: string
  location: string
  location_ar?: string
  price: number | null
  status: 'available' | 'sold' | 'coming_soon'
  images: string[]
  specifications: Record<string, string>
  specifications_ar?: Record<string, string>
  created_at: string
}

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<Project[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchProjects() {
    loading.value = true
    error.value = null
    try {
      projects.value = await $fetch<Project[]>('/api/projects')
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Failed to load projects'
    } finally {
      loading.value = false
    }
  }

  function getById(id: string) {
    return projects.value.find(p => p.id === id) ?? null
  }

  return { projects, loading, error, fetchProjects, getById }
})
