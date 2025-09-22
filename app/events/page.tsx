import Link from 'next/link'
import { getEvents, getSite } from '@/lib/content'

export const metadata = { title: 'Events — West Yorkshire Historic Sites' }

export default function EventsPage() {
  const events = getEvents()
  return (
    <div className="container-narrow py-10">
      <h1 className="text-3xl font-bold">Events</h1>
      <ul className="mt-6 space-y-4">
        {events.map(e => {
          const venue = getSite(e.venue_slug)
          return (
            <li key={e.slug} className="card p-4">
              <div className="text-sm text-gray-600">{new Date(e.start).toLocaleString()} – {new Date(e.end).toLocaleTimeString()}</div>
              <h3 className="font-semibold"><Link href={`/events/${e.slug}`}>{e.title}</Link></h3>
              <p className="text-sm text-gray-700">{e.summary}</p>
              <p className="text-sm text-gray-600">Venue: {venue?.name}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
