import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) throw createError({ statusCode: 401, message: 'Unauthorized' })

  const parts = await readMultipartFormData(event)
  const file = parts?.find(p => p.name === 'file')

  if (!file?.data) throw createError({ statusCode: 400, message: 'No file provided' })

  const maxSize = 5 * 1024 * 1024 // 5MB
  if (file.data.length > maxSize) throw createError({ statusCode: 400, message: 'File exceeds 5MB limit' })

  const ext = file.filename?.split('.').pop()?.toLowerCase() ?? 'jpg'
  const allowed = ['jpg', 'jpeg', 'png', 'webp', 'avif']
  if (!allowed.includes(ext)) throw createError({ statusCode: 400, message: 'Only jpg, png, webp, avif allowed' })

  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const supabase = useSupabaseAdmin()

  const { data, error } = await supabase.storage
    .from('project-images')
    .upload(fileName, file.data, { contentType: file.type ?? 'image/jpeg', upsert: false })

  if (error) throw createError({ statusCode: 500, message: error.message })

  const { data: { publicUrl } } = supabase.storage.from('project-images').getPublicUrl(data.path)
  return { url: publicUrl }
})
