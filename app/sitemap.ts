import { MetadataRoute } from 'next'
import { getSites, getEvents } from '@/lib/content'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://example.com'
  const items: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/sites`, lastModified: new Date() },
    { url: `${base}/events`, lastModified: new Date() },
    { url: `${base}/itinerary`, lastModified: new Date() },
    { url: `${base}/plan`, lastModified: new Date() }
  ]
  getSites().forEach(s => items.push({ url: `${base}/sites/${s.slug}`, lastModified: new Date() }))
  getEvents().forEach(e => items.push({ url: `${base}/events/${e.slug}`, lastModified: new Date(e.start) }))
  return items
}
