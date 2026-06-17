import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) throw createError({ statusCode: 401, message: 'Unauthorized' })

  const id = getRouterParam(event, 'id')
  const supabase = useSupabaseAdmin()

  const { error } = await supabase.from('inquiries').delete().eq('id', id)
  if (error) throw createError({ statusCode: 500, message: error.message })

  return { success: true }
})
