export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const supabase = useSupabaseAdmin()

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw createError({ statusCode: 404, message: 'Project not found' })
  return data
})
