import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) throw createError({ statusCode: 401, message: 'Unauthorized' })

  const supabase = useSupabaseAdmin()

  const [projects, available, inquiries] = await Promise.all([
    supabase.from('projects').select('id', { count: 'exact', head: true }),
    supabase.from('projects').select('id', { count: 'exact', head: true }).eq('status', 'available'),
    supabase.from('inquiries').select('id', { count: 'exact', head: true }).eq('read', false),
  ])

  return {
    totalProjects: projects.count ?? 0,
    availableProjects: available.count ?? 0,
    unreadInquiries: inquiries.count ?? 0,
  }
})
