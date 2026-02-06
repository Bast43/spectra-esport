import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.spectra-esports.eu'

  // Pages statiques
  const staticPages = [
    '',
    '/teams',
    '/news',
    '/results',
    '/sponsors',
  ].map((route) => {
    const cleanRoute = route.startsWith('/') ? route : `/${route}`;
    const url = route === '' ? `${baseUrl}/` : `${baseUrl}${cleanRoute}`;
    return {
      url,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily' as const,
      priority: route === '' ? 1 : 0.8,
    };
  })

  // Récupérer les équipes dynamiquement
  let teamPages: MetadataRoute.Sitemap = []
  try {
    const teamsRes = await fetch(`${baseUrl}/api/data/teams`, {
      cache: 'no-store'
    })
    if (teamsRes.ok) {
      const teamsData = await teamsRes.json()
      const teams = teamsData.teams || []
      
      teamPages = teams.map((team: any) => ({
        url: `${baseUrl}/teams?team=${encodeURIComponent(team.id)}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }))
    }
  } catch (error) {
    console.error('Error fetching teams for sitemap:', error)
  }

  // Récupérer les news dynamiquement
  let newsPages: MetadataRoute.Sitemap = []
  try {
    const newsRes = await fetch(`${baseUrl}/api/data/news`, {
      cache: 'no-store'
    })
    if (newsRes.ok) {
      const newsData = await newsRes.json()
      const news = newsData.news || []
      
      newsPages = news.map((article: any) => ({
        url: `${baseUrl}/news#${encodeURIComponent(article.id)}`,
        lastModified: article.date || new Date().toISOString(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
    }
  } catch (error) {
    console.error('Error fetching news for sitemap:', error)
  }

  return [...staticPages, ...teamPages, ...newsPages]
}
