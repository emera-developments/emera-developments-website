export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body?.name || !body?.email || !body?.message) {
    throw createError({ statusCode: 400, message: 'name, email and message are required' })
  }

  const supabase = useSupabaseAdmin()

  const { error } = await supabase.from('inquiries').insert({
    name: String(body.name).trim(),
    email: String(body.email).trim().toLowerCase(),
    phone: body.phone ? String(body.phone).trim() : null,
    message: String(body.message).trim(),
    project_id: body.project_id || null,
  })

  if (error) throw createError({ statusCode: 500, message: error.message })
  return { success: true }
})
