import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  try {
    const products = await prisma.product.findMany({
      select: { id: true, slug: true, updatedAt: true },
    })

    const news = await prisma.news.findMany({
      select: { id: true, slug: true, updatedAt: true },
    })

    const productUrls = products.map((product) => ({
      url: `${baseUrl}/products/${product.slug || product.id}`,
      lastModified: product.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    const newsUrls = news.map((item) => ({
      url: `${baseUrl}/news/${item.slug || item.id}`,
      lastModified: item.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    const staticRoutes = [
      '',
      '/about',
      '/products',
      '/news',
      '/contact',
    ].map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: route === '' ? 1 : 0.9,
    }))

    return [...staticRoutes, ...productUrls, ...newsUrls]
  } catch (error) {
    console.error('Failed to generate sitemap:', error)
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
      },
    ]
  }
}
