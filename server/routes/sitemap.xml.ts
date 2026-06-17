export default defineEventHandler(async (event) => {
  const base = process.env.NUXT_PUBLIC_SITE_URL ?? 'https://emera-developments.com'

  const supabase = useSupabaseAdmin()
  const { data: projects } = await supabase
    .from('projects')
    .select('id, updated_at')
    .order('created_at', { ascending: false })

  const staticPages = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/portfolio', priority: '0.9', changefreq: 'weekly' },
    { path: '/about', priority: '0.7', changefreq: 'monthly' },
    { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  ]

  const urls: string[] = []

  for (const page of staticPages) {
    urls.push(urlEntry(`${base}${page.path}`, undefined, page.changefreq, page.priority))
    urls.push(urlEntry(`${base}/ar${page.path === '/' ? '' : page.path}`, undefined, page.changefreq, page.priority))
  }

  for (const project of projects ?? []) {
    const lastmod = project.updated_at ? new Date(project.updated_at).toISOString().split('T')[0] : undefined
    urls.push(urlEntry(`${base}/projects/${project.id}`, lastmod, 'monthly', '0.8'))
    urls.push(urlEntry(`${base}/ar/projects/${project.id}`, lastmod, 'monthly', '0.8'))
  }

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`
})

function urlEntry(loc: string, lastmod?: string, changefreq?: string, priority?: string) {
  return `  <url>
    <loc>${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}
