import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) throw createError({ statusCode: 401, message: 'Unauthorized' })

  const body = await readBody(event)
  if (!body?.title) throw createError({ statusCode: 400, message: 'Title is required' })

  const supabase = useSupabaseAdmin()
  const { data, error } = await supabase
    .from('projects')
    .insert({
      title: body.title.trim(),
      title_ar: body.title_ar?.trim() || null,
      description: body.description?.trim() || null,
      description_ar: body.description_ar?.trim() || null,
      location: body.location?.trim() || null,
      location_ar: body.location_ar?.trim() || null,
      status: body.status ?? 'available',
      images: body.images ?? [],
      specifications: body.specifications ?? {},
      specifications_ar: body.specifications_ar ?? {},
    })
    .select()
    .single()

  if (error) throw createError({ statusCode: 500, message: error.message })
  return data
})
