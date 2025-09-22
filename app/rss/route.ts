import { NextResponse } from 'next/server'
import { getEvents } from '@/lib/content'

export async function GET() {
  const events = getEvents()
  const items = events.map(e => `
    <item>
      <title>${escapeXml(e.title)}</title>
      <link>https://example.com/events/${e.slug}</link>
      <description>${escapeXml(e.summary)}</description>
      <pubDate>${new Date(e.start).toUTCString()}</pubDate>
      <guid>https://example.com/events/${e.slug}</guid>
    </item>
  `).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0"><channel>
    <title>West Yorkshire Historic Sites — Events</title>
    <link>https://example.com/events</link>
    <description>Upcoming events across West Yorkshire&apos;s historic places.</description>
    ${items}
  </channel></rss>`

  return new NextResponse(xml, { headers: { 'Content-Type': 'application/rss+xml' } })
}

function escapeXml(str: string) {
  return str.replace(/[<>&'"]/g, (c) => ({
    '<':'&lt;','>':'&gt;','&':'&amp;',"'":'&apos;','"':'&quot;'
  } as any)[c])
}
